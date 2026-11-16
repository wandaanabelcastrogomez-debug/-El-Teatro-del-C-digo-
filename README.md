# 🎭 El Teatro del Código

**Juego para aprender HTML y CSS desde cero, montando una obra de teatro.**

Escribes código de verdad en el editor, lo ves aplicarse al instante en la escena y el juego te
corrige solo: 14 niveles en 3 capítulos, con 3 pistas por nivel, solución explicada y estrellas.

---

## 1. Qué es

Un juego educativo de navegador (HTML + CSS + JavaScript) para aprender los fundamentos del
desarrollo web practicando, no leyendo:

- **HTML**: etiquetas, texto, listas, imágenes con `alt` y enlaces con `href`.
- **CSS · selectores**: elegir elementos por etiqueta, clase, id, descendencia y posición.
- **CSS · propiedades**: color, fondo, tipografía, caja (`padding`, `border`, `border-radius`).

No hay que instalar nada, no hay dependencias, no hay servidor y no se envía ningún dato a
ninguna parte: todo ocurre en tu navegador.

**Para quién es:** para quien nunca ha escrito una línea de código (a partir de ~10–12 años) y
también para quien quiere repasar selectores, que es donde más gente se atasca.

**Duración:** entre 45 y 90 minutos para completar los 14 niveles.

---

## 2. Cómo se abre

Hay dos formas, elige la que te resulte más cómoda:

| Formato | Qué abrir | Cuándo usarlo |
|---|---|---|
| Un solo archivo | `el-teatro-del-codigo.html` | Lo más rápido: doble clic y a jugar. |
| Carpeta | `teatro-codigo/index.html` | Si quieres leer o modificar el código del juego. |

Funciona en cualquier navegador moderno (Chrome, Edge, Firefox, Safari) en ordenador, tableta
y móvil. **No necesita conexión a internet**, con una excepción: la imagen del nivel 4 es un
ejemplo en línea (`picsum.photos`). Sin conexión verás un recuadro gris; el nivel se supera
igual, porque lo que se comprueba es que existan los atributos `src` y `alt`.

---

## 3. La pantalla

    ┌──────────────┬────────────────────────┬─────────────────────┐
    │  MISIÓN      │   🎬 LA ESCENA         │   EDITOR            │
    │  qué hay que │   la página de verdad, │   aquí escribes tu  │
    │  hacer        │   se actualiza sola   │   código            │
    │  objetivos ✓ │                        │   ─────────────     │
    │  pistas 💡   │   debajo: Ver HTML     │   AVISOS            │
    └──────────────┴────────────────────────┴─────────────────────┘

- **Misión**: el reto, la lista de objetivos (se marcan solos en verde) y las pistas.
- **Escena**: el resultado real de tu código. Nada de aproximaciones: es el navegador pintando.
- **Editor**: donde escribes. Debajo, los avisos (propiedades mal escritas, qué falta…).
- **Arriba**: los 14 niveles. Puedes volver a cualquiera que ya hayas abierto.

---

## 4. Cómo se juega

La regla es siempre la misma:

1. Lee la misión.
2. Escribe el código en el editor.
3. **No hay que pulsar nada**: la escena y los objetivos se actualizan mientras escribes
   (o pulsa `Ctrl + Enter` / el botón **✓ Comprobar**).
4. Cuando todos los objetivos están en verde, salta *¡Nivel superado!* y pasas al siguiente.

### Capítulo 🎬 El escenario (niveles 1–5)
Escribes etiquetas HTML y aparece la página. Ejemplo del nivel 1:

    <h1>La Casa de las Etiquetas</h1>

### Capítulo 💡 Los focos (niveles 6–10)
La escena ya está montada. Los elementos que hay que encender llevan un **borde dorado
discontinuo** 🎯. Escribes **solo el selector**, sin llaves:

    .menu li

Los aciertos se marcan en **verde**, los que sobran en **rosa**, y bajo la escena ves la cuenta
(«enciende 2 · deben ser 3»). Ganas cuando enciendes **exactamente** los marcados.

### Capítulo 👗 El vestuario (niveles 11–14)
La regla CSS ya está escrita y el editor te muestra el envoltorio:

    .tarjeta {
       ← aquí escribes solo las declaraciones
    }

    color: #7a1f3d;
    background-color: #fde7c9;

En la misión tienes el **Modelo**: el aspecto exacto que debe tener la caja. Cada propiedad se
marca ✓ cuando coincide con el modelo (con margen de 1 píxel).

---

## 5. Los 14 niveles

| # | Nivel | Capítulo | Se aprende |
|---|-------|----------|-----------|
| 1 | Tu primera etiqueta | 🎬 HTML | `<h1>`, abrir y cerrar |
| 2 | Título y párrafo | 🎬 HTML | `<p>`, etiquetas de bloque |
| 3 | La lista del reparto | 🎬 HTML | `<ul>` con `<li>` dentro |
| 4 | Cartel: imagen y enlace | 🎬 HTML | atributos `src`, `alt`, `href` |
| 5 | El programa completo | 🎬 HTML | combinar todo lo anterior |
| 6 | Enciende los párrafos | 💡 Selectores | selector de etiqueta `p` |
| 7 | Solo los actores | 💡 Selectores | selector de clase `.actor` |
| 8 | El protagonista | 💡 Selectores | selector de id `#protagonista` |
| 9 | Los platos del menú | 💡 Selectores | descendiente `.menu li` |
| 10 | El primero y el último | 💡 Selectores | `:first-child`, `:last-child`, coma |
| 11 | Pintar la tarjeta | 👗 Propiedades | `color`, `background-color` |
| 12 | Letras grandes y centradas | 👗 Propiedades | `font-size`, `font-weight`, `text-align` |
| 13 | Aire y esquinas | 👗 Propiedades | `padding`, `border-radius`, `border` |
| 14 | El botón de la entrada | 👗 Propiedades | repaso de 6 propiedades |

