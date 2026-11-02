# DIÁLOGOS — El Hoyo Wrestling

Aquí escribes tú los diálogos que salen antes de cada combate y cuando alguien gana.
Los cambios se ven al recargar la página (o al guardar, si tienes `npm run dev` abierto).

## Cómo se escribe

Cada bloque empieza con un título `## luchador1 vs luchador2` (el orden da igual).
Usa el nombre de la CARPETA del luchador en minúsculas (`elso`, `petisui`, `pablo motos`...).
Puedes poner `*` como comodín:

- `## elso vs petisui`    → solo cuando se enfrentan esos dos
- `## elso vs *`          → cuando Elso se enfrenta a cualquiera
- `## * vs *`             → para cualquier combate (el último recurso)

Debajo, una línea por frase, con este formato:

    - [momento] luchador: texto de la frase

Momentos disponibles:

- `[pre]`            antes de empezar el combate (se muestra en orden)
- `[victoria]`      cuando termina el combate: habla el luchador que lo escribas
- `[victoria:id]`   igual, pero solo si ha ganado ese luchador (ej. `[victoria:elso]`)
- `[campeon]`       cuando alguien gana el torneo (usa el bloque `## * vs *` o el del luchador)

Si quieres varias versiones del mismo diálogo, sepáralas con una línea `---`.
El juego elegirá una al azar cada vez.

Si un combate no tiene ningún diálogo, simplemente se salta la escena.

---------------------------------------------------------------------------

## elso vs petisui
- [pre] elso: Dos de los tres grandes en el mismo ring. Esto lo van a recordar en el Hoyo.
- [pre] petisui: Tú ganaste una temporada, yo me quedé con el cariño de la gente. Vamos a ver quién manda.
- [pre] elso: Hablas mucho para llevar la máscara de un perro.
- [pre] petisui: Y tú pegas poco para ir de amarillo.
- [pre] petisui: Maricon
- [victoria:elso] elso: Rápido y limpio. Así se gana.
- [victoria:petisui] petisui: ¡Aguanto lo que haga falta! ¿Ya te cansaste?

## pablo motos vs *
- [pre] pablo motos: Soy el jefe, el que pone la pasta. Pelea bien, o a la calle.
- [victoria:pablo motos] pablo motos: Mi empresa, mis reglas. Estás despedido.

## elso vs *
- [pre] elso: No tengo tiempo para calentar. Que empiece ya.
- [victoria:elso] elso: Uno menos. ¿Quién sigue?

## petisui vs *
- [pre] petisui: Vengo a hacer espectáculo. Y a cobrar.
- [victoria:petisui] petisui: Con la silla o sin ella, gano yo.

## * vs *
- [pre] arbitro: Señoras y señores, ¡bienvenidos al Hoyo Wrestling!
- [campeon] arbitro: ¡Un nuevo campeón del Hoyo! Hoy se escribe historia.
