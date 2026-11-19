/* Menu desplegable del Atlas: la misma navegacion en la ciudad y en los procesos.
   No sustituye a los controles de cada pagina: los acciona, asi que la logica de
   cada vista sigue igual. Uso: AtlasMenu.mount({mount, current, groups}). */
(function () {
  const CSS = `
  .amWrap{position:relative;display:inline-block;font:inherit}
  .amBtn{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--line,#cfd5d9);background:#fff;
    border-radius:4px;padding:6px 11px;cursor:pointer;font:500 13px inherit;color:var(--ink,#1c2630)}
  .amBtn:hover{border-color:var(--muted,#65717c)}
  .amBtn[aria-expanded=true]{background:var(--ink,#1c2630);border-color:var(--ink,#1c2630);color:#fff}
  .amBtn .amHere{color:var(--muted,#65717c);font-weight:400}
  .amBtn[aria-expanded=true] .amHere{color:#b9c2c9}
  .amCar{width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;
    border-top:5px solid currentColor;opacity:.75}
  .amPanel{position:absolute;left:0;top:calc(100% + 6px);z-index:60;min-width:238px;background:#fff;
    border:1px solid var(--line,#cfd5d9);border-radius:4px;box-shadow:0 12px 30px rgba(28,38,48,.16);
    padding:6px 0;display:none}
  .amWrap.open .amPanel{display:block}
  .amSec{padding:9px 14px 4px;font:500 10px/1 var(--mono,ui-monospace,Consolas,monospace);
    letter-spacing:.11em;text-transform:uppercase;color:var(--muted,#65717c)}
  .amSec+.amSec{border-top:0}
  .amRule{height:1px;background:var(--line,#cfd5d9);margin:6px 0}
  .amIt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;
    border-left:3px solid transparent;padding:7px 14px 7px 11px;cursor:pointer;font:400 13.5px inherit;
    color:var(--ink,#1c2630);text-decoration:none}
  .amIt:hover{background:#eceff0}
  .amIt[aria-current=true],.amIt[aria-pressed=true]{border-left-color:var(--accent,#b4441f);font-weight:500}
  .amMk{width:8px;height:8px;flex:0 0 8px;border:1px solid var(--muted,#65717c)}
  .amIt[aria-current=true] .amMk,.amIt[aria-pressed=true] .amMk{background:var(--accent,#b4441f);border-color:var(--accent,#b4441f)}
  .amIt .amHint{margin-left:auto;font:400 11px var(--mono,ui-monospace,Consolas,monospace);color:var(--muted,#65717c)}
  `;
  const SECCIONES = [
    { id: 'ciudad', label: 'La ciudad', href: '/', hint: 'disco' },
    { id: 'procesos', label: 'Administrador de tareas', href: '/procesos', hint: 'CPU' }
  ];

  function el(tag, cls, txt) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function mount(opt) {
    if (!document.getElementById('amCss')) {
      const st = el('style'); st.id = 'amCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    try { window.name = 'atlas-' + opt.current; } catch (e) {}
    const wrap = el('div', 'amWrap');
    const btn = el('button', 'amBtn');
    btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-haspopup', 'true');
    const aqui = SECCIONES.find(s => s.id === opt.current);
    btn.append(el('span', null, 'Menú'), el('span', 'amHere', aqui ? '· ' + aqui.label : ''), el('span', 'amCar'));
    const panel = el('div', 'amPanel');
    panel.setAttribute('role', 'menu');
    wrap.append(btn, panel);
    (opt.mount || document.body).appendChild(wrap);

    function fill() {
      panel.textContent = '';
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
    }
    function open() { fill(); wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', e => { e.stopPropagation(); wrap.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return { open: open, close: close, el: wrap };
  }

  window.AtlasMenu = { mount: mount, secciones: SECCIONES };
})();
