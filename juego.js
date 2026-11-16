/* =====================================================================
   De Cero a Código — Robi el robot jardinero
   ---------------------------------------------------------------------
   Parte 1: NÚCLEO (sin DOM) → niveles, simulador y ejecutor de código.
            Se puede probar en Node:  require('./juego.js').JUEGO
   Parte 2: INTERFAZ (DOM) → se activa solo si existe `document`.
   ===================================================================== */
(function (raiz) {
  "use strict";

  /* ===================================================================
     PARTE 1 · NÚCLEO
     =================================================================== */

  var DIRECCIONES = {
    este:  { dx: 1,  dy: 0  },
    sur:   { dx: 0,  dy: 1  },
    oeste: { dx: -1, dy: 0  },
    norte: { dx: 0,  dy: -1 }
  };
  var GIRO_DERECHA = { este: "sur", sur: "oeste", oeste: "norte", norte: "este" };
  var GIRO_IZQUIERDA = { este: "norte", norte: "oeste", oeste: "sur", sur: "este" };
  var MAX_ACCIONES = 600;

  /* -------------------------------------------------------------------
     Los 9 niveles.
     Mapa:  R/>/v/</^ = Robi (y hacia dónde mira)   * = casilla marcada
            # = roca   .  = suelo
     ------------------------------------------------------------------- */
  var NIVELES = [
    {
      id: 1,
      titulo: "Tu primer código",
      concepto: "Funciones y orden",
      texto: "¡Hola! Soy Robi, el robot jardinero. Hoy empiezo de cero y necesito tu ayuda: " +
             "hay 2 casillas marcadas con un círculo y quiero plantar una flor en cada una.\n\n" +
             "El código se lee de arriba abajo, como una receta. Cada orden se llama " +
             "«función» y lleva paréntesis: `${avanzar()}`, `${plantar()}`. Termina cada orden con punto y coma.",
      mapa: [
        ".........",
        "R**......",
        "........."
      ],
      objetivosTexto: ["Llegar a la casilla 1 y plantar 🎯", "Llegar a la casilla 2 y plantar 🎯"],
      pistas: [
        { t: "La idea", v: "Una orden por línea, en orden: primero caminar, luego plantar, y otra vez." },
        { t: "Los comandos", v: "Usa <code>avanzar()</code> para moverte una casilla y <code>plantar()</code> para dejar una flor donde estás. Ojo: los paréntesis son obligatorios." },
        { t: "Casi lo tienes", v: "Cuatro líneas. Rellena los huecos:", codigo: "____();\nplantar();\n____();\nplantar();" }
      ],
      solucion: "avanzar();\nplantar();\n// Robi ya está en la segunda casilla, solo le falta la flor:\navanzar();\nplantar();",
      nota: "Cada línea es una orden y el robot las obedece en orden. `avanzar()` mueve una casilla y `plantar()` deja una flor en la casilla donde está Robi: por eso van alternadas."
    },
    {
      id: 2,
      titulo: "El bucle que repite",
      concepto: "Bucle for",
      texto: "Ahora hay 4 casillas marcadas. Podrías escribir 8 líneas… pero existe una forma " +
             "mucho mejor: el bucle `${for}` repite lo mismo sin copiar y pegar.\n\n" +
             "`${for (let i = 0; i < 4; i++) { … }}` significa: «repite 4 veces lo que hay dentro de las llaves».",
      mapa: [
        "..........",
        "R****.....",
        ".........."
      ],
      objetivosTexto: ["Plantar 4 flores siguiendo la fila"],
      pistas: [
        { t: "La idea", v: "Lo que repites (avanzar y plantar) va DENTRO de las llaves del `for`." },
        { t: "Cómo se escribe", v: "Estructura: <code>for (let i = 0; i &lt; 4; i++) { ... }</code>. La `i` es un contador: empieza en 0 y sube de uno en uno hasta llegar a 4." },
        { t: "Casi lo tienes", v: "Solo falta el cuerpo del bucle:", codigo: "for (let i = 0; i < 4; i++) {\n  avanzar();\n  ______();\n}" }
      ],
      solucion: "for (let i = 0; i < 4; i++) {\n  avanzar();\n  plantar();\n}",
      nota: "El bucle repite el cuerpo 4 veces: i vale 0, 1, 2 y 3. En cada vuelta Robi avanza y planta, hasta cubrir las 4 casillas. ¡4 líneas en vez de 8!"
    },
    {
      id: 3,
      titulo: "Una caja llamada variable",
      concepto: "Variables",
      texto: "Ahora son 5 flores. Y aquí llega una idea potentísima: guardar el número en una " +
             "**variable**, una caja con nombre.\n\n" +
             "`${let cantidad = 5;}` crea la caja. Después puedes usar `cantidad` en lugar del número. " +
             "Si fueran 40 flores, solo cambiarías ese 5.",
      mapa: [
        "..#..#..#..",
        "R*****.....",
        "..#..#..#.."
      ],
      objetivosTexto: ["Plantar 5 flores", "Usar una variable para la cantidad"],
      pistas: [
        { t: "La idea", v: "Crea la variable arriba y usa su nombre dentro del `for`." },
        { t: "Cómo se escribe", v: "Primero <code>let cantidad = 5;</code>. Después, en el bucle, escribe <code>i &lt; cantidad</code> en lugar de <code>i &lt; 4</code>." },
        { t: "Casi lo tienes", v: "Dos piezas, ¿las unes?", codigo: "let cantidad = ___;\n\nfor (let i = 0; i < ________; i++) {\n  avanzar();\n  plantar();\n}" }
      ],
      solucion: "let cantidad = 5;\n\nfor (let i = 0; i < cantidad; i++) {\n  avanzar();\n  plantar();\n}",
      nota: "`cantidad` es una variable: una caja con un número dentro. El bucle la consulta en cada vuelta (`i < cantidad`). Si mañana son 40 flores, cambias un solo número y el código sigue funcionando."
    },
    {
      id: 4,
      titulo: "Aprender a girar",
      concepto: "Girar y caminar",
      texto: "Las flores ahora bajan por una columna. Robi solo sabe caminar hacia delante, " +
             "así que hay que girarlo.\n\n" +
             "`${girarDerecha()}` y `${girarIzquierda()}` lo giran sin moverlo de casilla. " +
             "Ojo con el detalle: Robi empieza mirando a la **derecha** de la pantalla, así que un giro a la derecha lo deja mirando hacia **abajo**.",
      mapa: [
        ".........",
        "R*.......",
        ".*.......",
        ".*.......",
        "........."
      ],
      objetivosTexto: ["Plantar las 3 flores de la columna", "Usar un giro para no salir de la fila"],
      pistas: [
        { t: "La idea", v: "Avanza, planta, gira para mirar hacia abajo y sigue avanzando." },
        { t: "Cómo se escribe", v: "Después de plantar la primera flor escribe <code>girarDerecha();</code>. Desde ahí, <code>avanzar()</code> ya baja en vez de ir a la derecha." },
        { t: "Casi lo tienes", v: "Faltan dos líneas al final:", codigo: "avanzar();\nplantar();\ngirarDerecha();\n\n// ahora hacia abajo:\n_____();\nplantar();\n_____();\nplantar();" }
      ],
      solucion: "avanzar();\nplantar();\n\ngirarDerecha(); // ahora mira hacia abajo\n\navanzar();\nplantar();\navanzar();\nplantar();",
      nota: "Girar no cambia de casilla, solo hacia dónde mira Robi. Después del giro, `avanzar()` va en la nueva dirección. Y fíjate: `avanzar(); plantar();` se repite, así que también podrías envolverlo en un `for`."
    },
    {
      id: 5,
      titulo: "Decidir con if",
      concepto: "Condicional if",
      texto: "En esta fila solo algunas casillas necesitan flor. Si plantas en todas, sobrarán flores " +
             "y el jardín se quejará 🥀.\n\n" +
             "`${if (faltaFlor()) { … }}` significa: «**si** esta casilla necesita flor, haz esto». " +
             "`faltaFlor()` es una pregunta que Robi responde con sí o no… y `if` solo ejecuta lo de dentro cuando la respuesta es sí.",
      mapa: [
        "...........",
        "R*.*.*.....",
        "..........."
      ],
      objetivosTexto: ["Plantar en las 3 casillas marcadas", "No plantar ninguna flor extra"],
      pistas: [
        { t: "La idea", v: "Camina siempre, pero planta SOLO cuando la casilla lo pida. Para eso sirve `if`." },
        { t: "Cómo se escribe", v: "Dentro del bucle: <code>if (faltaFlor()) { plantar(); }</code>. La pregunta va entre paréntesis y la acción entre llaves." },
        { t: "Casi lo tienes", v: "El bucle completo, con un hueco:", codigo: "for (let i = 0; i < 5; i++) {\n  avanzar();\n  if (__________()) {\n    plantar();\n  }\n}" }
      ],
      solucion: "for (let i = 0; i < 5; i++) {\n  avanzar();\n\n  if (faltaFlor()) {\n    plantar();\n  }\n}",
      nota: "`if` es una pregunta: si la condición es cierta, entra en las llaves; si no, las salta. Aquí la condición es `faltaFlor()`, que solo es cierta en las casillas marcadas. Así el mismo código sirve para cualquier fila."
    },
    {
      id: 6,
      titulo: "Tu propia función",
      concepto: "Funciones propias",
      texto: "Ahora hay dos filas. El mismo trabajo, dos veces: el momento perfecto para crear " +
             "una **función propia** y reutilizarla.\n\n" +
             "`${function fila() { … }}` guarda un bloque de órdenes con un nombre. Después la llamas " +
             "escribiendo `${fila();}`. Como girar no cuesta pasos, la segunda fila se resuelve con el mismo truco.",
      mapa: [
        ".........",
        "R***.....",
        "***......",
        "........."
      ],
      objetivosTexto: ["Crear una función llamada fila()", "Plantar las 6 flores"],
      pistas: [
        { t: "La idea", v: "Escribe la función UNA vez y llámala DOS veces: una por cada fila." },
        { t: "Cómo se escribe", v: "Dentro de la función: <code>for (let i = 0; i &lt; 3; i++) { avanzar(); plantar(); }</code>. Luego: <code>fila();</code>, gira a la derecha, baja una casilla, vuelve a girar a la derecha y llama <code>fila();</code> otra vez." },
        { t: "Casi lo tienes", v: "Solo falta el viaje entre las dos filas:", codigo: "function fila() {\n  for (let i = 0; i < 3; i++) {\n    avanzar();\n    plantar();\n  }\n}\n\nfila();\ngirarDerecha();\n_____();          // baja a la segunda fila\ngirarDerecha();   // ahora mira al otro lado\nfila();" }
      ],
      solucion: "function fila() {\n  for (let i = 0; i < 3; i++) {\n    avanzar();\n    plantar();\n  }\n}\n\nfila();           // primera fila, termina mirando a la derecha\n\ngirarDerecha();   // hacia abajo\navanzar();        // baja una casilla\ngirarDerecha();   // ahora mira hacia el otro lado\n\nfila();           // segunda fila, de vuelta",
      nota: "Una función es un bloque con nombre: se escribe una vez y se usa las veces que quieras. Como `fila()` avanza 3 casillas, la segunda vez hay que girar a Robi 180° (dos giros a la derecha) para que vuelva sobre sus pasos."
    },
    {
      id: 7,
      titulo: "Bucles dentro de bucles",
      concepto: "Bucles anidados",
      texto: "Un cuadrado de 3×3 flores. Aquí aparece el truco más divertido: poner un bucle " +
             "**dentro** de otro bucle.\n\n" +
             "El de dentro recorre una fila; el de fuera repite esa fila. Solo hay que devolver a Robi " +
             "al principio de la fila antes de empezar la siguiente.",
      mapa: [
        ".......",
        "R***...",
        ".***...",
        ".***...",
        "......."
      ],
      objetivosTexto: ["Plantar las 9 flores", "Usar un bucle dentro de otro"],
      pistas: [
        { t: "La idea", v: "Un `for` que se repite 3 veces (las filas) y, dentro, otro `for` de 3 pasos (las flores de cada fila)." },
        { t: "Volver atrás", v: "Al terminar cada fila, Robi está en el extremo. Para volver: <code>girarDerecha(); girarDerecha();</code> (media vuelta) y avanzar 3 veces. Después giras y bajas a la fila siguiente." },
        { t: "Casi lo tienes", v: "El esqueleto, con dos huecos:", codigo: "for (let fila = 0; fila < 3; fila++) {\n\n  for (let c = 0; c < 3; c++) {\n    avanzar();\n    ________();\n  }\n\n  girarDerecha(); girarDerecha();\n  for (let c = 0; c < 3; c++) { avanzar(); }\n\n  girarIzquierda();\n  avanzar();\n  girarIzquierda();\n}" }
      ],
      solucion: "for (let fila = 0; fila < 3; fila++) {\n\n  // una fila de flores\n  for (let c = 0; c < 3; c++) {\n    avanzar();\n    plantar();\n  }\n\n  // media vuelta y volver al inicio de la fila\n  girarDerecha();\n  girarDerecha();\n  for (let c = 0; c < 3; c++) {\n    avanzar();\n  }\n\n  // bajar a la siguiente fila\n  girarIzquierda();\n  avanzar();\n  girarIzquierda();\n}",
      nota: "El bucle de dentro se ejecuta entero por cada vuelta del de fuera: 3 filas × 3 flores = 9 flores. Es la base de casi todo lo que dibuja una cuadrícula en programación."
    },
    {
      id: 8,
      titulo: "Listas de números",
      concepto: "Arrays",
      texto: "Las flores no están a la misma distancia: 1 casilla, luego 3, luego 3. " +
             "Una **lista** (array) guarda varios valores juntos.\n\n" +
             "`${const saltos = [1, 3, 3];}` y `${for (const s of saltos) { … }}` recorre la lista " +
             "valor a valor. Además, `avanzar()` acepta un número: `${avanzar(3)}` avanza 3 casillas.",
      mapa: [
        "..............",
        "R*..*..*......",
        ".............."
      ],
      objetivosTexto: ["Plantar las 3 flores", "Recorrer una lista con for...of"],
      pistas: [
        { t: "La idea", v: "Guarda las distancias en una lista y recórrela: en cada vuelta avanzas esa distancia y plantas." },
        { t: "Cómo se escribe", v: "<code>const saltos = [1, 3, 3];</code> y luego <code>for (const s of saltos) { avanzar(s); plantar(); }</code>. La `s` va tomando cada número de la lista." },
        { t: "Casi lo tienes", v: "Falta rellenar la lista:", codigo: "const saltos = [__, __, __];\n\nfor (const s of saltos) {\n  avanzar(s);\n  plantar();\n}" }
      ],
      solucion: "const saltos = [1, 3, 3];\n\nfor (const s of saltos) {\n  avanzar(s);\n  plantar();\n}",
      nota: "Un array es una lista ordenada de valores: aquí las distancias entre flores. `for (const s of saltos)` la recorre de principio a fin, y `avanzar(s)` usa el número de cada vuelta para caminar justo lo necesario."
    },
    {
      id: 9,
      titulo: "El jardín imposible",
      concepto: "Todo junto",
      texto: "Última misión: un muro de rocas en medio del jardín y dos flores escondidas, " +
             "una a cada lado. Aquí no hay caminos rectos: toca **rodear**.\n\n" +
             "Mezcla todo lo aprendido: giros, distancias con `${avanzar(n)}` y, si quieres, un bucle. " +
             "Puedes plantar en cualquier orden.",
      mapa: [
        ".........",
        "R...#....",
        ".*..#.*..",
        "....#....",
        "........."
      ],
      objetivosTexto: ["Plantar la flor de la izquierda", "Plantar la flor de la derecha", "Rodear el muro de rocas"],
      pistas: [
        { t: "La idea", v: "Robi no puede atravesar las rocas. Baja hasta la última fila (está libre), cruza por abajo y sube por el otro lado." },
        { t: "El camino", v: "Gira a la derecha y baja 2 casillas para la primera flor. Después baja hasta la fila libre de abajo, cruza 5 casillas a la derecha, sube 2 y planta." },
        { t: "Casi lo tienes", v: "Faltan los dos números grandes:", codigo: "girarDerecha();\navanzar();\ngirarIzquierda();\navanzar();\nplantar();\n\ngirarDerecha();\navanzar(__);      // bajar hasta la fila libre\ngirarIzquierda();\navanzar(__);      // cruzar por debajo del muro\ngirarIzquierda();\navanzar(2);\nplantar();" }
      ],
      solucion: "girarDerecha();\navanzar();\ngirarIzquierda();\navanzar();\nplantar();   // flor de la izquierda\n\ngirarDerecha();\navanzar(2);   // bajar hasta la fila libre de abajo\ngirarIzquierda();\navanzar(5);   // cruzar por debajo del muro\ngirarIzquierda();\navanzar(2);\nplantar();    // flor de la derecha",
      nota: "Un plan largo se construye por partes: primero una flor, después la otra. Los giros colocan a Robi y `avanzar(n)` recorre varios pasos de golpe. Si algo sale mal, cambia una sola línea y vuelve a ejecutar."
    }
  ];

  /* ---------------- Utilidades del mapa ---------------- */
  function parsearNivel(nivel) {
    var mapa = nivel.mapa;
    var inicio = { x: 0, y: 0, dir: "este" };
    var objetivos = [];
    var rocas = [];
    var simbolos = { ">": "este", "<": "oeste", "v": "sur", "^": "norte", "R": "este" };

    mapa.forEach(function (fila, y) {
      for (var x = 0; x < fila.length; x++) {
        var c = fila[x];
        if (simbolos[c]) { inicio = { x: x, y: y, dir: simbolos[c] }; }
        else if (c === "*") { objetivos.push(x + "," + y); }
        else if (c === "#") { rocas.push(x + "," + y); }
      }
    });

    return {
      id: nivel.id,
      ancho: Math.max.apply(null, mapa.map(function (f) { return f.length; })),
      alto: mapa.length,
      inicio: inicio,
      objetivos: objetivos,
      rocas: rocas,
      mapa: mapa
    };
  }

  /* ---------------- Ejecutor ---------------- */
  // Calibra el desfase de líneas de `new Function` (difiere entre navegadores)
  var DESFASE = null;
  function calibrarDesfase() {
    if (DESFASE !== null) return DESFASE;
    try {
      // el cuerpo de la sonda empieza por "use strict"; y la llamada imposible
      // ocupa su línea 2, que equivale a la línea 1 del código del jugador
      /* jshint evil:true */
      var sonda = new Function('"use strict";\n__sonda_de_error__();\n');
      sonda();
    } catch (e) {
      var m = /<anonymous>:(\d+):(\d+)/.exec(e && e.stack ? e.stack : "");
      if (m) { DESFASE = parseInt(m[1], 10) - 1; }
    }
    if (DESFASE === null || isNaN(DESFASE)) DESFASE = 2;
    return DESFASE;
  }

  /**
   * Heurística para los errores de sintaxis (V8 no da posición al compilar
   * con new Function): cuenta paréntesis, llaves y corchetes línea a línea.
   */
  function lineaProbableDeSintaxis(texto) {
    var lineas = String(texto).split("\n");
    var par = 0, llave = 0, cor = 0;
    for (var i = 0; i < lineas.length; i++) {
      var l = lineas[i]
        .replace(/\/\/[^\n]*/g, "")
        .replace(/'[^'\n]*'|"[^"\n]*"|`[^`\n]*`/g, "''");
      for (var j = 0; j < l.length; j++) {
        var c = l.charAt(j);
        if (c === "(") { par++; }
        else if (c === ")") { par--; if (par < 0) { return { linea: i + 1, sobra: true }; } }
        else if (c === "{") { llave++; }
        else if (c === "}") { llave--; if (llave < 0) { return { linea: i + 1, sobra: true }; } }
        else if (c === "[") { cor++; }
        else if (c === "]") { cor--; if (cor < 0) { return { linea: i + 1, sobra: true }; } }
      }
    }
    if (par > 0 || llave > 0 || cor > 0) {
      return { linea: lineas.length, sobra: false };
    }
    return null;
  }

  function lineaDelError(e) {
    var pila = (e && e.stack) ? String(e.stack) : "";
    var m = /<anonymous>:(\d+):(\d+)/.exec(pila);
    if (!m) return null;
    var linea = parseInt(m[1], 10) - calibrarDesfase();
    return linea > 0 ? linea : null;
  }

  /**
   * Ejecuta el código del jugador sobre un nivel y devuelve lo ocurrido.
   * @returns {{acciones: Array, mensajes: Array, flores: Array, floresExtra: Array,
   *            estadoFinal: Object, error: (null|{mensaje:string, linea:(number|null)})}}
   */
  function simular(nivelParsed, codigo) {
    var texto = String(codigo == null ? "" : codigo);

    var resultado = {
      acciones: [],
      mensajes: [],
      flores: [],
      floresExtra: [],
      estadoFinal: null,
      error: null
    };

    var estado = {
      x: nivelParsed.inicio.x,
      y: nivelParsed.inicio.y,
      dir: nivelParsed.inicio.dir,
      flores: {},
      extra: {},
      cuenta: 0
    };

    function clave(x, y) { return x + "," + y; }
    function dentro(x, y) {
      return x >= 0 && y >= 0 && x < nivelParsed.ancho && y < nivelParsed.alto;
    }
    function esRoca(x, y) { return nivelParsed.rocas.indexOf(clave(x, y)) !== -1; }
    function esObjetivo(x, y) { return nivelParsed.objetivos.indexOf(clave(x, y)) !== -1; }

    function registrar(accion) {
      estado.cuenta++;
      if (estado.cuenta > MAX_ACCIONES) {
        throw new Error("¡Demasiadas acciones! Robi se ha cansado. ¿Hay un bucle que no termina?");
      }
      accion.x = estado.x;
      accion.y = estado.y;
      accion.dir = estado.dir;
      resultado.acciones.push(accion);
    }

    // --- los comandos que ve el jugador ---
    function avanzar(n) {
      var pasos = (n === undefined) ? 1 : n;
      if (typeof pasos !== "number" || !isFinite(pasos) || pasos < 1) {
        throw new Error("avanzar() necesita un número mayor que 0. Ejemplo: avanzar(3)");
      }
      pasos = Math.floor(pasos);
      for (var i = 0; i < pasos; i++) {
        var d = DIRECCIONES[estado.dir];
        var nx = estado.x + d.dx;
        var ny = estado.y + d.dy;
        if (!dentro(nx, ny)) {
          throw new Error("¡Robi se sale del jardín! 🌱 Gíralo antes de seguir avanzando.");
        }
        if (esRoca(nx, ny)) {
          throw new Error("¡Hay una roca delante! 🪨 Rodéala con giros.");
        }
        estado.x = nx;
        estado.y = ny;
        registrar({ tipo: "mover" });
      }
    }

    function girarDerecha() {
      estado.dir = GIRO_DERECHA[estado.dir];
      registrar({ tipo: "girar" });
    }

    function girarIzquierda() {
      estado.dir = GIRO_IZQUIERDA[estado.dir];
      registrar({ tipo: "girar" });
    }

    function plantar() {
      var k = clave(estado.x, estado.y);
      if (estado.flores[k]) { return; }         // ya hay flor: no pasa nada
      estado.flores[k] = true;
      if (esObjetivo(estado.x, estado.y)) {
        resultado.flores.push(k);
        registrar({ tipo: "flor", buena: true });
      } else {
        estado.extra[k] = true;
        resultado.floresExtra.push(k);
        registrar({ tipo: "flor", buena: false });
      }
    }

    function faltaFlor() {
      var k = clave(estado.x, estado.y);
      return esObjetivo(estado.x, estado.y) && !estado.flores[k];
    }

    function hayFlor() { return !!estado.flores[clave(estado.x, estado.y)]; }

    function hayRoca() {
      var d = DIRECCIONES[estado.dir];
      return esRoca(estado.x + d.dx, estado.y + d.dy);
    }

    function decir(txt) {
      resultado.mensajes.push(String(txt));
    }

    // --- comprobaciones previas amables ---
    var sinComentarios = texto.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
    if (/\bwhile\s*\(/.test(sinComentarios) || /\bdo\s*\{/.test(sinComentarios)) {
      resultado.error = {
        mensaje: "En este juego el bucle while está desactivado (podría no terminar nunca). Usa for 🔁",
        linea: null
      };
      resultado.estadoFinal = { x: estado.x, y: estado.y, dir: estado.dir };
      return resultado;
    }

    // --- ejecución real de JavaScript ---
    try {
      /* jshint evil:true */
      var fn = new Function(
        "avanzar", "girarDerecha", "girarIzquierda", "plantar",
        "faltaFlor", "hayFlor", "hayRoca", "decir",
        '"use strict";\n' + texto + "\n"
      );
      fn(avanzar, girarDerecha, girarIzquierda, plantar, faltaFlor, hayFlor, hayRoca, decir);
    } catch (e) {
      var esSintaxis = e && (e.name === "SyntaxError" || /SyntaxError/.test(String(e && e.name)));
      var linea = lineaDelError(e);
      var msg = e && e.message ? e.message : String(e);
      if (esSintaxis) {
        var pista = lineaProbableDeSintaxis(texto);
        if (pista) { linea = pista.linea; }
        msg = pista && pista.sobra
          ? "Sobra un paréntesis, una llave o un corchete en esta línea."
          : "Falta cerrar un paréntesis, una llave { } o un corchete. Revisa también las comillas.";
      }
      resultado.error = { mensaje: msg, linea: linea };
    }

    resultado.estadoFinal = { x: estado.x, y: estado.y, dir: estado.dir };
    return resultado;
  }

  /**
   * ¿Está el jardín bien plantado?
   */
  function verificar(nivelParsed, sim) {
    if (sim.error) {
      return { ok: false, motivo: sim.error.mensaje, tipo: "error" };
    }
    if (sim.floresExtra.length > 0) {
      return {
        ok: false,
        tipo: "extra",
        motivo: "Hay " + sim.floresExtra.length +
          " flor(es) donde no tocaba 🥀. Fíjate en las casillas con el círculo: solo esas."
      };
    }
    var faltan = nivelParsed.objetivos.filter(function (k) {
      return sim.flores.indexOf(k) === -1;
    });
    if (faltan.length > 0) {
      return {
        ok: false,
        tipo: "faltan",
        motivo: "¡Casi! Faltan " + faltan.length + " flor(es). Revisa el camino y vuelve a ejecutar."
      };
    }
    return { ok: true, motivo: "¡Jardín perfecto! 🌸" };
  }

  /** Ejecuta y verifica en un paso (cómodo para pruebas). */
  function ejecutarNivel(nivel, codigo) {
    var p = parsearNivel(nivel);
    var s = simular(p, codigo);
    var v = verificar(p, s);
    return { sim: s, veredicto: v, nivel: p, correcto: v.ok === true };
  }

  var JUEGO = {
    NIVELES: NIVELES,
    parsearNivel: parsearNivel,
    simular: simular,
    verificar: verificar,
    ejecutarNivel: ejecutarNivel,
    DIRECCIONES: DIRECCIONES
  };

  if (typeof module !== "undefined" && module.exports) { module.exports.JUEGO = JUEGO; }
  raiz.JUEGO = JUEGO;

  /* ===================================================================
     PARTE 2 · INTERFAZ
     =================================================================== */
  if (typeof document === "undefined") { return; }

  document.addEventListener("DOMContentLoaded", function () {
    var $ = function (id) { return document.getElementById(id); };

    var elJardin = $("jardin"), elMarco = document.querySelector(".jardin-marco");
    var elEditor = $("editor"), elGutter = $("gutter");
    var elConsola = $("consola"), elListaObj = $("listaObjetivos"), elContador = $("contadorFlores");
    var elProgreso = $("progreso"), elPistas = $("pistasLista"), elPistasUsadas = $("pistasUsadas");

    var CLAVE_BD = "dczc-progreso-v1";
    var progreso = cargarProgreso();

    var idx = Math.min(progreso.nivelActual || 0, NIVELES.length - 1);
    var nivel = NIVELES[idx];
    var nivelParsed = parsearNivel(nivel);
    var estado = { x: 0, y: 0, dir: "este", flores: {} };
    var pistasMostradas = 0;
    var ejecutando = false;

    /* ---------- almacenamiento ---------- */
    function cargarProgreso() {
      try {
        var d = JSON.parse(localStorage.getItem(CLAVE_BD) || "{}");
        return { nivelActual: 0, estrellas: {}, completados: {}, ...d };
      } catch (e) {
        return { nivelActual: 0, estrellas: {}, completados: {} };
      }
    }
    function guardarProgreso() {
      try { localStorage.setItem(CLAVE_BD, JSON.stringify(progreso)); } catch (e) {}
    }

    /* ---------- jardín ---------- */
    function crearJardin() {
      elJardin.innerHTML = "";
      elJardin.style.setProperty("--aspecto", nivelParsed.ancho + " / " + nivelParsed.alto);
      elJardin.style.gridTemplateColumns = "repeat(" + nivelParsed.ancho + ", 1fr)";
      elJardin.style.gridTemplateRows = "repeat(" + nivelParsed.alto + ", 1fr)";

      for (var y = 0; y < nivelParsed.alto; y++) {
        for (var x = 0; x < nivelParsed.ancho; x++) {
          var c = document.createElement("div");
          c.className = "casilla";
          var k = x + "," + y;
          if ((x + y) % 2 === 0) { c.classList.add("oscura"); }
          if (nivelParsed.objetivos.indexOf(k) !== -1) { c.classList.add("objetivo"); }
          if (nivelParsed.rocas.indexOf(k) !== -1) {
            c.classList.add("roca");
            var r = document.createElement("span");
            r.className = "emoji";
            r.textContent = "🪨";
            c.appendChild(r);
          }
          c.id = "casilla-" + x + "-" + y;
          elJardin.appendChild(c);
        }
      }
      pintarRobi(true);
    }

    function casilla(x, y) { return document.getElementById("casilla-" + x + "-" + y); }

    function pintarRobi(instantaneo) {
      var previo = document.querySelector(".robi");
      if (previo && !instantaneo) { previo.remove(); }

      var c = casilla(estado.x, estado.y);
      if (!c) return;
      var viejo = c.querySelector(".robi");
      if (viejo) viejo.remove();

      var r = document.createElement("div");
      r.className = "robi dir-" + estado.dir;
      r.innerHTML = '<span class="antena"></span><span class="ojo izq"></span>' +
                    '<span class="ojo der"></span><span class="boca"></span><span class="nariz"></span>';
      c.appendChild(r);
      if (!instantaneo) {
        r.classList.add("salta");
        setTimeout(function () { r.classList.remove("salta"); }, 240);
      }
    }

    function pintarFlor(x, y, buena) {
      var c = casilla(x, y);
      if (!c) return;
      var f = document.createElement("span");
      f.className = "emoji flor";
      f.textContent = buena ? "🌸" : "🥀";
      c.appendChild(f);
    }

    function reiniciarJardin() {
      estado = { x: nivelParsed.inicio.x, y: nivelParsed.inicio.y, dir: nivelParsed.inicio.dir, flores: {} };
      crearJardin();
      actualizarContador();
    }

    function actualizarContador() {
      var puestas = Object.keys(estado.flores).filter(function (k) {
        return nivelParsed.objetivos.indexOf(k) !== -1;
      }).length;
      elContador.textContent = puestas + " / " + nivelParsed.objetivos.length + " flores";
      // marcar la lista
      Array.prototype.forEach.call(elListaObj.children, function (li, i) {
        var total = nivelParsed.objetivos.length;
        var hechas = puestas;
        if (total <= 3 && i < total) {
          var k = nivelParsed.objetivos[i];
          li.classList.toggle("listo", !!estado.flores[k]);
        } else {
          li.classList.toggle("listo", hechas >= total);
        }
      });
    }

    /* ---------- misión ---------- */
    function pintarMision() {
      $("nivelNum").textContent = "Nivel " + (idx + 1) + " de " + NIVELES.length;
      $("misionTitulo").textContent = nivel.titulo;
      $("misionConcepto").textContent = nivel.concepto;
      $("misionTexto").innerHTML = formatear(nivel.texto);

      elListaObj.innerHTML = "";
      nivel.objetivosTexto.forEach(function (t) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="marca-ok">✓</span><span>' + formatear(t) + '</span>';
        elListaObj.appendChild(li);
      });

      pistasMostradas = 0;
      elPistas.innerHTML = "";
      elPistasUsadas.textContent = "0 / " + nivel.pistas.length;
      $("btnPista").disabled = false;
      $("btnPista").textContent = "Dame una pista";

      elEditor.value = progreso.codigo && progreso.codigo[nivel.id] ? progreso.codigo[nivel.id] : plantilla();
      actualizarGutter();
      limpiarConsola();
      reiniciarJardin();
      pintarProgreso();
    }

    // `${...}` → <code>...</code>   (respeta las llaves anidadas)
    function formatear(txt) {
      var s = String(txt)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, function (m, d) { return "<code>" + escapar(d) + "</code>"; });
      var out = "", i = 0;
      while (i < s.length) {
        var ini = s.indexOf("${", i);
        if (ini === -1) { out += s.slice(i); break; }
        out += s.slice(i, ini);
        var nivel2 = 0, j = ini + 1, cerrado = false;
        for (; j < s.length; j++) {
          var c = s.charAt(j);
          if (c === "{") { nivel2++; }
          else if (c === "}") {
            nivel2--;
            if (nivel2 === 0) { j++; cerrado = true; break; }
          }
        }
        out += "<code>" + escapar(s.slice(ini + 2, cerrado ? j - 1 : s.length)) + "</code>";
        i = j;
      }
      return out.replace(/\n\n/g, "<br><br>");
    }

    function plantilla() {
      return "// Escribe tu código aquí y pulsa ▶ Ejecutar\n\n";
    }

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
          if (!desbloqueado && !hecho) { avisar("Termina antes los niveles anteriores 🙂"); return; }
          irANivel(i);
        });
        elProgreso.appendChild(b);
      });
    }

    function irANivel(i) {
      if (ejecutando) return;
      idx = Math.max(0, Math.min(i, NIVELES.length - 1));
      nivel = NIVELES[idx];
      nivelParsed = parsearNivel(nivel);
      progreso.nivelActual = idx;
      guardarProgreso();
      pintarMision();
    }

    /* ---------- pistas ---------- */
    $("btnPista").addEventListener("click", function () {
      if (pistasMostradas >= nivel.pistas.length) return;
      var p = nivel.pistas[pistasMostradas];
      var div = document.createElement("div");
      div.className = "pista";
      var html = "<strong>" + (pistasMostradas + 1) + ". " + p.t + "</strong>" + formatear(p.v);
      if (p.codigo) { html += "<pre>" + escapar(p.codigo) + "</pre>"; }
      div.innerHTML = html;
      elPistas.appendChild(div);
      pistasMostradas++;
      elPistasUsadas.textContent = pistasMostradas + " / " + nivel.pistas.length;
      if (pistasMostradas >= nivel.pistas.length) {
        $("btnPista").disabled = true;
        $("btnPista").textContent = "No hay más pistas 🙂";
      }
    });

    function escapar(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /* ---------- consola ---------- */
    function limpiarConsola() {
      elConsola.innerHTML = '<p class="consola-vacia">Aquí verás los mensajes y los errores.</p>';
    }
    function log(texto, clase) {
      var p = elConsola.querySelector(".consola-vacia");
      if (p) p.remove();
      var el = document.createElement(clase === "linea-err" ? "span" : "p");
      el.className = clase || "info";
      el.textContent = texto;
      elConsola.appendChild(el);
      elConsola.scrollTop = elConsola.scrollHeight;
    }
    function avisar(t) { log(t, "info"); }

    /* ---------- editor ---------- */
    function actualizarGutter() {
      var n = elEditor.value.split("\n").length;
      var html = "";
      for (var i = 1; i <= Math.max(n, 1); i++) { html += "<span>" + i + "</span>"; }
      elGutter.innerHTML = html;
      elGutter.scrollTop = elEditor.scrollTop;
    }

    function marcarErrorLinea(n) {
      var spans = elGutter.querySelectorAll("span");
      Array.prototype.forEach.call(spans, function (s) { s.className = ""; });
      if (!n || !spans.length) return;
      var s = spans[Math.min(n, spans.length) - 1];
      if (s) s.className = "err";
    }

    elEditor.addEventListener("input", function () {
      actualizarGutter();
      marcarErrorLinea(null);
      if (!progreso.codigo) progreso.codigo = {};
      progreso.codigo[nivel.id] = elEditor.value;
      guardarProgreso();
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
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); ejecutar(); }
    });

    /* ---------- ejecutar ---------- */
    $("btnEjecutar").addEventListener("click", ejecutar);
    $("btnReiniciar").addEventListener("click", function () {
      if (ejecutando) return;
      reiniciarJardin();
      limpiarConsola();
    });

    function ejecutar() {
      if (ejecutando) return;

      var codigo = elEditor.value;
      if (!codigo.trim() || codigo.trim() === "// Escribe tu código aquí y pulsa ▶ Ejecutar") {
        limpiarConsola();
        log("Escribe algo de código primero 🙂 (mira las pistas si no sabes por dónde empezar)", "info");
        return;
      }

      ejecutando = true;
      $("btnEjecutar").disabled = true;
      $("btnEjecutar").textContent = "⏳ Ejecutando…";
      limpiarConsola();
      marcarErrorLinea(null);

      var sim = simular(nivelParsed, codigo);

      if (sim.mensajes.length) {
        sim.mensajes.forEach(function (m) { log("Robi dice: " + m, "robot"); });
      }

      reproducir(sim, function () {
        var v = verificar(nivelParsed, sim);
        if (v.ok) {
          log("✓ " + v.motivo, "ok");
          exito();
        } else {
          log(v.motivo, "error");
          elMarco.classList.add("temblor");
          setTimeout(function () { elMarco.classList.remove("temblor"); }, 320);
        }
        if (sim.error) {
          marcarErrorLinea(sim.error.linea || null);
        }
        if (sim.error && sim.error.linea) {
          var span = document.createElement("span");
          span.className = "linea-err";
          span.textContent = "Error en la línea " + sim.error.linea;
          elConsola.appendChild(span);
        }
        ejecutando = false;
        $("btnEjecutar").disabled = false;
        $("btnEjecutar").textContent = "▶ Ejecutar";
      });
    }

    function reproducir(sim, alTerminar) {
      var velocidad = parseInt($("velocidad").value, 10) || 320;
      var acciones = sim.acciones.slice();
      var i = 0;
      // si hay muchas acciones, aceleramos para no hacer esperar
      var paso = acciones.length > 30 ? Math.max(55, Math.round(velocidad / 5))
               : acciones.length > 16 ? Math.round(velocidad / 2)
               : velocidad;

      estado = { x: nivelParsed.inicio.x, y: nivelParsed.inicio.y, dir: nivelParsed.inicio.dir, flores: {} };
      crearJardin();
      actualizarContador();

      if (!acciones.length) {
        // error antes de moverse: mostramos el mensaje y ya está
        setTimeout(alTerminar, 120);
        return;
      }

      var intervalo = setInterval(function () {
        if (i >= acciones.length) {
          clearInterval(intervalo);
          setTimeout(alTerminar, 180);
          return;
        }
        var a = acciones[i++];
        estado.x = a.x; estado.y = a.y; estado.dir = a.dir;
        if (a.tipo === "flor") {
          estado.flores[a.x + "," + a.y] = true;
          pintarFlor(a.x, a.y, a.buena);
          pintarRobi(true);
        } else {
          pintarRobi(false);
        }
        actualizarContador();
      }, paso);
    }

    /* ---------- éxito ---------- */
    function exito() {
      var estrellas = 3;
      if (pistasMostradas > 0) estrellas--;
      if (pistasMostradas >= 3) estrellas--;
      estrellas = Math.max(1, estrellas);

      var antes = progreso.estrellas[nivel.id] || 0;
      progreso.estrellas[nivel.id] = Math.max(antes, estrellas);
      progreso.completados[nivel.id] = true;
      progreso.nivelMax = Math.max(progreso.nivelMax || 0, Math.min(idx + 1, NIVELES.length - 1));
      progreso.nivelActual = idx;
      guardarProgreso();
      pintarProgreso();

      var estrellasTxt = "";
      for (var i = 0; i < 3; i++) { estrellasTxt += i < estrellas ? "⭐" : "☆"; }
      $("estrellasModal").textContent = estrellasTxt;

      var ultimo = idx === NIVELES.length - 1;
      $("exitoTitulo").textContent = ultimo ? "¡Has terminado el juego! 🏆" : "¡Nivel superado!";
      $("exitoTexto").textContent = ultimo
        ? "Has plantado todos los jardines y ya sabes usar funciones, bucles, variables, condiciones y listas. ¡Eso es programar de verdad!"
        : (estrellas === 3 ? "Sin pistas y a la primera. ¡Perfecto!" : "Bien hecho. Repite el nivel sin pistas para ganar 3 estrellas.");
      $("btnSiguiente").style.display = ultimo ? "none" : "inline-block";

      lanzarConfeti();
      document.getElementById("modalExito").classList.add("abierto");
    }

    function lanzarConfeti() {
      var caja = $("confeti");
      caja.innerHTML = "";
      var colores = ["#4caf76", "#f2b53c", "#e05b4c", "#5aa9e6", "#b07cd8"];
      for (var i = 0; i < 26; i++) {
        var p = document.createElement("span");
        p.className = "confeti-pieza";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = colores[i % colores.length];
        p.style.animationDelay = (Math.random() * 0.5) + "s";
        caja.appendChild(p);
      }
    }

    $("btnSiguiente").addEventListener("click", function () {
      document.getElementById("modalExito").classList.remove("abierto");
      irANivel(idx + 1);
    });
    $("btnRepetir").addEventListener("click", function () {
      document.getElementById("modalExito").classList.remove("abierto");
      reiniciarJardin();
      limpiarConsola();
    });

    /* ---------- solución ---------- */
    $("btnSolucion").addEventListener("click", function () {
      $("solucionCodigo").textContent = nivel.solucion;
      $("solucionNota").innerHTML = formatear(nivel.nota);
      document.getElementById("modalSolucion").classList.add("abierto");
    });
    $("btnCopiarSolucion").addEventListener("click", function () {
      elEditor.value = nivel.solucion;
      actualizarGutter();
      if (!progreso.codigo) progreso.codigo = {};
      progreso.codigo[nivel.id] = nivel.solucion;
      guardarProgreso();
      document.getElementById("modalSolucion").classList.remove("abierto");
      log("Solución copiada. Pulsa ▶ Ejecutar para verla funcionar 👀", "info");
    });
    ["btnCerrarSolucion", "btnCerrarSolucion2"].forEach(function (id) {
      $(id).addEventListener("click", function () {
        document.getElementById("modalSolucion").classList.remove("abierto");
      });
    });

    /* ---------- ayuda ---------- */
    $("btnAyuda").addEventListener("click", function () {
      document.getElementById("modalAyuda").classList.add("abierto");
    });
    ["btnCerrarAyuda", "btnCerrarAyuda2"].forEach(function (id) {
      $(id).addEventListener("click", function () {
        document.getElementById("modalAyuda").classList.remove("abierto");
      });
    });

    /* ---------- teclado global ---------- */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.abierto").forEach(function (m) { m.classList.remove("abierto"); });
      }
    });

    /* ---------- arranque ---------- */
    pintarMision();
  });

})(typeof window !== "undefined" ? window : globalThis);
