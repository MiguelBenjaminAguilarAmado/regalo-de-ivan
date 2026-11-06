# El Hoyo Wrestling — El videojuego

> Inspirado en la obra original de **Jefefbi**.

Juego de lucha libre en **3D** para navegador (PC y móvil), de **un jugador contra la CPU**.
Modos: **Historia · Hoyo** (la ciudad de Hoyo y la Temporada 5 en un solo modo: los capítulos empiezan y acaban en la calle, con escenas y diálogos entre los vecinos y los luchadores), **Versus**, **Torneo**, **Supervivencia**, **Entrenamiento** y **Espectador** (dos CPUs luchan con cámara de director y narrador).

El zoom de la página está bloqueado (pellizco, doble toque y Ctrl + rueda) para que el juego se vea siempre igual en el móvil.

### Hoyo, la ciudad
- Gente paseando (con bocadillos de lo que comentan según cómo vaya la historia), coches que frenan si te cruzas, luchadores entrenando por la calle, un ring de exhibición en la plaza con público y carteles con las caras de los luchadores.
- Mapa (botón MAPA o tecla M) con calles, barrios, luchadores y la estrella dorada del siguiente capítulo; arriba siempre ves el objetivo con una flecha y la distancia.
- La ciudad es de una pieza (≈340 m de lado): cuatro grandes avenidas entre ocho distritos y, dentro de cada uno, su trazado propio — avenidas anchas en la Torre, bulevar en Manchester, callejuelas en las 3000, naves en el polígono, paseo marítimo en la playa y un parque en la Aldea. Se define en `content/mundo.ts` (`streets` de cada distrito) y se genera en `src/world/layout.ts`.
- Moto para cruzar la ciudad, taxis de Hoyo en cada parada, cama y armario en casa, y los combates callejeros en su propio escenario: el Callejón de Hoyo.
- Toda la ciudad está abierta; lo que se cierra hasta su capítulo son algunos edificios (el teatro, la fábrica, el estadio de Santiago, el vestíbulo de la Torre, el parque de combates de la tribu).
- Cada barrio tiene su cultura: tendederos y la peña bética en las 3000, cabinas rojas y autobús de dos pisos en Manchester, banderas chilenas y un rincón de Rosario Central en Santiago, palapas y cayucos en la playa hondureña, chimeneas y contenedores en el polígono, banderas «PM» en la Torre y la Aldea de Kongui con callejuelas cortadas y un parque de combates (`src/world/Barrios.ts`).
- Voces: Pepe cecea («Ola chicoz, soy yo ¡Pepe! que paza chavalez») y Elso habla catracho, en todos los textos (`src/content/voices.ts`; empieza una frase con `=` para que no se transforme).
- **Modo dev**: Ajustes → Modo desarrollador; luego F2 o el botón DEV. Ir a cualquier sitio, cambiar la hora, dinero y nivel, atravesar paredes, saltar o jugar cualquier capítulo, poner banderas, retocar las estadísticas de cualquier luchador, desbloquearlo todo, lanzar combates de prueba y editar la partida guardada en JSON.
- Con mando: stick derecho = cámara, A = hablar/usar, Y = mapa, X = bolsa, Select = misiones; todos los textos de botones pasan a A/B/X/Y.
- El guion que une la ciudad con la historia (prólogo, llegada a cada capítulo, lo que pasa después y lo que dice la gente) está en **`content/historia-ciudad.ts`**.

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

## Pantalla doble (AYN Thor)

El juego va en la pantalla de **arriba** y la de **abajo** hace de panel táctil:
- **En la ciudad:** mapa en vivo (cerca / barrio / ciudad entera), objetivo de la historia, misión activa y botones (usar, misiones, bolsa, armario, mapa, cerrar, pausa).
- **En combate:** barras de vida, resistencia y momentum de los dos, el tiempo, tus golpes con los botones de la Thor (A/B/X/Y, LB, RB) y botones de burla, finisher, relevo y pausa.
- **En las escenas:** el diálogo en grande y las opciones para elegirlas tocando.

Cómo ponerlo:
1. Abre el juego en la pantalla de arriba (en Chrome).
2. En **Ajustes → Abrir pantalla de abajo** (o en la pausa de la ciudad), o abre a mano la misma dirección acabada en `?pantalla=abajo` en **otra ventana del mismo navegador**.
3. Con el botón de cambiar de pantalla de la Thor, deja esa ventana abajo. Se conecta sola (arriba sale «📱 Pantalla de abajo conectada») y arriba desaparecen el minimapa y los botones, que ya están abajo.

Las dos ventanas se hablan por `BroadcastChannel`, así que tienen que ser **del mismo navegador**. Si tocas la pantalla de abajo y el mando deja de llegar arriba, no pasa nada: la ventana de abajo reenvía el mando al juego.

## APK para Android (AYN Thor)

Descarga directa: **`docs/el-hoyo.apk`** (también en GitHub Pages: `…/regalo-de-ivan/el-hoyo.apk`).
- Lleva el juego dentro: funciona sin internet (solo las fuentes tipográficas vienen de internet; si no hay, usa otras).
- Pantalla completa en horizontal, pantalla siempre encendida, mando de la Thor directo y el botón B no cierra el juego.
- **Dos pantallas automáticas:** si el aparato tiene una segunda pantalla (la de abajo de la Thor), la app abre en ella la pantalla de abajo sola y las dos se hablan por un puente nativo.
- Para instalarlo: copia el APK a la consola (o descárgalo desde ella), ábrelo y permite «instalar apps de origen desconocido».

Para compilarlo: `./scripts/build-apk.sh` (necesita el SDK de Android en `ANDROID_HOME` con `platforms;android-35` y `build-tools;35.0.0`, y Gradle 8.9+). El proyecto Android está en `android/`. La clave de firma NO va en el repositorio: ponla en `android/keystore.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`; está en `.gitignore`); sin ella se firma con la clave de depuración. Un APK nuevo solo se instala encima del anterior (sin perder la partida) si está firmado con la misma clave.

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