---

## 6. Ayudas

- **💡 Dame una pista** — 3 pistas por nivel, de menos a más: *la idea* → *cómo se escribe* →
  *código casi completo con huecos*.
- **🧪 Ver la solución** — código final **explicado** y botón para copiarlo al editor.
- **📖 Chuleta** — tabla de atajos del capítulo en el que estás. Es tu hoja de apuntes.
- **Ver HTML** — en los niveles de selectores, muestra el código de la escena para ver clases e ids.
- **Avisos** — mensajes bajo el editor: propiedades inventadas, valores que no se aplican, etc.

---

## 7. Puntuación y progreso

- **⭐⭐⭐** superar el nivel sin usar pistas.
- **⭐⭐** con 1 o 2 pistas. **⭐** con las 3 pistas.
- El progreso **y el código de cada nivel** se guardan en el navegador (clave
  `teatro-progreso-v1` en `localStorage`). Si cierras la pestaña, sigues donde estabas.
- Para empezar de cero: borra los datos del sitio en tu navegador, o abre el archivo en una
  ventana privada.
- Cada nivel se puede repetir; se conserva la mejor puntuación.

---

## 8. Receta si te atascas

1. Lee los **objetivos**: dicen exactamente qué falta.
2. Mira los **avisos** debajo del editor.
3. En selectores, abre **Ver HTML** y busca la clase o el id que necesitas.
4. Pide **una** pista.
5. Mira la **solución** y, al día siguiente, intenta escribirla de memoria en un nivel parecido.

Errores típicos de principiante que este juego detecta o castiga:

- Olvidar el cierre: `<h1>Hola` en lugar de `<h1>Hola</h1>`.
- Poner el punto donde va la almohadilla: `.protagonista` en vez de `#protagonista`.
- Escribir `p` cuando piden solo los que tienen clase (`p.actor` o `.actor`).
- Olvidar el `;` al final de una declaración CSS, o escribir `=` en lugar de `:`.
- Poner `padding` con un solo valor cuando el modelo pide dos (vertical y horizontal).

---

## 9. Cómo comprueba (para curiosos y docentes)

- **HTML**: se analiza el DOM que has creado y se buscan condiciones reales (que exista `h1`,
  que haya 3 `li` dentro de `ul`, que `alt` no esté vacío…). Por seguridad, en este capítulo se
  ignoran `<script>`, `<style>` y similares.
- **Selectores**: se comparan los nodos que ilumina tu selector con el conjunto objetivo. Tiene
  que coincidir exactamente: ni uno de más ni uno de menos.
- **Propiedades**: se aplican tus declaraciones al elemento y se comparan con el **estilo
  calculado** (`getComputedStyle`) del modelo de referencia, con tolerancia de 1 px.

No hay respuestas «casi»: si el color es otro, no se marca. Por eso la misión siempre dice los
valores exactos y el modelo enseña el resultado.

**Para usar en clase:** los tres capítulos son independientes; se puede hacer el 1 en una sesión,
el 2 en otra. Las pistas están graduadas para que nadie se quede bloqueado, y el botón de
solución sirve para explicar en la pizarra.

---

## 10. Archivos del juego

    teatro-codigo/
    ├── index.html     estructura de la interfaz (3 columnas, modales)
    ├── estilos.css    todo el aspecto visual (tema teatro, responsive)
    ├── juego.js       niveles + comprobadores + lógica de la interfaz
    └── LEEME.md       este archivo

`juego.js` contiene los 14 niveles en un array (`NIVELES`) descrito de forma declarativa. Cada
nivel indica su capítulo (`html`, `selector` o `estilo`), su texto, sus objetivos, sus 3 pistas,
su solución y su explicación. Para **añadir un nivel** basta con copiar uno parecido, cambiar
el `id` (consecutivo), el texto y los objetivos.

---

## 11. Preguntas frecuentes

**¿Necesito internet?** No, salvo la imagen de ejemplo del nivel 4 (y el nivel se supera igual).

**¿Se puede jugar en el móvil?** Sí, la interfaz se apila en una columna. Escribir código en el
móvil es incómodo, pero funciona; lo ideal es una tableta u ordenador.

**No me guarda el progreso.** Pasa en ventanas privadas o si el navegador bloquea el
almacenamiento local. El juego funciona igual, solo que empieza de cero cada vez.

**¿Se puede modificar?** Sí: es tuyo. Cambia textos, colores (`estilos.css`) o añade niveles
(`juego.js`).

**¿Y el otro juego?** *«De Cero a Código»* es el de JavaScript: un robot jardinero al que
programas con bucles, variables y condiciones. Los dos son independientes.

---

*Hecho para aprender practicando. Si algo no se ve bien en tu navegador, avísame y se corrige.*
