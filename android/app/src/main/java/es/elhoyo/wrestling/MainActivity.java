package es.elhoyo.wrestling;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Presentation;
import android.content.Context;
import android.graphics.Color;
import android.hardware.display.DisplayManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Display;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * El Hoyo Wrestling para Android (pensado para la AYN Thor).
 *
 * - El juego web va DENTRO del APK (carpeta assets/www) y se sirve como si fuera una web
 *   (https://appassets.androidplatform.net/...), así funciona sin internet y los módulos JS cargan bien.
 * - Si el aparato tiene una segunda pantalla (la de abajo de la Thor), se abre en ella la «pantalla de abajo»
 *   del juego (mapa, barras del combate, botones táctiles). Las dos pantallas se hablan por un puente nativo.
 * - Pantalla completa, sin barras del sistema, pantalla siempre encendida y el botón B/atrás no cierra el juego.
 */
public class MainActivity extends Activity {
    private static final String HOST = "appassets.androidplatform.net";
    private static final String BASE = "https://" + HOST + "/";

    private WebView top;
    private WebView bottom;
    private Presentation presentation;
    private DisplayManager displays;
    private final Handler ui = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        Window w = getWindow();
        w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        top = makeWebView(this, "arriba");
        setContentView(top);
        hideBars(w);
        top.loadUrl(BASE + "index.html?app=android");

        displays = (DisplayManager) getSystemService(Context.DISPLAY_SERVICE);
        displays.registerDisplayListener(new DisplayManager.DisplayListener() {
            @Override public void onDisplayAdded(int id) { ui.postDelayed(MainActivity.this::openBottom, 400); }
            @Override public void onDisplayRemoved(int id) { closeBottom(); ui.postDelayed(MainActivity.this::openBottom, 400); }
            @Override public void onDisplayChanged(int id) { }
        }, ui);
        ui.postDelayed(this::openBottom, 600);
    }

    // ------------------------------------------------------------------ WebView
    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    private WebView makeWebView(Context ctx, String side) {
        WebView v = new WebView(ctx);
        v.setBackgroundColor(Color.BLACK);
        WebSettings s = v.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        s.setTextZoom(100);
        v.setOverScrollMode(View.OVER_SCROLL_NEVER);
        v.setWebChromeClient(new WebChromeClient());
        v.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
                if (!HOST.equals(req.getUrl().getHost())) return null; // fuentes de Google, etc.: a internet si hay
                String path = req.getUrl().getPath();
                if (path == null || path.equals("/")) path = "/index.html";
                try {
                    InputStream in = getAssets().open("www" + path);
                    Map<String, String> h = new HashMap<>();
                    h.put("Access-Control-Allow-Origin", "*");
                    h.put("Cache-Control", "no-cache");
                    return new WebResourceResponse(mime(path), "utf-8", 200, "OK", h, in);
                } catch (IOException e) {
                    return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", new HashMap<>(), null);
                }
            }
        });
        v.addJavascriptInterface(new Bridge(side), "HoyoAndroid");
        v.setFocusable(true);
        v.setFocusableInTouchMode(true);
        return v;
    }

    private static String mime(String p) {
        String l = p.toLowerCase();
        if (l.endsWith(".html")) return "text/html";
        if (l.endsWith(".js") || l.endsWith(".mjs")) return "text/javascript";
        if (l.endsWith(".css")) return "text/css";
        if (l.endsWith(".json")) return "application/json";
        if (l.endsWith(".png")) return "image/png";
        if (l.endsWith(".jpg") || l.endsWith(".jpeg")) return "image/jpeg";
        if (l.endsWith(".svg")) return "image/svg+xml";
        if (l.endsWith(".webp")) return "image/webp";
        if (l.endsWith(".wasm")) return "application/wasm";
        if (l.endsWith(".mp3")) return "audio/mpeg";
        if (l.endsWith(".ogg")) return "audio/ogg";
        return "application/octet-stream";
    }

    /** Puente entre las dos pantallas: lo que manda una, le llega a la otra */
    private class Bridge {
        private final String side;
        Bridge(String side) { this.side = side; }
        @JavascriptInterface public void post(String json) {
            final WebView other = side.equals("arriba") ? bottom : top;
            if (other == null) return;
            final String js = "window.__hoyoDual && window.__hoyoDual(" + json + ")";
            ui.post(() -> other.evaluateJavascript(js, null));
        }
        @JavascriptInterface public boolean hasSecondScreen() { return bottom != null; }
        @JavascriptInterface public String side() { return side; }
        @JavascriptInterface public void vibrate(int ms) { /* lo hace navigator.vibrate */ }
    }

    // ------------------------------------------------------------------ segunda pantalla (la de abajo de la Thor)
    private void openBottom() {
        if (presentation != null || isFinishing()) return;
        Display[] list = displays.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
        if (list.length == 0) {
            // algunos aparatos no marcan la pantalla secundaria como «presentación»: se busca cualquier otra
            for (Display d : displays.getDisplays()) if (d.getDisplayId() != Display.DEFAULT_DISPLAY) { list = new Display[]{d}; break; }
        }
        if (list.length == 0) return;
        Display d = list[0];
        try {
            presentation = new Presentation(this, d) {
                @Override protected void onCreate(Bundle b) {
                    super.onCreate(b);
                    bottom = makeWebView(getContext(), "abajo");
                    setContentView(bottom);
                    Window pw = getWindow();
                    if (pw != null) { pw.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON); hideBars(pw); }
                    bottom.loadUrl(BASE + "index.html?pantalla=abajo&app=android");
                }
            };
            presentation.setOnDismissListener(di -> { if (bottom != null) bottom.destroy(); bottom = null; presentation = null; });
            presentation.show();
        } catch (Exception e) {
            presentation = null;
            bottom = null;
        }
    }

    private void closeBottom() {
        if (presentation != null) { presentation.dismiss(); presentation = null; }
    }

    // ------------------------------------------------------------------ pantalla completa y botones
    private static void hideBars(Window w) {
        if (android.os.Build.VERSION.SDK_INT >= 30) {
            w.setDecorFitsSystemWindows(false);
            WindowInsetsController c = w.getInsetsController();
            if (c != null) {
                c.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override public void onWindowFocusChanged(boolean has) { super.onWindowFocusChanged(has); if (has) hideBars(getWindow()); }

    /** El botón B del mando (que Android convierte en «atrás») no debe cerrar el juego */
    @Override public boolean dispatchKeyEvent(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.KEYCODE_BACK && (e.getSource() & android.view.InputDevice.SOURCE_GAMEPAD) == android.view.InputDevice.SOURCE_GAMEPAD) {
            return top.dispatchKeyEvent(e) || true;
        }
        return super.dispatchKeyEvent(e);
    }
    @Override public void onBackPressed() {
        // atrás del sistema = tecla Escape para el juego (pausa / volver)
        top.evaluateJavascript("window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape'}))", null);
    }

    @Override protected void onResume() { super.onResume(); top.onResume(); if (bottom != null) bottom.onResume(); hideBars(getWindow()); openBottom(); }
    @Override protected void onPause() { top.onPause(); if (bottom != null) bottom.onPause(); super.onPause(); }
    @Override protected void onDestroy() { closeBottom(); top.destroy(); super.onDestroy(); }
}
