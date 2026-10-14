/* Read-only view: records and permissions are supplied by the existing application. */
window.AuditMap = class AuditMap {
  constructor(host) {
    this.host = host;
    this.items = [];
    this.year = '';
    this.branch = null;
    this.selected = null;
    this.expanded = false;
    this.page = 0;
    this.cache = new Map();
    this.frame = 0;
    this.nodes = [];
    this.edges = [];
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.observer = new ResizeObserver(() => {
      const width = this.host.clientWidth;
      if (width && width !== this.width) { this.width = width; this.render(); }
    });
    this.observer.observe(host);
  }

  update(year, items) {
    const signature = JSON.stringify([year, items]);
    if (signature === this.signature) return;
    this.signature = signature;
    if (this.year !== year) {
      this.year = year; this.branch = null; this.expanded = false; this.page = 0; this.cache.clear();
    }
    this.items = items;
    if (!items.some(item => item.type === this.branch)) this.branch = null;
    if (!items.some(item => item.key === this.selected)) this.selected = null;
    this.render();
  }

  element(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  button(text, action) {
    const el = this.element('button', 'btn secondary small', text);
    el.type = 'button'; el.onclick = action;
    return el;
  }

  render() {
    cancelAnimationFrame(this.frame);
    if (!this.host.clientWidth || this.host.hidden) return;
    const focusKey = this.host.contains(document.activeElement) ? document.activeElement.dataset.mapKey : null;
    this.nodes = []; this.edges = []; this.dragging = null;
    this.host.replaceChildren();
    if (!this.items.length) {
      this.host.append(this.element('div', 'audit-map-empty', 'Seçili yıl ve filtrelere uygun denetim bulunamadı.'));
      return;
    }
    const toolbar = this.element('div', 'audit-map-toolbar');
    const path = this.element('div', 'audit-map-path', `${this.year}${this.branch ? ' › ' + this.branch : ''}`);
    path.setAttribute('aria-live', 'polite'); toolbar.append(path);
    if (this.branch) toolbar.append(this.button('Türlere dön', () => {
      this.branch = null; this.selected = null; this.page = 0; this.render();
      this.nodes.find(n => n.id.startsWith('type:'))?.el.focus();
    }));
    this.host.append(toolbar);
    const layout = this.element('div', 'audit-map-layout');
    this.stage = this.element('div', 'audit-map-stage');
    this.stage.setAttribute('role', 'group'); this.stage.setAttribute('aria-label', 'Yıl, denetim türleri ve denetimler');
    this.details = this.element('aside', 'audit-map-details'); this.details.setAttribute('aria-live', 'polite');
    layout.append(this.stage, this.details); this.host.append(layout);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('audit-map-links'); svg.setAttribute('aria-hidden', 'true'); this.stage.append(svg);
    this.svg = svg;
    const width = this.stage.clientWidth;
    const narrow = width < 520;
    const groups = [...new Set(this.items.map(item => item.type))].sort((a, b) => a.localeCompare(b, 'tr'));
    const children = this.items.filter(item => item.type === this.branch);
    const pages = Math.max(1, Math.ceil(children.length / 8));
    this.page = Math.min(this.page, pages - 1);
    const shown = children.slice(this.page * 8, this.page * 8 + 8);
    const gridTypes = groups.length > (narrow ? 3 : 6);
    const typeColumns = narrow ? 2 : 3;
    let height = 550;
    if (narrow && this.branch) height = 340 + Math.ceil(shown.length / 2) * 130;
    if (!this.branch && gridTypes) height = 240 + Math.ceil(groups.length / typeColumns) * 140;
    this.stage.style.height = height + 'px';
    const center = this.branch ? (narrow ? [width / 2, 75] : [width * .14, height / 2]) : [width / 2, gridTypes && this.expanded ? 75 : height / 2];
    const year = this.node('year', this.year, `${this.items.length} denetim`, center, 'root', () => {
      this.expanded = !this.expanded; this.branch = null; this.selected = null; this.render();
    }, null, this.expanded);
    if (this.expanded && !this.branch) {
      groups.forEach((type, i) => {
        const angle = -Math.PI / 2 + i * Math.PI * 2 / groups.length;
        const pos = !gridTypes
          ? [width / 2 + Math.cos(angle) * (width / 2 - 65), height / 2 + Math.sin(angle) * (height / 2 - 75)]
          : [width * ((i % typeColumns + .5) / typeColumns), 230 + Math.floor(i / typeColumns) * 140];
        this.node('type:' + type, type, `${this.items.filter(a => a.type === type).length} denetim`, pos, 'type', () => {
          this.branch = type; this.page = 0; this.selected = null; this.render();
        }, year, false);
      });
    }
    if (this.expanded && this.branch) {
      const type = this.node('type:' + this.branch, this.branch, `${children.length} denetim`, narrow ? [width / 2, 220] : [width * .40, height / 2], 'type', () => {
        this.branch = null; this.selected = null; this.render();
      }, year, true);
      shown.forEach((item, i) => {
        const rows = Math.ceil(shown.length / 2);
        const pos = narrow ? [width * (i % 2 ? .75 : .25), 365 + Math.floor(i / 2) * 130]
          : [width * (shown.length === 1 ? .78 : i % 2 ? .88 : .66), height * ((Math.floor(i / 2) + .5) / rows)];
        const n = this.node('audit:' + item.key, item.unit, `No ${item.no} · ${item.status}`, pos, 'audit', () => {
          this.selected = item.key;
          this.nodes.filter(n => n.kind === 'audit').forEach(n => n.el.setAttribute('aria-pressed', String(n.id === 'audit:' + item.key)));
          this.renderDetails();
        }, type);
        n.el.setAttribute('aria-pressed', String(this.selected === item.key));
        n.el.setAttribute('aria-label', `${item.unit}, ${item.scope}, No ${item.no}, ${item.status}: ayrıntıları göster`);
        n.el.title = `${item.unit}\n${item.scope}\n${item.status}`;
      });
    }
    if (this.branch && pages > 1) {
      const pager = this.element('div', 'audit-map-pagination');
      const change = delta => { this.page += delta; this.selected = null; this.render(); this.nodes.find(n => n.kind === 'audit')?.el.focus(); };
      const prev = this.button('Önceki', () => change(-1)); prev.disabled = this.page === 0;
      const next = this.button('Sonraki', () => change(1)); next.disabled = this.page === pages - 1;
      pager.append(prev, this.element('span', '', `${this.page * 8 + 1}–${Math.min((this.page + 1) * 8, children.length)} / ${children.length} denetim`), next);
      this.host.append(pager);
    }
    this.host.append(this.element('div', 'audit-map-hint', 'Balonları açmak için tıklayın, taşımak için sürükleyin. Üstteki yıl ve arama filtreleri haritaya da uygulanır.'));
    this.renderDetails();
    this.nodes.find(n => n.id === focusKey)?.el.focus({ preventScroll: true });
    this.animate();
  }

  renderDetails() {
    const item = this.items.find(item => item.key === this.selected && item.type === this.branch);
    this.details.replaceChildren();
    this.details.append(this.element('p', 'eyebrow', item ? 'Denetim ayrıntıları' : 'Denetim haritası'));
    this.details.append(this.element('h3', '', item ? item.unit : `${this.year} programı`));
    if (!item) {
      this.details.append(this.element('p', 'eyebrow', !this.expanded ? 'Yıla tıklayarak denetim türlerini açın.' : this.branch ? 'Bilgilerini görmek için bir denetim seçin.' : 'Bir denetim türü seçin.'));
      return;
    }
    const dl = this.element('dl');
    for (const [label, value] of [['Denetim no', `${this.year}/${item.no}`], ['Tür', item.type], ['Durum', item.status], ['Tarih aralığı', item.dates], ['Kapsam', item.scope], ['Denetim ekibi', item.team], ['Gözetim sorumlusu', item.supervisor]]) {
      dl.append(this.element('dt', '', label), this.element('dd', '', value || 'Belirtilmemiş'));
    }
    this.details.append(dl);
  }

  node(id, label, subtitle, pos, kind, action, parent, expanded) {
    const el = this.element('button', 'audit-map-node ' + kind); el.type = 'button'; el.dataset.mapKey = id;
    el.append(this.element('strong', '', label), this.element('small', '', subtitle));
    if (expanded !== undefined) el.setAttribute('aria-expanded', String(expanded));
    this.stage.append(el);
    const old = this.cache.get(id);
    const n = {id, kind, el, tx:pos[0], ty:pos[1], x:old?.x ?? parent?.x ?? pos[0], y:old?.y ?? parent?.y ?? pos[1], vx:0, vy:0, radius:el.offsetWidth / 2};
    this.nodes.push(n);
    if (parent) {
      const link = document.createElementNS('http://www.w3.org/2000/svg', 'line'); this.svg.append(link);
      this.edges.push({a:parent, b:n, el:link, length:Math.hypot(parent.tx-n.tx, parent.ty-n.ty)});
    }
    let moved = false, startX, startY, offsetX, offsetY;
    el.onpointerdown = event => {
      if (event.button !== 0) return;
      const box = this.stage.getBoundingClientRect();
      moved = false; startX = event.clientX; startY = event.clientY;
      offsetX = n.x - (startX-box.left); offsetY = n.y - (startY-box.top);
      this.dragging = n; el.setPointerCapture(event.pointerId);
    };
    el.onpointermove = event => {
      if (this.dragging !== n) return;
      moved ||= Math.hypot(event.clientX-startX, event.clientY-startY) > 5;
      if (!moved) return;
      const box = this.stage.getBoundingClientRect();
      n.x = event.clientX-box.left+offsetX; n.y = event.clientY-box.top+offsetY; n.vx = n.vy = 0;
      this.animate();
    };
    const release = () => { if (this.dragging === n) { this.dragging = null; this.animate(); } };
    el.onpointerup = release; el.onpointercancel = release; el.onlostpointercapture = release;
    el.onclick = event => { if (moved && event.detail !== 0) { moved = false; return; } action(); };
    return n;
  }

  animate() {
    cancelAnimationFrame(this.frame);
    let steps = 0;
    const tick = () => {
      if (!this.host.clientWidth || this.host.hidden) return;
      const w = this.stage.clientWidth, h = this.stage.clientHeight;
      for (const n of this.nodes) if (n !== this.dragging) { n.vx += (n.tx-n.x)*.015; n.vy += (n.ty-n.y)*.015; }
      for (const {a,b,length} of this.edges) {
        const dx=b.x-a.x, dy=b.y-a.y, d=Math.hypot(dx,dy)||1, f=(d-length)*.008;
        if(a!==this.dragging){a.vx+=dx/d*f;a.vy+=dy/d*f;}
        if(b!==this.dragging){b.vx-=dx/d*f;b.vy-=dy/d*f;}
      }
      for(let i=0;i<this.nodes.length;i++) for(let j=i+1;j<this.nodes.length;j++) {
        const a=this.nodes[i],b=this.nodes[j]; let dx=b.x-a.x,dy=b.y-a.y;
        if(Math.abs(dx)+Math.abs(dy)<.01){dx=.1;dy=.2;}
        const d=Math.hypot(dx,dy),gap=a.radius+b.radius+10,f=d<gap?(gap-d)*.14:55/(d*d);
        if(a!==this.dragging){a.vx-=dx/d*f;a.vy-=dy/d*f;}
        if(b!==this.dragging){b.vx+=dx/d*f;b.vy+=dy/d*f;}
      }
      let energy=0;
      for(const n of this.nodes) {
        if(n!==this.dragging){n.vx*=.76;n.vy*=.76;n.x+=n.vx;n.y+=n.vy;}
        n.x=Math.max(n.radius+5,Math.min(w-n.radius-5,n.x)); n.y=Math.max(n.radius+5,Math.min(h-n.radius-5,n.y));
        n.el.style.left=n.x+'px';n.el.style.top=n.y+'px';this.cache.set(n.id,{x:n.x,y:n.y});energy+=Math.abs(n.vx)+Math.abs(n.vy);
      }
      for(const {a,b,el} of this.edges){el.setAttribute('x1',a.x);el.setAttribute('y1',a.y);el.setAttribute('x2',b.x);el.setAttribute('y2',b.y);}
      if(!this.reduced.matches && (this.dragging || (++steps<240 && (energy>.1||steps<40))))this.frame=requestAnimationFrame(tick);
    };
    if(this.reduced.matches)for(const n of this.nodes)if(n!==this.dragging){n.x=n.tx;n.y=n.ty;n.vx=n.vy=0;}
    tick();
  }
};
