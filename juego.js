/* =====================================================================
   El Teatro del Código · Aprende HTML y CSS jugando
   ---------------------------------------------------------------------
   PARTE 1 · Núcleo: niveles y comprobadores (sin DOM propio, se puede
             cargar en Node para probar).
   PARTE 2 · Interfaz: escena, objetivos, pistas y progreso.
   ===================================================================== */
(function (raiz) {
  "use strict";

  /* ===================================================================
     PARTE 1 · NIVELES
     =================================================================== */

  var CAPITULOS = {
    html:     { nombre: "El escenario", icono: "🎬", archivo: "index.html",     color: "#c2410c" },
    selector: { nombre: "Los focos",    icono: "💡", archivo: "focos.css",      color: "#7c3aed" },
    estilo:   { nombre: "El vestuario", icono: "👗", archivo: "vestuario.css",  color: "#0e7490" }
  };

  var NIVELES = [

    /* ================= CAPÍTULO 1 · HTML ================= */
    {
      id: 1, cap: "html",
      titulo: "Tu primera etiqueta",
      concepto: "HTML · etiquetas",
      texto: "¡Bienvenido al teatro! Soy la directora y la escena está vacía.\n\n" +
             "El **HTML** son etiquetas que dicen qué es cada cosa: un título, un párrafo, una imagen. " +
             "Un título grande se escribe `${<h1>El texto</h1>}`: una etiqueta de apertura, el texto y la " +
             "etiqueta de cierre (con la barra `/`).\n\n" +
             "Escribe un `${<h1>}` con el nombre de nuestra obra: **La Casa de las Etiquetas**.",
      plantilla: "<!-- Escribe tu etiqueta aquí debajo -->\n",
      objetivos: [
        { tipo: "existe",    sel: "h1", texto: "Hay una etiqueta <h1> en la escena" },
        { tipo: "textoMin",  sel: "h1", min: 3, texto: "El <h1> contiene un texto" }
      ],
      pistas: [
        { t: "La idea", v: "Una etiqueta es `<algo>` + texto + `</algo>`. Todo lo que escribas entre las dos se ve en la página." },
        { t: "Cómo se escribe", v: "Abre con <code>&lt;h1&gt;</code>, escribe el texto y cierra con <code>&lt;/h1&gt;</code>. La barra del cierre no se puede olvidar." },
        { t: "Casi lo tienes", v: "Solo faltan las palabras y el cierre:", codigo: "<h1>La Casa de las __</h1>" }
      ],
      solucion: "<h1>La Casa de las Etiquetas</h1>",
      nota: "`<h1>` es un título de primer nivel. La etiqueta de apertura `<h1>` y la de cierre `</h1>` envuelven el texto: eso es todo HTML. El navegador lo muestra grande y en negrita sin que tú tengas que decir nada más."
    },
    {
      id: 2, cap: "html",
      titulo: "Título y párrafo",
      concepto: "HTML · bloques",
      texto: "Un cartel necesita un título y algo de texto debajo. El párrafo se escribe con " +
             "`${<p>…</p>}`.\n\n" +
             "Añade a la escena un `${<h1>}` con **Función de esta noche** y un `${<p>}` que diga " +
             "**A las 20:00 en el Teatro del Código**.",
      plantilla: "<!-- Un título y un párrafo -->\n",
      objetivos: [
        { tipo: "textoMin", sel: "h1", min: 3, texto: "Un <h1> con el título de la función" },
        { tipo: "textoMin", sel: "p",  min: 10, texto: "Un <p> con el texto de la hora y el lugar" }
      ],
      pistas: [
        { t: "La idea", v: "Cada etiqueta es un bloque distinto: el navegador los pone uno debajo de otro." },
        { t: "Cómo se escribe", v: "Primero <code>&lt;h1&gt;Función de esta noche&lt;/h1&gt;</code> y debajo <code>&lt;p&gt;A las 20:00 en el Teatro del Código&lt;/p&gt;</code>." },
        { t: "Casi lo tienes", v: "Falta el párrafo completo:", codigo: "<h1>Función de esta noche</h1>\n<p>A las 20:00 en el ______ del Código</p>" }
      ],
      solucion: "<h1>Función de esta noche</h1>\n<p>A las 20:00 en el Teatro del Código</p>",
      nota: "`<h1>` y `<p>` son etiquetas de bloque: cada una empieza en una línea nueva. Fíjate en que el texto vive **dentro** de las etiquetas, y que cada una se cierra en el orden en que se abrió."
    },
    {
      id: 3, cap: "html",
      titulo: "La lista del reparto",
      concepto: "HTML · listas",
      texto: "El reparto se escribe con una lista: `${<ul>}` crea la lista y cada `${<li>}` es un " +
             "elemento con su punto.\n\n" +
             "Escribe una lista con **3 actores**: ${Ana}, ${Luis} y ${Marta}. Los `${<li>}` van " +
             "**dentro** de la `${<ul>}`.",
      plantilla: "<h2>Reparto</h2>\n\n",
      objetivos: [
        { tipo: "existe",  sel: "ul", texto: "Hay una lista <ul>" },
        { tipo: "cuenta",  sel: "ul > li", min: 3, texto: "Con 3 elementos <li> dentro" },
        { tipo: "textoMin", sel: "ul > li", min: 2, texto: "Cada <li> tiene un nombre" }
      ],
      pistas: [
        { t: "La idea", v: "La lista es una caja (`ul`) y cada nombre es una cosa dentro de la caja (`li`)." },
        { t: "Cómo se escribe", v: "<code>&lt;ul&gt;</code> … <code>&lt;/ul&gt;</code> y dentro tres veces <code>&lt;li&gt;Nombre&lt;/li&gt;</code>, una por actor." },
        { t: "Casi lo tienes", v: "Faltan dos actores:", codigo: "<ul>\n  <li>Ana</li>\n  <li>____</li>\n  <li>____</li>\n</ul>" }
      ],
      solucion: "<h2>Reparto</h2>\n<ul>\n  <li>Ana</li>\n  <li>Luis</li>\n  <li>Marta</li>\n</ul>",
      nota: "Las listas se anidan: los `<li>` van dentro del `<ul>`. El navegador añade los puntos solo, y si te fijas en el código, las líneas interiores están sangradas para que se lea mejor (el sangrado no cambia nada, es para las personas)."
    },
    {
      id: 4, cap: "html",
      titulo: "Cartel: imagen y enlace",
      concepto: "HTML · atributos",
      texto: "Las etiquetas pueden llevar **atributos**, datos extra dentro de la etiqueta de apertura.\n\n" +
             "Una imagen es `${<img src=\"...\" alt=\"...\">}`: `${src}` es la dirección de la foto y " +
             "`${alt}` es el texto que se lee si la imagen no carga (¡también para quien no puede verla!). " +
             "No se cierra con `</img>`.\n\n" +
             "Un enlace es `${<a href=\"...\">texto</a>}`.\n\n" +
             "Añade una imagen con `${src}` y `${alt}`, y un enlace que lleve a una dirección que empiece por " +
             "`${https://}`.",
      plantilla: "<!-- Una imagen con alt y un enlace -->\n",
      objetivos: [
        { tipo: "atributo", sel: "img", attr: "src", texto: "Hay una <img> con src" },
        { tipo: "atributo", sel: "img", attr: "alt", texto: "La imagen tiene texto alternativo (alt)" },
        { tipo: "atributoIncluye", sel: "a", attr: "href", incluye: "http", texto: "Hay un <a> con href que empieza por http" },
        { tipo: "textoMin", sel: "a", min: 2, texto: "El enlace tiene un texto para hacer clic" }
      ],
      pistas: [
        { t: "La idea", v: "Los atributos van dentro de la etiqueta de apertura, con la forma `nombre=\"valor\"`." },
        { t: "Cómo se escribe", v: "<code>&lt;img src=\"https://picsum.photos/240/140\" alt=\"Cartel de la obra\"&gt;</code> y <code>&lt;a href=\"https://ejemplo.com\"&gt;Comprar entradas&lt;/a&gt;</code>." },
        { t: "Casi lo tienes", v: "Los dos atributos de la imagen:", codigo: "<img ____=\"https://picsum.photos/240/140\" alt=\"Cartel de la obra\">\n<a ____=\"https://ejemplo.com\">Comprar entradas</a>" }
      ],
      solucion: "<img src=\"https://picsum.photos/240/140\" alt=\"Cartel de la obra\">\n\n<a href=\"https://ejemplo.com\">Comprar entradas</a>",
      nota: "Los atributos son datos extra: `src` dice **dónde** está la imagen y `alt` la **describe**. `<img>` es una etiqueta vacía, no envuelve texto, por eso no lleva cierre. El `alt` es obligatorio en una web bien hecha."
    },
    {
      id: 5, cap: "html",
      titulo: "El programa completo",
      concepto: "HTML · todo junto",
      texto: "Última misión del escenario: monta el programa de mano entero combinando todo lo aprendido.\n\n" +
             "Necesito un `${<h2>}` con **Programa**, una lista con **3** `${<li>}`, una `${<img>}` con " +
             "`${src}` y `${alt}`, y un `${<a>}` con `${href}` y un texto. El orden lo eliges tú.",
      plantilla: "<!-- Monta el programa completo -->\n\n",
      objetivos: [
        { tipo: "textoMin", sel: "h2", min: 3, texto: "Un <h2> con un título de sección" },
        { tipo: "cuenta", sel: "ul > li", min: 3, texto: "Una lista con al menos 3 <li>" },
        { tipo: "atributo", sel: "img", attr: "alt", texto: "Una <img> con alt" },
        { tipo: "atributoIncluye", sel: "a", attr: "href", incluye: "http", texto: "Un <a> con href" }
      ],
      pistas: [
        { t: "La idea", v: "No hay una única respuesta: combina los bloques del capítulo en cualquier orden razonable." },
        { t: "Estructura", v: "Título de sección (<code>h2</code>), lista de actos (<code>ul</code> con <code>li</code>), imagen del cartel (<code>img</code> con <code>alt</code>) y enlace de entradas (<code>a</code> con <code>href</code>)." },
        { t: "Casi lo tienes", v: "Faltan la imagen y el enlace:", codigo: "<h2>Programa</h2>\n<ul>\n  <li>Acto I</li>\n  <li>Acto II</li>\n  <li>Acto III</li>\n</ul>\n<img src=\"https://picsum.photos/240/140\" ____=\"Cartel\">\n<a ____=\"https://ejemplo.com\">Entradas</a>" }
      ],
      solucion: "<h2>Programa</h2>\n<ul>\n  <li>Acto I: la llegada</li>\n  <li>Acto II: los focos</li>\n  <li>Acto III: el vestuario</li>\n</ul>\n<img src=\"https://picsum.photos/240/140\" alt=\"Cartel de la obra\">\n<p><a href=\"https://ejemplo.com\">Comprar entradas</a></p>",
      nota: "Una página es una caja de bloques: títulos, listas, imágenes y enlaces, cada uno con su etiqueta. Con estas cinco etiquetas ya puedes montar un cartel, un menú o una ficha de presentación."
    },

    /* ================= CAPÍTULO 2 · SELECTORES ================= */
    {
      id: 6, cap: "selector",
      titulo: "Enciende los párrafos",
      concepto: "CSS · selector de etiqueta",
      texto: "¡Cambio de capítulo! Ahora el CSS: en vez de escribir contenido, **elegimos** qué " +
             "elementos pintar.\n\n" +
             "Un selector es el «quién» de la regla. Si escribes el nombre de una etiqueta, eliges " +
             "**todos** los elementos de esa etiqueta.\n\n" +
             "Escribe un selector que encienda solo los **3 párrafos** (los elementos con borde dorado).",
      escena: "<article class=\"guion\">\n  <h2>Programa de la noche</h2>\n  <p>Acto primero: el escenario se ilumina.</p>\n  <p>Acto segundo: entran los actores.</p>\n  <p>Acto tercero: cae el telón.</p>\n  <a href=\"#\">Comprar entradas</a>\n</article>",
      marcar: ["p"],
      plantilla: "",
      objetivos: [{ tipo: "selector", texto: "Tu selector enciende los 3 párrafos y nada más" }],
      pistas: [
        { t: "La idea", v: "Para elegir por etiqueta se escribe solo el nombre de la etiqueta, sin puntos ni almohadillas." },
        { t: "Cómo se escribe", v: "El selector de párrafo es <code>p</code>. Nada de llaves: en este capítulo escribimos solo el selector." },
        { t: "Casi lo tienes", v: "Escribe estas dos letras:", codigo: "p" }
      ],
      solucion: "p",
      nota: "`p` es un selector de etiqueta: elige **todos** los párrafos de la página. Es el selector más amplio, y por eso el título `h2` y el enlace `a` se quedan apagados."
    },
    {
      id: 7, cap: "selector",
      titulo: "Solo los actores",
      concepto: "CSS · selector de clase",
      texto: "Los párrafos con la clase `${actor}` son los que llevan el diálogo. Una **clase** es una " +
             "etiqueta que tú inventas y se escribe en el HTML como `${class=\"actor\"}`.\n\n" +
             "En CSS las clases se escriben con un **punto delante**: `${.actor}`.\n\n" +
             "Enciende solo los **2 párrafos** que tienen la clase `${actor}`.",
      escena: "<article class=\"guion\">\n  <h2>Reparto</h2>\n  <p class=\"actor\">Ana: «¿Dónde está mi vestuario?»</p>\n  <p>Luis entra en escena.</p>\n  <p class=\"actor\">Marta: «¡Silencio, por favor!»</p>\n</article>",
      marcar: [".actor"],
      plantilla: "",
      objetivos: [{ tipo: "selector", texto: "Tu selector enciende los 2 elementos con class=\"actor\"" }],
      pistas: [
        { t: "La idea", v: "El punto delante del nombre es lo que dice «esto es una clase»." },
        { t: "Cómo se escribe", v: "La clase `actor` se selecciona con <code>.actor</code>." },
        { t: "Casi lo tienes", v: "Punto + nombre:", codigo: "____actor" }
      ],
      solucion: ".actor",
      nota: "`.actor` elige los elementos que tienen `class=\"actor\"`, sin importar de qué etiqueta sean. Las clases son la herramienta más usada del CSS: puedes poner la misma clase a muchos elementos distintos y pintarlos de una vez."
    },
    {
      id: 8, cap: "selector",
      titulo: "El protagonista",
      concepto: "CSS · selector de id",
      texto: "El **id** es un nombre único: en una misma página no puede repetirse. En HTML se escribe " +
             "`${id=\"protagonista\"}` y en CSS con una **almohadilla**: `${#protagonista}`.\n\n" +
             "Enciende solo el párrafo del protagonista.",
      escena: "<article class=\"guion\">\n  <h2>Reparto</h2>\n  <p id=\"protagonista\">Ana, la protagonista</p>\n  <p>Luis, el ayudante</p>\n  <p>Marta, la directora</p>\n</article>",
      marcar: ["#protagonista"],
      plantilla: "",
      objetivos: [{ tipo: "selector", texto: "Tu selector enciende solo el elemento con id=\"protagonista\"" }],
      pistas: [
        { t: "La idea", v: "El id se marca con una almohadilla, igual que la clase se marca con un punto." },
        { t: "Cómo se escribe", v: "<code>#protagonista</code>, todo junto y sin espacios." },
        { t: "Casi lo tienes", v: "Falta el símbolo:", codigo: "____protagonista" }
      ],
      solucion: "#protagonista",
      nota: "`#protagonista` elige el elemento con ese `id`. Como un id es único en la página, solo enciende uno: perfecto para algo que aparece una sola vez (la cabecera, el protagonista)."
    },
    {
      id: 9, cap: "selector",
      titulo: "Los platos del menú",
      concepto: "CSS · selector descendiente",
      texto: "Aquí hay dos listas: el menú de la cafetería y las normas del teatro. Solo quieres los " +
             "platos del **menú**.\n\n" +
             "Un **selector descendiente** une dos selectores con un espacio: `${ul li}` significa " +
             "«los `${li}` que estén dentro de un `${ul}`». Y si el padre tiene clase, puedes escribir " +
             "`${.menu li}`.\n\n" +
             "Enciende los **3 platos** del menú (no las normas).",
      escena: "<article class=\"guion\">\n  <h2>Menú</h2>\n  <ul class=\"menu\">\n    <li>Entradas</li>\n    <li>Plato principal</li>\n    <li>Postre</li>\n  </ul>\n  <h2>Normas</h2>\n  <ul class=\"normas\">\n    <li>No pisar el escenario</li>\n    <li>Apagar el móvil</li>\n  </ul>\n</article>",
      marcar: [".menu li"],
      plantilla: "",
      objetivos: [{ tipo: "selector", texto: "Tu selector enciende los 3 <li> del menú y ningún otro" }],
      pistas: [
        { t: "La idea", v: "Necesitas dos pasos: primero el contenedor del menú, y después sus elementos. Se separan con un espacio." },
        { t: "Cómo se escribe", v: "`.menu li` se lee «los li que están dentro de .menu». El espacio es la clave." },
        { t: "Casi lo tienes", v: "Une las dos piezas:", codigo: ".menu ____ li" }
      ],
      solucion: ".menu li",
      nota: "El espacio significa «dentro de». `.menu li` elige solo los `li` que están dentro de `.menu`, así que las normas de `.normas` se quedan apagadas. Es el selector que más se usa para dar estilo a menús y listas."
    },
    {
      id: 10, cap: "selector",
      titulo: "El primero y el último",
      concepto: "CSS · pseudoclases",
      texto: "Las **pseudoclases** eligen por posición: `${:first-child}` es el primer hijo, " +
             "`${:last-child}` el último.\n\n" +
             "Y con una **coma** puedes agrupar dos selectores en una sola regla: " +
             "`${a, b}` elige las dos cosas.\n\n" +
             "Enciende el **primer** y el **último** día del cartel, y solo esos dos.",
      escena: "<article class=\"guion\">\n  <h2>Cartel de la semana</h2>\n  <ul class=\"cartel\">\n    <li>Lunes: ensayo general</li>\n    <li>Martes: estreno</li>\n    <li>Miércoles: descanso</li>\n  </ul>\n</article>",
      marcar: [".cartel li:first-child", ".cartel li:last-child"],
      plantilla: "",
      objetivos: [{ tipo: "selector", texto: "Tu selector enciende el primer y el último día del cartel" }],
      pistas: [
        { t: "La idea", v: "Escribe dos selectores completos y sepáralos con una coma. Cada uno elige un día." },
        { t: "Cómo se escribe", v: "`.cartel li:first-child, .cartel li:last-child` — con coma y espacio entre los dos." },
        { t: "Casi lo tienes", v: "Falta el segundo selector:", codigo: ".cartel li:first-child, .cartel li:________" }
      ],
      solucion: ".cartel li:first-child,\n.cartel li:last-child",
      nota: "Las pseudoclases van pegadas al selector con dos puntos y eligen por su posición: `:first-child` el primero, `:last-child` el último. La coma agrupa varias reglas: el mismo estilo se aplica a los dos extremos."
    },

    /* ================= CAPÍTULO 3 · PROPIEDADES ================= */
    {
      id: 11, cap: "estilo",
      titulo: "Pintar la tarjeta",
      concepto: "CSS · color y fondo",
      texto: "Última parte: el **vestuario**. Aquí no eliges elementos (la regla ya está escrita) " +
             "sino que escribes **declaraciones**: `${propiedad: valor;}`.\n\n" +
             "Dos propiedades para empezar:\n" +
             "• `${color}` pinta el **texto**.\n" +
             "• `${background-color}` pinta el **fondo**.\n\n" +
             "Pinta el texto de `${#7a1f3d}` (granate) y el fondo de `${#fde7c9}` (dorado claro). No olvides el **punto y coma** al final.",
      escena: "<div class=\"tarjeta\">\n  <h3>Función de esta noche</h3>\n  <p>Teatro del Código · 20:00</p>\n</div>",
      caja: ".tarjeta",
      props: [
        { prop: "color", etiqueta: "Color del texto", valor: "#7a1f3d" },
        { prop: "background-color", etiqueta: "Color del fondo", valor: "#fde7c9" }
      ],
      plantilla: "color: ;\nbackground-color: ;\n",
      objetivos: [{ tipo: "estilo", texto: "Las dos propiedades coinciden con el modelo" }],
      pistas: [
        { t: "La idea", v: "Una declaración tiene tres partes: propiedad, dos puntos y valor. Se termina con punto y coma." },
        { t: "Cómo se escribe", v: "<code>color: #7a1f3d;</code> y en otra línea <code>background-color: #fde7c9;</code>. Los colores con # son códigos hexadecimales." },
        { t: "Casi lo tienes", v: "Faltan los valores:", codigo: "color: #______;\nbackground-color: #______;" }
      ],
      solucion: "color: #7a1f3d;\nbackground-color: #fde7c9;",
      nota: "`color` es el color de la letra y `background-color` el del fondo: son propiedades distintas y no se mezclan. Los valores como `#7a1f3d` son colores en hexadecimal: `#` + rojo, verde y azul en dos cifras cada uno."
    },
    {
      id: 12, cap: "estilo",
      titulo: "Letras grandes y centradas",
      concepto: "CSS · tipografía",
      texto: "Un cartel se lee mejor con letras grandes, en negrita y centradas.\n\n" +
             "• `${font-size}` es el tamaño de la letra (en píxeles: `${22px}`).\n" +
             "• `${font-weight}` es el grosor: `${700}` es negrita.\n" +
             "• `${text-align}` alinea el texto: `${center}` lo centra.\n\n" +
             "Aplica las tres con los valores indicados.",
      escena: "<div class=\"tarjeta\">\n  <h3>Función de esta noche</h3>\n  <p>Teatro del Código · 20:00</p>\n</div>",
      caja: ".tarjeta",
      props: [
        { prop: "font-size", etiqueta: "Tamaño de letra", valor: "22px" },
        { prop: "font-weight", etiqueta: "Grosor (negrita)", valor: "700" },
        { prop: "text-align", etiqueta: "Alineación", valor: "center" }
      ],
      plantilla: "font-size: ;\nfont-weight: ;\ntext-align: ;\n",
      objetivos: [{ tipo: "estilo", texto: "Las tres propiedades coinciden con el modelo" }],
      pistas: [
        { t: "La idea", v: "Tres declaraciones, una por línea. Cada una con su propiedad, sus dos puntos y su valor." },
        { t: "Cómo se escribe", v: "<code>font-size: 22px;</code>, <code>font-weight: 700;</code> y <code>text-align: center;</code>. El `px` va pegado al número y sin espacio." },
        { t: "Casi lo tienes", v: "Faltan los valores:", codigo: "font-size: ____px;\nfont-weight: ____;\ntext-align: ______;" }
      ],
      solucion: "font-size: 22px;\nfont-weight: 700;\ntext-align: center;",
      nota: "`font-size` fija el tamaño en píxeles, `font-weight` el grosor (400 normal, 700 negrita) y `text-align: center` centra el texto dentro de su caja. Fíjate en que el fondo no cambia: cada propiedad hace solo lo suyo."
    },
    {
      id: 13, cap: "estilo",
      titulo: "Aire y esquinas",
      concepto: "CSS · caja y borde",
      texto: "La tarjeta está apretada y con esquinas rectas. Vamos a darle aire y forma.\n\n" +
             "• `${padding}` es el espacio **por dentro**, entre el borde y el texto (aquí `${18px}`).\n" +
             "• `${border-radius}` redondea las esquinas (`${14px}`).\n" +
             "• `${border}` es el borde: grosor, estilo y color. Por ejemplo `${border: 2px solid #d9a13b;}` " +
             "(2 píxeles, línea continua, color dorado).",
      escena: "<div class=\"tarjeta\">\n  <h3>Función de esta noche</h3>\n  <p>Teatro del Código · 20:00</p>\n</div>",
      caja: ".tarjeta",
      props: [
        { prop: "padding", etiqueta: "Espacio interior 18px", valor: "18px" },
        { prop: "border-radius", etiqueta: "Esquinas redondeadas 14px", valor: "14px" },
        { prop: "border", etiqueta: "Borde 2px solid #d9a13b", valor: "2px solid #d9a13b" }
      ],
      plantilla: "padding: ;\nborder-radius: ;\nborder: ;\n",
      objetivos: [{ tipo: "estilo", texto: "Las tres propiedades coinciden con el modelo" }],
      pistas: [
        { t: "La idea", v: "`padding` empuja hacia dentro (separa el texto del borde) y `border-radius` curva las esquinas." },
        { t: "Cómo se escribe", v: "<code>padding: 18px;</code>, <code>border-radius: 14px;</code> y <code>border: 2px solid #d9a13b;</code>. En `border` el orden es grosor, estilo y color." },
        { t: "Casi lo tienes", v: "Falta la línea del borde:", codigo: "padding: ____px;\nborder-radius: ____px;\nborder: 2px ________ #d9a13b;" }
      ],
      solucion: "padding: 18px;\nborder-radius: 14px;\nborder: 2px solid #d9a13b;",
      nota: "`padding` es el relleno interior y `border` el marco por fuera; `border-radius` redondea ese marco. Mira cómo cambia el tamaño de la caja: el padding se **suma** al contenido, no lo tapa."
    },
    {
      id: 14, cap: "estilo",
      titulo: "El botón de la entrada",
      concepto: "CSS · repaso",
      texto: "Última misión: convertir un enlace normal en un botón, sin tocar el HTML.\n\n" +
             "• Un enlace sale subrayado y en minúsculas: quita el subrayado con `${text-decoration: none;}` " +
             "y ponlo en mayúsculas con `${text-transform: uppercase;}`.\n" +
             "• Fondo `${#6d2340}`, texto `${#fff8ef}` y un relleno cómodo: `${padding: 10px 18px;}` " +
             "(vertical 10, horizontal 18).\n" +
             "• Redondea un poco las esquinas: `${border-radius: 8px;}`.",
      escena: "<div class=\"tarjeta\">\n  <h3>Entradas</h3>\n  <p><a class=\"boton\" href=\"#\">Comprar entrada</a></p>\n</div>",
      caja: ".boton",
      props: [
        { prop: "text-decoration", etiqueta: "Sin subrayado", valor: "none" },
        { prop: "text-transform", etiqueta: "Mayúsculas", valor: "uppercase" },
        { prop: "background-color", etiqueta: "Fondo #6d2340", valor: "#6d2340" },
        { prop: "color", etiqueta: "Texto #fff8ef", valor: "#fff8ef" },
        { prop: "padding", etiqueta: "Relleno 10px / 18px", valor: "10px 18px" },
        { prop: "border-radius", etiqueta: "Esquinas 8px", valor: "8px" }
      ],
      plantilla: "text-decoration: ;\ntext-transform: ;\nbackground-color: ;\ncolor: ;\npadding: ;\nborder-radius: ;\n",
      objetivos: [{ tipo: "estilo", texto: "Las seis propiedades coinciden con el modelo" }],
      plantillaAyuda: true,
      pistas: [
        { t: "La idea", v: "Seis declaraciones seguidas. Cada propiedad quita o añade un detalle del botón." },
        { t: "Cómo se escribe", v: "<code>text-decoration: none;</code>, <code>text-transform: uppercase;</code>, <code>background-color: #6d2340;</code>, <code>color: #fff8ef;</code>, <code>padding: 10px 18px;</code>, <code>border-radius: 8px;</code>." },
        { t: "Casi lo tienes", v: "Faltan las tres últimas:", codigo: "text-decoration: none;\ntext-transform: uppercase;\nbackground-color: #______;\ncolor: #fff8ef;\npadding: ____ 18px;\nborder-radius: ____px;" }
      ],
      solucion: "text-decoration: none;\ntext-transform: uppercase;\nbackground-color: #6d2340;\ncolor: #fff8ef;\npadding: 10px 18px;\nborder-radius: 8px;",
      nota: "Un mismo elemento cambia de aspecto solo con CSS: el HTML sigue siendo un enlace normal y el CSS lo viste de botón. `padding` con dos valores es atajo: el primero arriba y abajo, el segundo a los lados. Con esto ya sabes lo básico para estilizar cualquier página."
    }
  ];

  /* ===================================================================
     Utilidades puras (probables en Node)
     =================================================================== */

  // "'p'" no tiene sentido aquí; sí: separa declaraciones por ; respetando
  // paréntesis y comillas (para url(...) y fuentes con comillas).
  function separarDeclaraciones(texto) {
    var trozos = [], actual = "", profundidad = 0, comilla = null;
    var s = String(texto || "");
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (comilla) {
        actual += c;
        if (c === comilla) comilla = null;
        continue;
      }
      if (c === '"' || c === "'") { comilla = c; actual += c; continue; }
      if (c === "(") { profundidad++; actual += c; continue; }
      if (c === ")") { profundidad--; actual += c; continue; }
      if (c === ";" && profundidad <= 0) { trozos.push(actual); actual = ""; continue; }
      actual += c;
    }
    if (actual.trim()) trozos.push(actual);
    return trozos.map(function (t) { return t.trim(); }).filter(Boolean);
  }

  function leerDeclaraciones(texto) {
    return separarDeclaraciones(texto).map(function (t) {
      var i = t.indexOf(":");
      if (i < 0) return { prop: t.toLowerCase(), valor: "", malFormada: true };
      return {
        prop: t.slice(0, i).trim().toLowerCase(),
        valor: t.slice(i + 1).trim(),
        malFormada: false
      };
    });
  }

  // Comprueba cuántos requisitos de tipo "html" exige el nivel
  function contarRequisitos(nivel) { return nivel.objetivos.length; }

  var MAPA_COMPUTADO = {
    "color": "color",
    "background-color": "backgroundColor",
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    "text-align": "textAlign",
    "border-radius": "borderTopLeftRadius",
    "text-transform": "textTransform",
    "text-decoration": "textDecorationLine",
    "padding": "padding",           // compuesto (arriba + izquierda)
    "border": "border"              // compuesto (grosor + estilo + color)
  };

  function normalizar(v) {
    return String(v == null ? "" : v).replace(/\s+/g, " ").trim().toLowerCase();
  }

  /**
   * Lee el valor "real" de una propiedad de un elemento, usando el estilo
   * calculado (y el estilo en línea como respaldo).
   */
  function leerPropiedad(el, prop, getCS) {
    var cs = getCS(el) || {};
    var clave = MAPA_COMPUTADO[prop] || prop;
    if (prop === "padding") {
      return normalizar((cs.paddingTop || "") + " " + (cs.paddingLeft || ""));
    }
    if (prop === "border") {
      return normalizar((cs.borderTopWidth || "") + " " + (cs.borderTopStyle || "") + " " + (cs.borderTopColor || ""));
    }
    var v = cs[clave];
    if (v === undefined || v === "") {
      try { v = el.style.getPropertyValue(prop); } catch (e) { v = ""; }
    }
    return normalizar(v);
  }

  function iguales(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    var ma = /^(-?[\d.]+)px$/.exec(a), mb = /^(-?[\d.]+)px$/.exec(b);
    if (ma && mb) return Math.abs(parseFloat(ma[1]) - parseFloat(mb[1])) <= 1;
    return false;
  }

  var JUEGO = {
    CAPITULOS: CAPITULOS,
    NIVELES: NIVELES,
    separarDeclaraciones: separarDeclaraciones,
    leerDeclaraciones: leerDeclaraciones,
    leerPropiedad: leerPropiedad,
    iguales: iguales,
    normalizar: normalizar,
    contarRequisitos: contarRequisitos
  };

  if (typeof module !== "undefined" && module.exports) { module.exports.JUEGO = JUEGO; }
  raiz.JUEGO = JUEGO;

  /* ===================================================================
     PARTE 2 · INTERFAZ
     =================================================================== */
  if (typeof document === "undefined") { return; }

  document.addEventListener("DOMContentLoaded", function () {
    var $ = function (id) { return document.getElementById(id); };
    var getCS = function (el) { return window.getComputedStyle(el); };

    var CLAVE = "teatro-progreso-v1";
    var progreso = cargar();

    var idx = Math.min(progreso.nivelActual || 0, NIVELES.length - 1);
    var nivel = NIVELES[idx];
    var pistasMostradas = 0;
    var celebrado = false;
    var temporizador = null;
    var referencia = null;      // valores del modelo (cap. estilo)
    var marcasFocos = [];       // elementos objetivo (cap. selector)

    var elEditor = $("editor"), elGutter = $("gutter"), elConsola = $("consola");
    var elVisual = $("escenaVisual"), elVacia = $("escenaVacia"), elNota = $("escenaNota");
    var elListaObj = $("listaObjetivos"), elContador = $("contadorObj");
    var elProgreso = $("progreso"), elPistas = $("pistasLista"), elPistasUsadas = $("pistasUsadas");

    /* ---------------- progreso ---------------- */
    function cargar() {
      try {
        var d = JSON.parse(localStorage.getItem(CLAVE) || "{}");
        return {
          nivelActual: d.nivelActual || 0,
          nivelMax: d.nivelMax || 0,
          estrellas: d.estrellas || {},
          completados: d.completados || {},
          codigo: d.codigo || {}
        };
      } catch (e) {
        return { nivelActual: 0, nivelMax: 0, estrellas: {}, completados: {}, codigo: {} };
      }
    }
    function guardar() {
      try { localStorage.setItem(CLAVE, JSON.stringify(progreso)); } catch (e) {}
    }

    /* ---------------- formateo de textos ---------------- */
    function escapar(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // `${...}` → <code>, `...` → <code>  (respetando llaves anidadas)
    function formatear(txt) {
      var s = String(txt)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, function (m, d) { return "<code>" + escapar(d) + "</code>"; });
      var out = "", i = 0;
      while (i < s.length) {
        var ini = s.indexOf("${", i);
        if (ini === -1) { out += s.slice(i); break; }
        out += s.slice(i, ini);
        var nivelLlaves = 0, j = ini + 1, cerrado = false;
        for (; j < s.length; j++) {
          var c = s.charAt(j);
          if (c === "{") { nivelLlaves++; }
          else if (c === "}") {
            nivelLlaves--;
            if (nivelLlaves === 0) { j++; cerrado = true; break; }
          }
        }
        out += "<code>" + escapar(s.slice(ini + 2, cerrado ? j - 1 : s.length)) + "</code>";
        i = j;
      }
      return out.replace(/\n\n/g, "<br><br>");
    }

    /* ---------------- avisos ---------------- */
    function limpiarConsola() {
      elConsola.innerHTML = '<p class="consola-vacia">Aquí verás avisos y errores.</p>';
    }
    function aviso(texto, clase) {
      var vacio = elConsola.querySelector(".consola-vacia");
      if (vacio) vacio.remove();
      var el = document.createElement("p");
      el.className = clase || "info";
      el.innerHTML = texto;
      elConsola.appendChild(el);
      elConsola.scrollTop = elConsola.scrollHeight;
    }

    /* ---------------- escena ---------------- */
    function pintarEscena() {
      limpiarConsola();
      referencia = null;
      marcasFocos = [];

      if (nivel.cap === "selector") {
        elVisual.innerHTML = nivel.escena;
        (nivel.marcar || []).forEach(function (sel) {
          Array.prototype.forEach.call(elVisual.querySelectorAll(sel), function (n) {
            n.setAttribute("data-foco", "");
            marcasFocos.push(n);
          });
        });
        elVacia.hidden = true;
        pintarFocos();
        return;
      }

      if (nivel.cap === "estilo") {
        elVisual.innerHTML = nivel.escena;
        elVacia.hidden = true;
        return;
      }

      // capítulo HTML: se pinta lo que escribe el jugador
      aplicarHtml();
    }

    var etiquetasPeligrosas = /<\s*(script|style|link|iframe|object|meta)[\s\S]*?(<\/\s*\1\s*>|$)/gi;
    function htmlSeguro(txt) {
      var limpio = String(txt || "").replace(etiquetasPeligrosas, "");
      if (limpio !== String(txt || "")) {
        aviso("En este capítulo solo usamos etiquetas HTML: he ignorado &lt;script&gt;, &lt;style&gt; y similares.", "warn");
      }
      return limpio;
    }

    function aplicarHtml() {
      var codigo = elEditor.value;
      elVisual.innerHTML = htmlSeguro(codigo);
      var tieneAlgo = elVisual.textContent.trim().length > 0 || elVisual.querySelector("img, input");
      elVacia.hidden = !!tieneAlgo;
    }

    function pintarFocos() {
      var sel = elEditor.value.trim();
      Array.prototype.forEach.call(elVisual.querySelectorAll("*"), function (n) {
        n.style.outline = "";
      });
      if (!sel) { elNota.textContent = ""; return; }

      var elegidos;
      try {
        elegidos = elVisual.querySelectorAll(sel);
      } catch (e) {
        elNota.innerHTML = "Ese selector no es válido todavía: revisa puntos, almohadillas y comas.";
        return;
      }

      Array.prototype.forEach.call(elegidos, function (n) {
        n.style.outline = n.hasAttribute("data-foco")
          ? "3px solid #2f9e63"
          : "3px solid #d94f8a";
        n.style.outlineOffset = "2px";
        n.style.borderRadius = "4px";
      });

      if (!elegidos.length) {
        elNota.innerHTML = "Tu selector no enciende nada todavía.";
      } else {
        elNota.innerHTML = "Tu selector enciende <strong>" + elegidos.length + "</strong> elemento(s) · " +
          "deben ser <strong>" + marcasFocos.length + "</strong>. " +
          "<span class='clave-ok'>Verde</span> = correcto · <span class='clave-mal'>Rosa</span> = sobra.";
      }
    }

    /* ---------------- capítulo estilo ---------------- */
    function aplicarDeclaraciones(el, texto) {
      el.removeAttribute("style");
      var decls = leerDeclaraciones(texto);
      var invalidas = [], aplicadas = [];
      decls.forEach(function (d) {
        if (d.malFormada || !d.valor) { return; }
        var antes = el.style.length;
        try { el.style.setProperty(d.prop, d.valor); } catch (e) { invalidas.push(d.prop); return; }
        var despues = el.style.getPropertyValue(d.prop);
        if (!despues && el.style.length <= antes) { invalidas.push(d.prop); }
        else { aplicadas.push(d.prop); }
      });
      return { aplicadas: aplicadas, invalidas: invalidas };
    }

    function pintarModelo() {
      if (nivel.cap !== "estilo") { $("modeloCaja").hidden = true; return; }
      $("modeloCaja").hidden = false;
      var caja = $("modeloEscena");
      caja.innerHTML = nivel.escena;
      var el = caja.querySelector(nivel.caja);
      if (!el) return;
      aplicarDeclaraciones(el, nivel.solucion);
      referencia = {};
      nivel.props.forEach(function (p) {
        referencia[p.prop] = leerPropiedad(el, p.prop, getCS);
      });
    }

    /* ---------------- evaluación ---------------- */
    function cumpleRequisito(req, root) {
      var nodos;
      switch (req.tipo) {
        case "existe":
          return root.querySelectorAll(req.sel).length > 0;
        case "cuenta":
          return root.querySelectorAll(req.sel).length >= (req.min || 1);
        case "textoMin":
          nodos = root.querySelectorAll(req.sel);
          return nodos.length > 0 && (nodos[0].textContent || "").trim().length >= (req.min || 1);
        case "atributo":
          nodos = root.querySelectorAll(req.sel);
          if (!nodos.length) return false;
          for (var i = 0; i < nodos.length; i++) {
            if (!(nodos[i].getAttribute(req.attr) || "").trim()) return false;
          }
          return true;
        case "atributoIncluye":
          nodos = root.querySelectorAll(req.sel);
          for (var j = 0; j < nodos.length; j++) {
            if ((nodos[j].getAttribute(req.attr) || "").toLowerCase().indexOf(req.incluye) !== -1) return true;
          }
          return false;
      }
      return false;
    }

    function selectorAcierta(sel) {
      if (!sel) return false;
      var elegidos;
      try { elegidos = elVisual.querySelectorAll(sel); } catch (e) { return false; }
      var objetivo = elVisual.querySelectorAll("[data-foco]");
      if (!objetivo.length || !elegidos.length) return false;
      if (elegidos.length !== objetivo.length) return false;
      for (var i = 0; i < objetivo.length; i++) {
        if (Array.prototype.indexOf.call(elegidos, objetivo[i]) === -1) return false;
      }
      return true;
    }

    /** Devuelve {estados:[bool], todos:bool} */
    function evaluar() {
      var estados = [], codigo = elEditor.value;

      if (nivel.cap === "estilo") {
        var el = elVisual.querySelector(nivel.caja);
        if (!el || !referencia) return { estados: nivel.props.map(function () { return false; }), todos: false };
        var info = aplicarDeclaraciones(el, codigo);
        info.invalidas.forEach(function (p) {
          aviso("⚠️ <code>" + escapar(p) + "</code> no es una propiedad CSS válida (o el valor no es correcto).", "warn");
        });
        nivel.props.forEach(function (p) {
          var actual = leerPropiedad(el, p.prop, getCS);
          estados.push(iguales(actual, referencia[p.prop]));
        });
        return { estados: estados, todos: estados.every(Boolean) };
      }

      if (nivel.cap === "selector") {
        pintarFocos();
        var ok = selectorAcierta(codigo.trim());
        if (!codigo.trim()) elNota.textContent = "";
        return { estados: [ok], todos: ok };
      }

      aplicarHtml();
      nivel.objetivos.forEach(function (r) {
        estados.push(cumpleRequisito(r, elVisual));
      });
      return { estados: estados, todos: estados.every(Boolean) };
    }

    function refrescar(manual, silencioso) {
      var r = evaluar();
      pintarListaObjetivos(r.estados);
      if (r.todos && !celebrado && !silencioso) { celebrar(); }
      else if (manual && !r.todos) {
        var faltan = r.estados.filter(function (e) { return !e; }).length;
        aviso("Todavía falta" + (faltan > 1 ? "n " + faltan + " objetivos" : " 1 objetivo") +
              ". Mira la lista de objetivos y usa una pista si te atascas 💡", "info");
      }
      return r;
    }

    /* ---------------- lista de objetivos ---------------- */
    function pintarListaObjetivos(estados) {
      var items = elListaObj.querySelectorAll("li");
      var hechos = 0;
      Array.prototype.forEach.call(items, function (li, i) {
        var ok = !!estados[i];
        if (ok) hechos++;
        li.classList.toggle("listo", ok);
        var m = li.querySelector(".marca-ok");
        if (m) m.textContent = ok ? "✓" : "";
      });
      elContador.textContent = hechos + " / " + items.length;
    }

    function construirObjetivos() {
      elListaObj.innerHTML = "";
      var textos = nivel.objetivos.map(function (o) { return o.texto; });
      if (nivel.cap === "estilo") {
        textos = nivel.props.map(function (p) {
          var muestra = "";
          if (/^#/.test(p.valor)) {
            muestra = '<span class="chip" style="background:' + p.valor + '"></span>';
          }
          return p.etiqueta + ' <code class="valor">' + muestra + p.valor + "</code>";
        });
      }
      textos.forEach(function (t) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="marca-ok"></span><span>' + t + "</span>";
        elListaObj.appendChild(li);
      });
      elContador.textContent = "0 / " + textos.length;
    }

    /* ---------------- nivel ---------------- */
    function pintarNivel() {
      nivel = NIVELES[idx];
      var cap = CAPITULOS[nivel.cap];

      $("nivelNum").textContent = "Nivel " + (idx + 1) + " de " + NIVELES.length +
        " · " + cap.icono + " " + cap.nombre;
      $("misionTitulo").textContent = nivel.titulo;
      $("misionConcepto").textContent = nivel.concepto;
      $("misionTexto").innerHTML = formatear(nivel.texto);
      $("archivoNombre").textContent = cap.archivo;
      $("editorPanel").setAttribute("data-cap", nivel.cap);

      var esEstilo = nivel.cap === "estilo";
      $("envoltorioArriba").hidden = !esEstilo;
      $("envoltorioAbajo").hidden = !esEstilo;
      if (esEstilo) { $("envoltorioArriba").textContent = nivel.caja + " {"; }

      $("btnVerCodigo").hidden = nivel.cap !== "selector";
      $("codigoEscena").hidden = true;
      $("btnVerCodigo").textContent = "Ver HTML";
      $("atajoTexto").textContent = nivel.cap === "selector"
        ? "escribe solo el selector · Ctrl + Enter"
        : "se comprueba solo · Ctrl + Enter";

      pistasMostradas = 0;
      celebrado = false;
      elPistas.innerHTML = "";
      elPistasUsadas.textContent = "0 / " + nivel.pistas.length;
      $("btnPista").disabled = false;
      $("btnPista").textContent = "Dame una pista";

      construirObjetivos();
      pintarEscena();
      pintarModelo();

      elEditor.placeholder = nivel.cap === "selector"
        ? "Escribe aquí el selector…  por ejemplo:  p"
        : (nivel.cap === "estilo" ? "Escribe aquí las declaraciones…  por ejemplo:  color: red;" : "");
      elEditor.value = (progreso.codigo[nivel.id] !== undefined)
        ? progreso.codigo[nivel.id]
        : (nivel.plantilla || "");
      actualizarGutter();
      elNota.textContent = "";
      pintarProgreso();
      refrescar(false, true);
    }

    function irANivel(i) {
      idx = Math.max(0, Math.min(i, NIVELES.length - 1));
      progreso.nivelActual = idx;
      guardar();
      pintarNivel();
      elEditor.focus();
    }

    /* ---------------- progreso visual ---------------- */
    function pintarProgreso() {
      elProgreso.innerHTML = "";
      NIVELES.forEach(function (n, i) {
        var b = document.createElement("button");
        b.textContent = i + 1;
        var hecho = !!progreso.completados[n.id];
        var desbloqueado = i <= (progreso.nivelMax || 0);
        if (i === idx) b.classList.add("actual");
        else if (hecho) b.classList.add("hecho");
        else if (!desbloqueado) b.classList.add("bloqueado");
        b.title = "Nivel " + (i + 1) + ": " + n.titulo;
        b.setAttribute("aria-label", b.title);
        b.addEventListener("click", function () {
          if (!desbloqueado && !hecho) { aviso("Para abrir este nivel, supera antes los anteriores 🙂"); return; }
          irANivel(i);
        });
        elProgreso.appendChild(b);
      });
    }

    /* ---------------- pistas ---------------- */
    $("btnPista").addEventListener("click", function () {
      if (pistasMostradas >= nivel.pistas.length) return;
      var p = nivel.pistas[pistasMostradas];
      var div = document.createElement("div");
      div.className = "pista";
      var html = "<strong>" + (pistasMostradas + 1) + ". " + p.t + "</strong>" + formatear(p.v);
      if (p.codigo) html += "<pre>" + escapar(p.codigo) + "</pre>";
      div.innerHTML = html;
      elPistas.appendChild(div);
      pistasMostradas++;
      elPistasUsadas.textContent = pistasMostradas + " / " + nivel.pistas.length;
      if (pistasMostradas >= nivel.pistas.length) {
        $("btnPista").disabled = true;
        $("btnPista").textContent = "No hay más pistas 🙂";
      }
    });

    /* ---------------- editor ---------------- */
    function actualizarGutter() {
      var n = elEditor.value.split("\n").length;
      var html = "";
      for (var i = 1; i <= Math.max(n, 1); i++) { html += "<span>" + i + "</span>"; }
      elGutter.innerHTML = html;
      elGutter.scrollTop = elEditor.scrollTop;
    }

    elEditor.addEventListener("input", function () {
      actualizarGutter();
      progreso.codigo[nivel.id] = elEditor.value;
      guardar();
      if (nivel.cap === "selector") {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () { refrescar(false); }, 140);
      } else {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () { refrescar(false); }, 260);
      }
    });
    elEditor.addEventListener("scroll", function () { elGutter.scrollTop = elEditor.scrollTop; });
    elEditor.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var s = elEditor.selectionStart, t = elEditor.selectionEnd;
        elEditor.value = elEditor.value.slice(0, s) + "  " + elEditor.value.slice(t);
        elEditor.selectionStart = elEditor.selectionEnd = s + 2;
        actualizarGutter();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        refrescar(true);
      }
    });

    $("btnComprobar").addEventListener("click", function () { refrescar(true); });
    $("btnEjecutar").addEventListener("click", function () { refrescar(true); });

    /* ---------------- ver el HTML de la escena ---------------- */
    $("btnVerCodigo").addEventListener("click", function () {
      var caja = $("codigoEscena");
      if (!caja.hidden) {
        caja.hidden = true;
        $("btnVerCodigo").textContent = "Ver HTML";
        return;
      }
      caja.hidden = false;
      $("btnVerCodigo").textContent = "Ocultar HTML";
      caja.innerHTML = "<pre>" + escapar(limpiarMarcas(nivel.escena)) + "</pre>";
    });

    function limpiarMarcas(html) {
      return String(html).replace(/\s*data-foco=""/g, "");
    }

    /* ---------------- éxito ---------------- */
    function celebrar() {
      celebrado = true;
      var estrellas = pistasMostradas === 0 ? 3 : (pistasMostradas >= 3 ? 1 : 2);
      progreso.estrellas[nivel.id] = Math.max(progreso.estrellas[nivel.id] || 0, estrellas);
      progreso.completados[nivel.id] = true;
      progreso.nivelMax = Math.max(progreso.nivelMax || 0, Math.min(idx + 1, NIVELES.length - 1));
      guardar();
      pintarProgreso();

      var txt = "";
      for (var i = 0; i < 3; i++) { txt += i < estrellas ? "⭐" : "☆"; }
      $("estrellasModal").textContent = txt;

      var ultimo = idx === NIVELES.length - 1;
      $("exitoTitulo").textContent = ultimo ? "¡Obra terminada! 🏆" : "¡Nivel superado!";
      $("exitoTexto").textContent = ultimo
        ? "Ya sabes escribir etiquetas HTML, elegir elementos con selectores y darles estilo con propiedades CSS. El telón baja… ¡pero puedes volver a cualquier nivel!"
        : (estrellas === 3
            ? "Sin pistas y a la primera. ¡Como una profesional!"
            : "¡Bien! Repite el nivel sin pistas si quieres las 3 estrellas.");
      $("btnSiguiente").style.display = ultimo ? "none" : "inline-block";

      confeti();
      $("modalExito").classList.add("abierto");
    }

    function confeti() {
      var caja = $("confeti");
      caja.innerHTML = "";
      var colores = ["#e0a83c", "#d94f8a", "#7c3aed", "#2f9e63", "#c2410c"];
      for (var i = 0; i < 24; i++) {
        var p = document.createElement("span");
        p.className = "confeti-pieza";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = colores[i % colores.length];
        p.style.animationDelay = (Math.random() * 0.5) + "s";
        caja.appendChild(p);
      }
    }

    $("btnSiguiente").addEventListener("click", function () {
      $("modalExito").classList.remove("abierto");
      irANivel(idx + 1);
    });
    $("btnRepetir").addEventListener("click", function () {
      $("modalExito").classList.remove("abierto");
    });

    /* ---------------- solución ---------------- */
    $("btnSolucion").addEventListener("click", function () {
      $("solucionCodigo").textContent = nivel.solucion;
      $("solucionNota").innerHTML = formatear(nivel.nota);
      $("modalSolucion").classList.add("abierto");
    });
    $("btnCopiarSolucion").addEventListener("click", function () {
      elEditor.value = nivel.solucion;
      actualizarGutter();
      progreso.codigo[nivel.id] = nivel.solucion;
      guardar();
      $("modalSolucion").classList.remove("abierto");
      refrescar(false);
    });
    ["btnCerrarSolucion", "btnCerrarSolucion2"].forEach(function (id) {
      $(id).addEventListener("click", function () { $("modalSolucion").classList.remove("abierto"); });
    });

    /* ---------------- chuleta ---------------- */
    var CHULETA = {
      html: [
        ["Título", "<h1>Título grande</h1>", "h1 es el más grande; h2, h3… van bajando."],
        ["Párrafo", "<p>Un texto cualquiera</p>", "Cada p es un bloque de texto."],
        ["Lista", "<ul>\n  <li>Uno</li>\n  <li>Dos</li>\n</ul>", "ul = la lista, li = cada elemento."],
        ["Imagen", '<img src="foto.jpg" alt="descripción">', "No lleva cierre. alt = texto alternativo."],
        ["Enlace", '<a href="https://web.com">Ir</a>', "href = a dónde lleva el clic."]
      ],
      selector: [
        ["Etiqueta", "p", "Todos los párrafos."],
        ["Clase", ".actor", "Elementos con class=\"actor\"."],
        ["Id", "#protagonista", "El único con ese id."],
        ["Descendiente", ".menu li", "Los li de dentro de .menu (el espacio = dentro)."],
        ["Hijos", ".menu > li", "Solo los hijos directos."],
        ["Posición", "li:first-child  ·  li:last-child  ·  li:nth-child(2)", "El primero, el último, el segundo."],
        ["Varios a la vez", "h2, p", "La coma agrupa selectores."]
      ],
      estilo: [
        ["Texto", "color: #3b2233;", "Color de la letra."],
        ["Fondo", "background-color: #fde7c9;", "Color detrás del contenido."],
        ["Letra", "font-size: 22px;  ·  font-weight: 700;", "Tamaño y grosor (700 = negrita)."],
        ["Alinear", "text-align: center;", "left, center o right."],
        ["Relleno", "padding: 18px;", "Espacio por dentro (acepta 2 valores: vertical horizontal)."],
        ["Borde", "border: 2px solid #d9a13b;", "Grosor, estilo y color."],
        ["Esquinas", "border-radius: 14px;", "Redondea las esquinas."],
        ["Detalles", "text-decoration: none;  ·  text-transform: uppercase;", "Quita el subrayado y pone MAYÚSCULAS."]
      ]
    };

    $("btnChuleta").addEventListener("click", function () {
      var cap = nivel.cap;
      var filas = CHULETA[cap].map(function (f) {
        return "<tr><td>" + f[0] + "</td><td><code>" + escapar(f[1]) + "</code></td><td>" + f[2] + "</td></tr>";
      }).join("");
      $("chuletaTitulo").textContent = "📖 Chuleta · " + CAPITULOS[cap].icono + " " + CAPITULOS[cap].nombre;
      $("chuletaContenido").innerHTML =
        '<p class="chuleta-intro">Lo que necesitas en este capítulo. Son atajos, no hace falta memorizar nada.</p>' +
        '<table class="tabla-chuleta"><tr><th>Para</th><th>Se escribe</th><th>Sirve para</th></tr>' + filas + "</table>";
      $("modalChuleta").classList.add("abierto");
    });
    $("btnCerrarChuleta").addEventListener("click", function () {
      $("modalChuleta").classList.remove("abierto");
    });

    /* ---------------- ayuda ---------------- */
    $("btnAyuda").addEventListener("click", function () { $("modalAyuda").classList.add("abierto"); });
    ["btnCerrarAyuda", "btnCerrarAyuda2"].forEach(function (id) {
      $(id).addEventListener("click", function () { $("modalAyuda").classList.remove("abierto"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        Array.prototype.forEach.call(document.querySelectorAll(".modal.abierto"), function (m) {
          m.classList.remove("abierto");
        });
      }
    });

    /* ---------------- arranque ---------------- */
    pintarNivel();
  });

})(typeof window !== "undefined" ? window : globalThis);
