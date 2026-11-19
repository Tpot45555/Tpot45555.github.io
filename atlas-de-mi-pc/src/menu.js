/* Menu lateral del Atlas: la misma navegacion en la ciudad y en los procesos.
   Es un cajon que sale del borde izquierdo; la pestana vertical queda siempre
   a la vista. No sustituye a los controles de cada pagina: los acciona, asi que
   la logica de cada vista sigue igual. Uso: AtlasMenu.mount({current, groups}).
   Ademas guarda el tope de cuadros por segundo (30 o 60) y avisa al cambiarlo. */
(function () {
  const RAIL = 34, ANCHO = 290;
  const CSS = `
  body{padding-left:${RAIL}px;box-sizing:border-box}
  .amRail{position:fixed;left:0;top:0;bottom:0;width:${RAIL}px;z-index:70;background:var(--panel,#fff);
    border-right:1px solid var(--line,#cfd5d9);display:flex;flex-direction:column;align-items:center;gap:12px;padding-top:12px}
  .amTab{appearance:none;border:0;background:none;padding:10px 0;cursor:pointer;color:var(--ink,#1c2630);
    display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}
  .amTab:hover{background:#eceff0}
  .amBars{display:block;width:16px;height:12px;position:relative}
  .amBars i,.amBars:before,.amBars:after{content:'';position:absolute;left:0;right:0;height:2px;background:currentColor}
  .amBars:before{top:0} .amBars i{top:5px} .amBars:after{bottom:0}
  .amVert{writing-mode:vertical-rl;text-orientation:mixed;font:500 10px/1 var(--mono,ui-monospace,Consolas,monospace);
    letter-spacing:.22em;text-transform:uppercase;color:var(--muted,#65717c)}
  .amRail.open .amVert{color:var(--accent,#b4441f)}
  .amRail.open .amTab{background:var(--ink,#1c2630);color:#fff}
  .amRail.open .amVert{color:#b9c2c9}
  .amScrim{position:fixed;inset:0 0 0 ${RAIL}px;z-index:68;background:rgba(28,38,48,.14);display:none}
  .amRail.open~.amScrim{display:block}
  .amPanel{position:fixed;left:${RAIL}px;top:0;bottom:0;width:${ANCHO}px;z-index:69;background:#fff;
    border-right:1px solid var(--line,#cfd5d9);box-shadow:14px 0 34px rgba(28,38,48,.13);
    display:flex;flex-direction:column;overflow:auto;transform:translateX(-100%);visibility:hidden;
    transition:transform .17s ease,visibility .17s}
  .amRail.open~.amPanel{transform:none;visibility:visible}
  .amTit{padding:15px 16px 13px;border-bottom:1px solid var(--line,#cfd5d9)}
  .amTit b{display:block;font:500 15px/1.2 inherit;color:var(--ink,#1c2630)}
  .amTit span{display:block;margin-top:3px;font:400 11px var(--mono,ui-monospace,Consolas,monospace);color:var(--muted,#65717c)}
  .amSec{padding:13px 16px 5px;font:500 10px/1 var(--mono,ui-monospace,Consolas,monospace);
    letter-spacing:.11em;text-transform:uppercase;color:var(--muted,#65717c)}
  .amRule{height:1px;background:var(--line,#cfd5d9);margin:8px 0 0}
  .amIt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;
    border-left:3px solid transparent;padding:9px 16px 9px 13px;cursor:pointer;font:400 13.5px inherit;
    color:var(--ink,#1c2630);text-decoration:none}
  .amIt>span:nth-child(2){white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .amIt:hover{background:#eceff0}
  .amIt[aria-current=true],.amIt[aria-pressed=true]{border-left-color:var(--accent,#b4441f);font-weight:500}
  .amMk{width:8px;height:8px;flex:0 0 8px;border:1px solid var(--muted,#65717c)}
  .amIt[aria-current=true] .amMk,.amIt[aria-pressed=true] .amMk{background:var(--accent,#b4441f);border-color:var(--accent,#b4441f)}
  .amIt .amHint{margin-left:auto;white-space:nowrap;padding-left:10px;font:400 11px var(--mono,ui-monospace,Consolas,monospace);color:var(--muted,#65717c)}
  .amPie{margin-top:auto;padding:11px 16px;border-top:1px solid var(--line,#cfd5d9);
    font:400 11px/1.5 var(--mono,ui-monospace,Consolas,monospace);color:var(--muted,#65717c)}
  `;
  const SECCIONES = [
    { id: 'ciudad', label: 'La ciudad', href: '/', hint: 'disco' },
    { id: 'procesos', label: 'Administrador de tareas', href: '/procesos', hint: 'CPU' }
  ];

  /* tope de cuadros por segundo: 30 por defecto, 60 si el usuario lo pide */
  let fps = 30;
  try { if (localStorage.getItem('atlas.fps') === '60') fps = 60; } catch (e) {}
  window.ATLAS_FPS = fps;
  function setFps(v) {
    fps = v === 60 ? 60 : 30; window.ATLAS_FPS = fps;
    try { localStorage.setItem('atlas.fps', String(fps)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent('atlasfps', { detail: fps })); } catch (e) {}
  }

  function el(tag, cls, txt) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function mount(opt) {
    opt = opt || {};
    if (!document.getElementById('amCss')) {
      const st = el('style'); st.id = 'amCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    try { window.name = 'atlas-' + opt.current; } catch (e) {}
    const aqui = SECCIONES.find(s => s.id === opt.current);

    const rail = el('div', 'amRail');
    const tab = el('button', 'amTab');
    tab.type = 'button'; tab.setAttribute('aria-expanded', 'false');
    tab.setAttribute('aria-label', 'Menú del Atlas');
    const bars = el('span', 'amBars'); bars.appendChild(el('i'));
    tab.append(bars, el('span', 'amVert', 'Menú'));
    rail.appendChild(tab);

    const scrim = el('div', 'amScrim');
    const panel = el('div', 'amPanel');
    panel.setAttribute('role', 'menu');
    document.body.append(rail, scrim, panel);

    function fill() {
      panel.textContent = '';
      const tit = el('div', 'amTit');
      tit.append(el('b', null, 'Atlas de mi PC'), el('span', null, aqui ? aqui.label : ''));
      panel.appendChild(tit);

      panel.appendChild(el('div', 'amSec', 'Apartados'));
      for (const s of SECCIONES) {
        const a = el('a', 'amIt');
        a.href = s.href; a.setAttribute('role', 'menuitem');
        a.append(el('span', 'amMk'), el('span', null, s.label), el('span', 'amHint', s.hint));
        a.addEventListener('click', e => {
          e.preventDefault(); close();
          if (s.id === opt.current) return;
          window.open(s.href, 'atlas-' + s.id);        // cada apartado tiene su pestana; si ya esta abierta, la reutiliza
        });
        if (s.id === opt.current) a.setAttribute('aria-current', 'true');
        panel.appendChild(a);
      }

      for (const g of (opt.groups || [])) {
        const items = typeof g.items === 'function' ? g.items() : g.items;
        if (!items || !items.length) continue;
        panel.appendChild(el('div', 'amRule'));
        panel.appendChild(el('div', 'amSec', g.title));
        for (const it of items) {
          const b = el('button', 'amIt');
          b.type = 'button'; b.setAttribute('role', 'menuitem');
          b.append(el('span', 'amMk'), el('span', null, it.label));
          if (it.hint) b.append(el('span', 'amHint', it.hint));
          if (it.on) b.setAttribute('aria-pressed', 'true');
          b.addEventListener('click', () => { close(); try { it.run(); } catch (e) { console.error(e); } });
          panel.appendChild(b);
        }
      }

      panel.appendChild(el('div', 'amRule'));
      panel.appendChild(el('div', 'amSec', 'Fluidez'));
      for (const v of [30, 60]) {
        const b = el('button', 'amIt');
        b.type = 'button'; b.setAttribute('role', 'menuitem');
        b.append(el('span', 'amMk'), el('span', null, v + ' cuadros por segundo'),
                 el('span', 'amHint', v === 30 ? 'ahorra' : 'suave'));
        if (fps === v) b.setAttribute('aria-pressed', 'true');
        b.addEventListener('click', () => { setFps(v); fill(); });
        panel.appendChild(b);
      }
      panel.appendChild(el('div', 'amPie', fps === 60
        ? 'A 60 la vista va más suave y gasta más. Solo dibuja cuando algo se mueve.'
        : 'A 30 apenas se nota y gasta la mitad. Solo dibuja cuando algo se mueve.'));
    }
    function open() { fill(); rail.classList.add('open'); tab.setAttribute('aria-expanded', 'true'); }
    function close() { rail.classList.remove('open'); tab.setAttribute('aria-expanded', 'false'); }
    tab.addEventListener('click', e => { e.stopPropagation(); rail.classList.contains('open') ? close() : open(); });
    scrim.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return { open: open, close: close, el: rail };
  }

  window.AtlasMenu = {
    mount: mount, secciones: SECCIONES,
    fps: function () { return fps; },
    setFps: setFps,
    intervalo: function () { return fps === 60 ? 15 : 32; }   // ms minimos entre cuadros
  };
})();
