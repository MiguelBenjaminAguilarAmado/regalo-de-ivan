# El Hoyo Wrestling — El videojuego

> Inspirado en la obra original de **Jefefbi**.

Juego de lucha libre en **3D** para navegador (PC y móvil), de **un jugador contra la CPU**.
Modos: **Versus**, **Torneo** y **Espectador** (dos CPUs luchan con cámara de director y narrador). Historia y Supervivencia, próximamente.

## Cómo jugarlo

```bash
npm install        # solo la primera vez
npm run dev        # desarrollo: abre http://localhost:5173
```

`npm run dev` también muestra una dirección de red (por ejemplo `http://192.168.1.32:5173`):
ábrela desde el **móvil** (misma wifi) para probar los controles táctiles.

Para enseñárselo a los amigos sin tu Mac encendido, genera la versión estática:

```bash
npm run build      # crea la carpeta dist/
npm run preview    # sirve dist/ para comprobarla
```

La carpeta `dist/` se puede subir a cualquier hosting estático (itch.io, GitHub Pages, Netlify…).
No se abre con doble clic en `index.html`: necesita un servidor web (los módulos de JS lo exigen).

## Controles

| Acción | Teclado y ratón | Mando | Móvil |
|---|---|---|---|
| Moverse | `W A S D` / flechas | Stick izq. | Joystick (a tope = correr) |
| Golpe ligero (combo de 3) | `J` / clic izquierdo | A | GOLPE |
| Golpe fuerte | `K` / clic derecho | X | FUERTE |
| Agarre / Pin | `L` / clic central | B | AGARRE |
| Guardia (mantener) | `Espacio` | LB / LT | GUARDIA |
| Correr | `Shift` | RT | joystick a tope |
| Burla (gana momentum) | `E` | Y | BURLA |
| Finisher (barra llena) | `F` | RB | FINISHER |
| Pausa | `Esc` | Start | botón ❚❚ |

**Mando**: se detecta solo (avisa al conectarlo) y funciona en combate **y en los menús**: cruceta o stick para moverte, `A` aceptar, `B` volver, `Start` pausa. Vibra con los golpes fuertes y los finishers. En los ajustes con deslizador, izquierda/derecha cambia el valor.

### Reglas del combate
- **Vida, resistencia y momentum.** Atacar y correr gasta resistencia; golpear y burlarse llena el momentum. Con la barra azul llena puedes ejecutar tu **finisher** (único de cada luchador).
- **Contraataque**: pulsa GUARDIA *justo antes* de que llegue el golpe (bloqueo perfecto) y el rival queda aturdido. Un bloqueo normal reduce el daño pero gasta resistencia; si se agota, se rompe la guardia.
- **Agarres**: tras agarrar eliges: `Golpe` = lanzamiento, `Fuerte` = estampar, `Agarre` = llave de sumisión. Si pulsas AGARRE justo antes de que te agarren, **reviertes** el agarre.
- **Cómo se gana**: **KO** (vida a 0 y cuenta de 10), **pin** (3 segundos con el rival en el suelo; él se zafa machacando botones), **rendición** (llave, el rival machaca para escapar) o **fuera del ring** (más de 10 segundos). Para salir del ring corre contra las cuerdas; el lariat y la patada voladora pueden despedir al rival fuera.
- **Faltas** (cabezazo, golpe bajo): hacen más daño, pero el árbitro puede verlas y penalizarte.
- **Pablo Motos**: su golpe fuerte es una lotería ponderada (más habitual → más raro): **maletín** (36 %), **micrófono** (30 %, deja al rival aturdido), **casco romano** (18 %), **momia** (11 %, invoca una momia) y **tanque** (5 %, un cañonazo que puede sacar al rival del ring). Su finisher, *La hora de Pablo Motos*, expulsa al rival del ring y no le deja volver → pierde por cuenta fuera.
- **Pepe the Gay Dragon**: golpes lentos y muy fuertes. Su guardia aguanta casi todo, pero **no se puede mover**. Su finisher (*La embestida del unicornio*) le hace brotar un cuerno y embestir corriendo; si el rival es **Petisui**, este le torea… y Pepe le deja KO de un solo golpe.

### Modo Espectador
Elige dos luchadores (cualquiera, también los bloqueados) y mira. La cámara cambia sola de plano (general, a ras de lona, por encima del hombro, grúa, plano corto, esquina del ring) y reacciona a los golpes fuertes y derribos. Un **narrador y un comentarista** relatan el combate con subtítulos y voz (la voz usa las voces en español de tu sistema). Teclas: `C` cambia de cámara, `N` activa/desactiva el narrador, `Esc` pausa (en mando: `A`, `Y`, `Start`).

### Dificultad de la CPU
- **Fácil**: falla a propósito, reacciona lento y perdona errores.
- **Intermedia** (recomendada): también falla, pero busca el espectáculo (burlas, finisher dramático).
- **Difícil**: reacciona rápido, contraataca y no perdona.

## Escenarios
- **Matamoros**: pabellón de unas 30.000 personas, con la orquesta en la esquina superior derecha.
- **Manchester** ("La correa from Manchester"): teatro gigante, 60.000 personas, dos columnas enormes, pantallas, luces y el monigote inflable azul.

## Progreso
Empiezas con Elso, Petisui, Pablo Motos, Pepe the Gay Dragon y los provisionales Novato y Veterano. El resto se desbloquea por **victorias** y **logros** (ver `Plantilla` y `Logros` en el menú). Se guarda en el navegador (localStorage).

---

## Para ti (el creador): cómo ampliar el juego

