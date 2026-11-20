/* Portafolio bilingue. Una sola copia del sitio, en espanol, y aqui la
   traduccion. El guion recorre los nodos de texto y los cambia por su
   equivalente; al volver a espanol restaura el original, que guarda en
   memoria. La primera visita pregunta el idioma; despues se recuerda. */
(function () {
  'use strict';

  /* Pares: cadena en espanol -> cadena en ingles. Lo que no aparece aqui
     (nombres propios, codigo, numeros romanos) se queda como esta. */
  var T = {
    /* --- portada --- */
    'Enrique Christensen — Mecatrónica e IA': 'Enrique Christensen — Mechatronics & AI',
    'Portafolio de Enrique Christensen, ingeniero mecatrónico con especialización en inteligencia artificial. Cali, Colombia.':
      'Portfolio of Enrique Christensen, a mechatronics engineer specialized in artificial intelligence. Cali, Colombia.',
    'Proyectos': 'Projects',
    'Cerrar': 'Close',
    'Sobre mí': 'About',
    'Habilidades': 'Skills',
    'Contacto': 'Contact',
    'Ingeniería mecatrónica · Inteligencia artificial': 'Mechatronics engineering · Artificial intelligence',
    'Construyo máquinas que piensan': 'I build machines that think',
    'y mentes que mueven máquinas.': 'and minds that move machines.',
    'Soy': "I'm",
    ', ingeniero mecatrónico con especialización en IA.\n      Del PLC en planta a la red neuronal, convierto ideas raras en sistemas que funcionan.':
      ', a mechatronics engineer specialized in AI.\n      From the PLC on the plant floor to the neural network, I turn strange ideas into systems that work.',
    'Ver proyectos →': 'See projects →',
    'No solo programo.': "I don't just write code.",
    'Construyo.': 'I build.',
    'Vengo de la automatización industrial y llegué a la inteligencia artificial por curiosidad. Hoy diseño sistemas multiagente, le doy voz a un asistente de escritorio y pongo':
      'I come from industrial automation and found my way into artificial intelligence out of curiosity. Today I design multi-agent systems, give a desktop assistant a voice, and put',
    'el cerebro de una mosca a pilotar un avión': "a fly's brain in the cockpit of a plane",
    'Doble titulación de la Universidad Autónoma de Occidente. Vivo en Cali, Colombia.':
      'Dual degree from Universidad Autónoma de Occidente. I live in Cali, Colombia.',
    'Formación': 'Education',
    'Ing. mecatrónica · Especialización en IA': 'Mechatronics eng. · AI specialization',
    'Base': 'Based in',
    'Cali, Colombia · Remoto': 'Cali, Colombia · Remote',
    'Lo que': 'What I',
    'hago.': 'do.',
    'Automatización industrial': 'Industrial automation',
    'Programación de PLCs, control de procesos y sistemas mecatrónicos que funcionan en planta.':
      'PLC programming, process control and mechatronic systems that run on the plant floor.',
    'Sistemas multiagente': 'Multi-agent systems',
    'Agentes de IA que colaboran para investigar, filtrar y resumir.':
      'AI agents that work together to research, filter and summarize.',
    'Redes neuronales bioinspiradas': 'Bio-inspired neural networks',
    'Modelos basados en conectomas reales, aplicados a control y reflejos.':
      'Models built on real connectomes, applied to control and reflexes.',
    'Asistentes y herramientas': 'Assistants and tools',
    'Asistentes de voz, overlays y bots para el escritorio, Discord o un juego.':
      'Voice assistants, overlays and bots for the desktop, Discord or a game.',
    'Código creativo': 'Creative coding',
    'Juegos web y generadores procedurales de fantasía oscura.':
      'Browser games and procedural dark fantasy generators.',
    'Construyamos algo que': "Let's build something that",
    'aún no existe.': "doesn't exist yet.",
    'Automatización, IA o una idea que suena imposible. Escríbeme y lo hablamos.':
      'Automation, AI or an idea that sounds impossible. Write to me and we can talk it through.',

    /* --- comunes a las fichas --- */
    '← Portafolio': '← Portfolio',
    '← Volver al portafolio': '← Back to the portfolio',
    'Portafolio': 'Portfolio',
    'Qué': 'What',
    'es.': 'it is.',
    'hace.': 'it does.',
    'Con qué': 'Built',
    'está hecho.': 'with.',
    'Cómo': 'How',
    'usarlo.': 'to use it.',
    'Herramientas': 'Tools',
    'Ver el código en GitHub': 'See the code on GitHub',
    'Ver el código en GitHub →': 'See the code on GitHub →',

    /* --- Jarvis --- */
    'Jarvis: asistente de escritorio para Windows con voz, orbe de esquina y HUD.':
      'Jarvis: a Windows desktop assistant with voice, a corner orb and a HUD.',
    'IA · Asistente de escritorio': 'AI · Desktop assistant',
    'asistente de escritorio.': 'a desktop assistant.',
    'Un asistente personal para Windows al que le hablas y te responde en voz alta. Vive en un orbe en la esquina de la pantalla y puede actuar sobre el equipo.':
      'A personal assistant for Windows that you talk to and that answers out loud. It lives in an orb in the corner of the screen and can act on the machine.',
    'Orbe que representa a Jarvis': 'The orb that stands for Jarvis',
    'El orbe: aparece cuando Jarvis escucha o habla': 'The orb: it shows up when Jarvis is listening or speaking',
    'es un asistente de escritorio pensado para usarse sin tocar el teclado: lo llamas con una palabra de activación o un atajo, dictas lo que necesitas y te contesta hablando.':
      'is a desktop assistant meant to be used without touching the keyboard: you call it with a wake word or a shortcut, say what you need, and it answers out loud.',
    'El reconocimiento de voz corre en el propio equipo y la respuesta la genera un modelo de lenguaje con herramientas para actuar sobre Windows.':
      'Speech recognition runs on the machine itself, and the answer comes from a language model with tools to act on Windows.',
    'Palabra de activación': 'Wake word',
    'Responde a "Hey Jarvis", además de atajos de teclado para hablar, leer la selección o hacerlo callar.':
      'It answers to "Hey Jarvis", plus keyboard shortcuts to speak, read the selection or make it stop.',
    'Voz de ida y vuelta': 'Voice both ways',
    'Transcribe lo que dices con un modelo local y responde con voz sintetizada, con alternativas si no hay conexión.':
      'It transcribes what you say with a local model and answers with synthesized speech, falling back to other voices when there is no connection.',
    'Orbe de esquina': 'Corner orb',
    'Un indicador pequeño que aparece cuando Jarvis escucha o habla.':
      'A small indicator that appears when Jarvis is listening or speaking.',
    'Un panel de estilo ciencia ficción con el historial y el estado del equipo: procesador, memoria y tarjeta gráfica.':
      'A science fiction panel with the history and the state of the machine: processor, memory and graphics card.',
    'Abre aplicaciones, ajusta el volumen, mira la pantalla, escribe, maneja archivos, guarda notas y recordatorios y busca en la web. Los comandos delicados piden confirmación.':
      'It opens applications, adjusts the volume, looks at the screen, types, handles files, keeps notes and reminders, and searches the web. Sensitive commands ask for confirmation.',
    'Un solo ejecutable': 'One single executable',
    'Motor, HUD, atajos, orbe e icono de bandeja se lanzan desde un único programa.':
      'Engine, HUD, shortcuts, orb and tray icon all start from one program.',
    'LLM con herramientas': 'LLM with tools',
    'Jarvis es una aplicación para Windows que se instala en el equipo. El código todavía no está publicado en este repositorio.':
      'Jarvis is a Windows application that you install on the machine. The code is not published in this repository yet.',

    /* --- Aquaria --- */
    'Aquaria: un terrario de civilizaciones en 3D que corre en el navegador.':
      'Aquaria: a 3D terrarium of civilizations that runs in the browser.',
    'Juego · Simulación': 'Game · Simulation',
    'terrario de civilizaciones.': 'a terrarium of civilizations.',
    'Un mundo en miniatura dentro de una caja de cristal. Las sociedades nacen, se expanden, comercian y se hacen la guerra por su cuenta; tú miras, y de vez en cuando lanzas un meteorito.':
      'A miniature world inside a glass box. Societies are born, spread, trade and go to war on their own; you watch, and every now and then you drop a meteor.',
    'Jugar ahora →': 'Play now →',
    'Jugar ahora ↗': 'Play now ↗',
    'Jugar ahora': 'Play now',
    'Mapa del mundo de Aquaria': 'Map of the world of Aquaria',
    'El terrario, en marcha: el mundo sigue vivo mientras lo miras':
      'The terrarium running: the world stays alive while you watch it',
    'es una simulación que corre en el navegador: una isla en bloques, con montañas, bosques, estaciones y fauna, habitada por varias sociedades con formas de gobierno distintas.':
      'is a simulation that runs in the browser: an island built of blocks, with mountains, forests, seasons and wildlife, home to several societies with different forms of government.',
    'Es un terrario donde todo está conectado. No controlas a nadie directamente: observas cómo evoluciona el mundo y puedes intervenir con poderes.':
      'It is a terrarium where everything is connected. You control no one directly: you watch the world unfold and you can step in with powers.',
    'Sociedades vivas': 'Living societies',
    'Cada una tiene su gobierno (democracia, teocracia, imperio militar, tecnocracia y más), expande fronteras, funda ciudades y avanza de era.':
      'Each one has its own government (democracy, theocracy, military empire, technocracy and more), pushes its borders, founds cities and moves through eras.',
    'Líderes': 'Leaders',
    'Cada sociedad tiene un líder con personalidad que envejece y muere; su sucesor puede cambiarlo todo.':
      'Every society has a leader with a personality who grows old and dies; the successor can change everything.',
    'Diplomacia y guerra': 'Diplomacy and war',
    'Las relaciones suben con el comercio y bajan con incidentes o fronteras tensas; de ahí nacen alianzas y guerras.':
      'Relations rise with trade and fall with incidents or tense borders; alliances and wars grow out of that.',
    'Mundo conectado': 'A connected world',
    'La peste viaja por las rutas, los incendios se propagan en verano, los refugiados huyen y las ciudades descontentas cambian de bando.':
      'Plague travels along the trade routes, fires spread in summer, refugees flee and unhappy cities switch sides.',
    'Naturaleza': 'Nature',
    'Pasan las estaciones, los animales pastan, los lobos cazan y los bosques crecen.':
      'Seasons pass, animals graze, wolves hunt and forests grow.',
    'Poderes': 'Powers',
    'Meteorito, rayo, fuego, lluvia, terremoto, volcán, peste, bendición, inspiración, revuelta y más.':
      'Meteor, lightning, fire, rain, earthquake, volcano, plague, blessing, inspiration, revolt and more.',
    'Crónica': 'Chronicle',
    'Un registro de lo que va pasando en el mundo, año por año.':
      'A record of what happens in the world, year by year.',
    'Pulsa': 'Press',
    ': corre directo en el navegador, sin instalar nada.':
      ': it runs straight in the browser, with nothing to install.',
    'Arrastra para girar el terrario y usa la rueda para acercarte.':
      'Drag to turn the terrarium and use the wheel to zoom in.',
    'Cambia la velocidad arriba, funda una sociedad nueva o suelta un poder desde la barra inferior.':
      'Change the speed at the top, found a new society or drop a power from the bottom bar.',

    /* --- Atlas de mi PC (el nombre del programa no se traduce) --- */
    'Atlas de mi PC: tu disco duro convertido en una ciudad 3D para ver qué ocupa espacio y limpiarlo.':
      'Atlas de mi PC: your hard drive turned into a 3D city, to see what is eating your space and clear it out.',
    'Herramienta · Explorador 3D': 'Tool · 3D explorer',
    'Atlas de': 'Atlas de',
    'mi PC.': 'mi PC.',
    'Tu disco duro convertido en una ciudad en 3D. Cada carpeta es una manzana, cada edificio un bloque de archivos, y su altura es lo que pesa. Para ver de un vistazo qué ocupa espacio y decidir qué se va.':
      'Your hard drive turned into a 3D city. Each folder is a block, each building a chunk of files, and its height is what it weighs. To see at a glance what is taking up space and decide what goes.',
    'Vista de la ciudad 3D del Atlas de mi PC': 'A view of the 3D city in Atlas de mi PC',
    'La ciudad de un PC real: cada manzana es una carpeta':
      'The city of a real PC: every block is a folder',
    'es una aplicación de escritorio para Windows que censa el disco y lo dibuja como una maqueta urbana navegable. En vez de una lista de carpetas con números, ves un mapa: lo grande se nota porque es alto.':
      'is a Windows desktop application that takes a census of the disk and draws it as a city model you can walk through. Instead of a list of folders with numbers, you get a map: what is big stands out because it is tall.',
    'Corre por completo en tu equipo. Un pequeño servidor local en Python hace el censo y una página con three.js dibuja la ciudad; el servidor solo escucha en':
      'It runs entirely on your own machine. A small local Python server takes the census and a page with three.js draws the city; the server only listens on',
    ', así que nada sale del computador.': ', so nothing leaves the computer.',
    'Censo del disco': 'Disk census',
    'Recorre las unidades leyendo solo nombres, tamaños y fechas. No abre ni modifica ningún archivo.':
      'It walks the drives reading names, sizes and dates only. It never opens or changes a file.',
    'Ciudad navegable': 'A city you can walk',
    'Entras de una carpeta a sus subcarpetas, nivel por nivel, con una ficha de cada bloque: tamaño, archivos, tipos y última modificación.':
      'You step from a folder into its subfolders, level by level, with a card for each block: size, files, types and last change.',
    'Colores por tipo': 'Colors by type',
    'Código, imágenes, video, audio, documentos, comprimidos, ejecutables y datos se distinguen por color.':
      'Code, images, video, audio, documents, archives, programs and data are told apart by color.',
    'Basura y abandono': 'Junk and neglect',
    'Señala carpetas de basura conocida y bloques grandes que llevan mucho tiempo sin tocarse.':
      'It points out known junk folders and big blocks that have gone untouched for a long time.',
    'Duplicados': 'Duplicates',
    'Busca archivos repetidos a partir de un tamaño mínimo.':
      'It looks for repeated files above a size you choose.',
    'Borrado con red de seguridad': 'Deleting with a safety net',
    'Solo cuando lo confirmas, envía a la Papelera de reciclaje. Las zonas del sistema y las raíces de disco están protegidas.':
      'Only once you confirm, it sends things to the Recycle Bin. System areas and drive roots are protected.',
    'Mover a otro disco': 'Move to another drive',
    'Traslada una carpeta pesada a otra unidad y puede dejar un enlace en su lugar.':
      'It moves a heavy folder to another drive and can leave a link behind in its place.',
    'Un solo .exe': 'One single .exe',
    'Se empaqueta con PyInstaller en un ejecutable que abre la ciudad en su propia ventana.':
      'It is packed with PyInstaller into an executable that opens the city in a window of its own.',
    'Descarga la carpeta': 'Download the',
    'del repositorio.': 'folder from the repository.',
    'Con Python 3 instalado, ejecuta': 'With Python 3 installed, run',
    '(o': '(or',
    'Se abre la ciudad en una ventana propia. Para tener un ejecutable único, usa':
      'The city opens in a window of its own. For a single executable, use',

    /* --- fichas del cajon de proyectos (se dibujan desde el guion) --- */
    'IA': 'AI',
    'Otros': 'Other',
    'Todos': 'All',
    'Ver proyecto →': 'See project →',
    'Explorador 3D': '3D explorer',
    'Una maqueta 3D del computador: recorre las carpetas por niveles, abre la ficha de cada una y decide qué conservar o borrar.':
      'A 3D model of the computer: walk the folders level by level, open the card for each one and decide what to keep and what to throw out.',
    'Sistema de Vigilancia UAO': 'UAO Research Surveillance System',
    'Investigación · UAO': 'Research · UAO',
    'Proyecto interno de la UAO': 'Internal UAO project',
    'Sistema multiagente de IA para la vigilancia de la investigación científica en la Universidad Autónoma de Occidente, con su vocabulario controlado y ecuaciones de búsqueda para Scopus.':
      'A multi-agent AI system for scientific research surveillance at Universidad Autónoma de Occidente, with its own controlled vocabulary and search equations for Scopus.',
    'Asistente de escritorio': 'Desktop assistant',
    'Asistente personal para Windows con voz, un orbe que vive en la esquina de la pantalla y un HUD. Escucha, responde en voz alta y ejecuta tareas en el equipo.':
      'A personal assistant for Windows with voice, an orb that lives in the corner of the screen and a HUD. It listens, answers out loud and runs tasks on the machine.',
    'Terrario de civilizaciones': 'Terrarium of civilizations',
    'Un terrario de civilizaciones en 3D: sociedades que expanden fronteras, fundan ciudades, comercian y guerrean, mientras tú lanzas meteoritos, lluvias o pestes.':
      'A 3D terrarium of civilizations: societies push their borders, found cities, trade and go to war, while you throw down meteors, rain or plagues.',
    'Multiagente': 'Multi-agent',
    'Voz': 'Voice',
    'Simulación': 'Simulation',
    'Vista de Atlas de mi PC': 'A view of Atlas de mi PC',
    'Vista de Sistema de Vigilancia UAO': 'A view of the UAO Research Surveillance System',
    'Vista de Jarvis': 'A view of Jarvis',
    'Vista de Aquaria': 'A view of Aquaria',

    /* --- claves con contexto (data-i18n), para cadenas que se repiten --- */
    '#titulo-proyectos': 'Selected',
    'seleccionados.': 'projects.'
  };

  var LS = 'lang';
  var guardado = null;
  try { guardado = localStorage.getItem(LS); } catch (e) {}

  /* Los originales en espanol, guardados la primera vez que se traduce. */
  var ORIG = [], listo = false, idioma = 'es';

  function recorrer(nodo, fn) {
    var n, it = document.createTreeWalker(nodo, NodeFilter.SHOW_TEXT, {
      acceptNode: function (t) {
        var p = t.parentNode, tag = p && p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p && p.closest && p.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        return t.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while ((n = it.nextNode())) fn(n);
  }

  var ATRIBS = ['alt', 'title', 'aria-label', 'placeholder'];

  function indexar() {
    recorrer(document.body, function (t) { ORIG.push([t, t.nodeValue]); });
    var els = document.querySelectorAll('[alt],[title],[aria-label],[placeholder]');
    for (var i = 0; i < els.length; i++) {
      for (var j = 0; j < ATRIBS.length; j++) {
        var a = ATRIBS[j];
        if (els[i].hasAttribute(a)) ORIG.push([els[i], els[i].getAttribute(a), a]);
      }
    }
    var d = document.querySelector('meta[name=description]');
    ORIG.push([document, document.title, 'title']);
    if (d) ORIG.push([d, d.getAttribute('content'), 'content']);
    listo = true;
  }

  function traducir(txt, el) {
    var t = txt.trim();
    var clave = el && el.parentNode && el.parentNode.dataset && el.parentNode.dataset.i18n;
    if (clave && T['#' + clave]) return txt.replace(t, T['#' + clave]);
    if (!t || !T[t]) return null;
    return txt.replace(t, T[t]);
  }

  function aplicarA(lista, l) {
    for (var i = 0; i < lista.length; i++) {
      var o = lista[i], destino = o[0], es = o[1], attr = o[2];
      var val = es;
      if (l === 'en') {
        var tr = attr ? (T[es.trim()] ? es.replace(es.trim(), T[es.trim()]) : null)
                      : traducir(es, destino);
        if (tr) val = tr;
      }
      if (!attr) destino.nodeValue = val;
      else if (destino === document) document.title = val;
      else destino.setAttribute(attr, val);
    }
  }

  function aplicar(l) {
    if (!listo) { indexar(); vigilar(); }
    idioma = l;
    aplicarA(ORIG, l);
    document.documentElement.lang = l;
    var b = document.getElementById('langSw');
    if (b) {
      b.querySelector('[data-l=es]').setAttribute('aria-current', l === 'es');
      b.querySelector('[data-l=en]').setAttribute('aria-current', l === 'en');
    }
    document.documentElement.style.visibility = '';
  }

  function elegir(l) {
    try { localStorage.setItem(LS, l); } catch (e) {}
    aplicar(l);
  }

  var CSS = '\
#langSw{position:fixed;right:18px;bottom:58px;z-index:800;display:flex;border:1px solid rgba(242,242,239,.22);\
  background:rgba(43,45,48,.86);backdrop-filter:blur(6px);font-family:var(--f-mono,ui-monospace,"JetBrains Mono",monospace)}\
#langSw button{appearance:none;border:0;background:none;color:#A9ACAE;font:inherit;font-size:11px;letter-spacing:.14em;\
  padding:7px 11px;cursor:pointer}\
#langSw button+button{border-left:1px solid rgba(242,242,239,.22)}\
#langSw button:hover{color:#F2F2EF}\
#langSw button[aria-current=true]{background:#F28C28;color:#2B2D30}\
#langAsk{position:fixed;inset:0;z-index:900;background:#2B2D30;display:flex;flex-direction:column;\
  align-items:center;justify-content:center;gap:0;padding:24px;text-align:center}\
#langAsk .mono{font:400 11px/1 var(--f-mono,ui-monospace,"JetBrains Mono",monospace);letter-spacing:.26em;\
  text-transform:uppercase;color:#8C8F92}\
#langAsk h2{margin:17px 0 4px;font:300 34px/1.15 var(--f-sans,"Jost",sans-serif);color:#F2F2EF;letter-spacing:.01em}\
#langAsk h3{margin:0 0 29px;font:300 italic 25px/1.2 var(--f-serif,"Cormorant Garamond",serif);color:#A9ACAE}\
#langAsk .op{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}\
#langAsk .op button{appearance:none;cursor:pointer;background:none;color:#F2F2EF;border:1px solid rgba(242,242,239,.26);\
  padding:15px 31px;font:300 17px var(--f-sans,"Jost",sans-serif);letter-spacing:.04em;transition:background .15s,color .15s}\
#langAsk .op button:hover{background:#F28C28;border-color:#F28C28;color:#2B2D30}\
#langAsk .pie{margin-top:31px;font:400 11px var(--f-mono,ui-monospace,"JetBrains Mono",monospace);color:#8C8F92;letter-spacing:.08em}\
';

  function pintar() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

    var sw = document.createElement('div'); sw.id = 'langSw';
    sw.innerHTML = '<button type="button" data-l="es">ES</button><button type="button" data-l="en">EN</button>';
    sw.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (b) elegir(b.dataset.l);
    });
    document.body.appendChild(sw);

    if (guardado === 'es' || guardado === 'en') { aplicar(guardado); return; }

    aplicar('es');
    var ask = document.createElement('div'); ask.id = 'langAsk';
    ask.innerHTML = '<div class="mono">Enrique Christensen</div>' +
      '<h2>Elige idioma</h2><h3>Choose your language</h3>' +
      '<div class="op"><button type="button" data-l="es">Español</button>' +
      '<button type="button" data-l="en">English</button></div>' +
      '<div class="pie">Se puede cambiar abajo a la derecha · You can switch at the bottom right</div>';
    ask.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      elegir(b.dataset.l); ask.remove();
    });
    document.body.appendChild(ask);
    document.documentElement.style.visibility = '';
  }

  /* Si la pagina dibuja algo despues (las fichas al filtrar, por ejemplo),
     se indexa y se traduce tambien. */
  function vigilar() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (ms) {
      var nuevos = [];
      for (var i = 0; i < ms.length; i++)
        for (var j = 0; j < ms[i].addedNodes.length; j++) {
          var n = ms[i].addedNodes[j];
          if (n.nodeType === 1 && n.id !== 'langSw' && n.id !== 'langAsk') nuevos.push(n);
          else if (n.nodeType === 3) nuevos.push(n);
        }
      if (!nuevos.length) return;
      for (var k = 0; k < nuevos.length; k++) indexarNodo(nuevos[k]);
    }).observe(document.body, { childList: true, subtree: true });
  }

  function indexarNodo(n) {
    var trozo = [];
    function anota(t) { trozo.push([t, t.nodeValue]); }
    if (n.nodeType === 3) { if (n.nodeValue.trim()) anota(n); }
    else {
      recorrer(n, anota);
      var els = n.querySelectorAll ? n.querySelectorAll('[alt],[title],[aria-label],[placeholder]') : [];
      for (var i = 0; i < els.length; i++)
        for (var j = 0; j < ATRIBS.length; j++)
          if (els[i].hasAttribute(ATRIBS[j])) trozo.push([els[i], els[i].getAttribute(ATRIBS[j]), ATRIBS[j]]);
    }
    if (!trozo.length) return;
    ORIG = ORIG.concat(trozo);
    if (idioma === 'en') aplicarA(trozo, 'en');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pintar);
  else pintar();
})();