### Añadir un luchador
1. Crea `fighters/<nombre>/` con su foto `<nombre>.png` y, si quieres, una foto de perfil cuadrada `<nombre>-pfp.png` (se usa en iconos y diálogos; la otra, en tarjetas y en la pantalla VS).
   El **id** es el nombre de la carpeta en minúsculas (carpeta `Ansol` → id `ansol`).
   Los `.md`/`.txt` de la carpeta **ya no se muestran**: las descripciones son propias del juego.
2. Añade su entrada en **`content/fighters.ts`**: descripción, estilo, estadísticas, golpes, finisher y aspecto.
   Hay un manual al principio de ese archivo (incluye el golpe fuerte aleatorio `heavyRandom` y rasgos como `rootedGuard`). Si no la añades, el juego lo detecta igualmente y le da un perfil equilibrado.
3. Los golpes se eligen de la biblioteca `src/combat/moves.ts` y pueden repetirse entre luchadores, **pero cada finisher es único**: el juego avisa en la consola si repites uno (y hay un test que lo comprueba).
4. Con **8 luchadores o más** el torneo pasa solo a cuadro de 8.

### Escribir los diálogos
Edita **`content/dialogos.md`** (el formato está explicado dentro, con ejemplos). Hay diálogos de *antes del combate*, de *victoria* y de *campeón*, por pareja de luchadores o con comodín `*`.

### Ajustar el equilibrio
- `src/combat/Match.ts`: `DMG_SCALE` (duración de los combates), fuerza de pins y sumisiones.
- `src/ai/AIController.ts`: perfiles `PROFILES` de las 3 dificultades.
- `src/combat/moves.ts`: daño, alcance y velocidad de cada golpe.

### Estructura
```
fighters/            fotos e historias (tú las editas)
content/             fighters.ts (stats) y dialogos.md
src/combat/          Match.ts (simulación pura), moves.ts, tipos
src/ai/              IA de la CPU
src/fighters/        modelo 3D procedural + animación por poses
src/arenas/          ring, público instanciado, Matamoros, Manchester, orquesta, monigote
src/game/            Game (flujo), Battle, BattleView (render del combate), Showcase (fondo de menús)
src/ui/              pantallas, HUD y controles táctiles
src/audio/           audio sintetizado con WebAudio (sin archivos)
src/modes/           torneo y simulación de combates CPU vs CPU
src/progress/        guardado, logros y desbloqueos
```

### Pruebas
```bash
npm test             # lógica del juego: reglas, IA, torneo, diálogos, finishers únicos
npm run typecheck
```
En `scripts/` hay pruebas visuales automáticas con un navegador Chromium (capturas, flujo completo, móvil…).
Arranca antes `npm run dev` y define `CHROMIUM=/ruta/al/navegador` si no está en la ruta habitual.

### Ideas para la siguiente fase
- **Modelos más realistas (Mixamo/GLB)**: el código está preparado (`FighterModel` es una interfaz aislada del combate). Descargando personajes y animaciones de lucha desde mixamo.com se pueden sustituir los cuerpos procedurales sin tocar la lógica.
- **Modo Historia** y **Supervivencia**.
- Música y locución propias en lugar de la sintetizada.

### Sobre una build propia (app de escritorio/móvil)
Con WebGL el juego va bien en navegador (medido en el Mac mini M4 y en emulación móvil). Una app propia (Tauri/Electron o Capacitor) **no mejora el rendimiento** de forma apreciable; solo serviría para distribuirlo como app o jugar sin conexión. Por ahora no hace falta.


## Modo Historia ("Temporada 5: El fichaje")

Nueve capítulos con novela visual, decisiones y combates especiales (parejas, jaula, aguantar el tiempo, Gauntlet, jefes con fases). Tres finales: **Campeón leal**, **Dueño del Hoyo** y **El rebelde**.

- Contenido: `content/historia.ts` (capítulos, escenas, combates, finales). Lógica pura y tests: `src/modes/Story.ts`, `src/modes/Story.test.ts`.
- Protagonista: Chema (`content/fighters.ts`); luchadores de la historia sin foto reciben un retrato generado (`src/content/avatar.ts`).
- Mapas nuevos: Oficina de Pablo Motos, Ascensor 24/7, Estadio de Santiago (`src/arenas/`).
- Probar la historia entera en el navegador: `npm run dev` y `node scripts/story-e2e.mjs elso|pablo [0|1]`; combates con tiempo/jefe: `node scripts/story-fights.mjs`.


## Mundo abierto ("El Hoyo City")

Ciudad explorable en 3D (tercera persona) enlazada al Modo Historia: 8 distritos (Plaza, 3000 Viviendas, Aldea Kongui, Playa, Manchester, Polígono, Torre Motos, Santiago) que se abren al avanzar los capítulos. Ciclo día/noche, combates callejeros, nivel/XP/Hoyos, gimnasio y equipo (los bonos de Chema valen en todos los modos, tope +30 %), tienda, taxi con viaje rápido, mapa, 24 misiones, 30 pegatinas, 10 grafitis, cartas de luchador, 4 minijuegos (pulso, comilona, pesca, tambores), apuestas nocturnas en el garito y Torre Motos tras el final.

- Lógica pura y tests: `src/modes/World.ts`, `src/modes/World.test.ts`, `src/world/layout.test.ts`.
- Datos: `content/mundo.ts`, `content/mundo-npc.ts`, `content/misiones.ts`. Escena y controlador: `src/world/` (`WorldView`, `WorldController`, `minigames`, `layout`); UI: `src/ui/WorldUI.ts`.
- Pruebas en navegador (con `npm run dev`): `node scripts/world-e2e.mjs`, `node scripts/world-tour.mjs <carpeta>`.
