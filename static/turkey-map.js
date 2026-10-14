(function (root) {
  'use strict';
  const provinces = root.TURKEY_MAP_DATA.provinces;
  const normalize = value => String(value || '').trim().toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  const prefixes = provinces.flatMap(p => [
    { prefix: normalize(p.name), name: p.name },
    ...(p.name === 'Afyonkarahisar' ? [{ prefix: 'afyon', name: p.name }] : []),
  ]).sort((a, b) => b.prefix.length - a.prefix.length);

  function classifyUnit(unit) {
    const name = normalize(unit);
    const match = prefixes.find(p => name.startsWith(p.prefix) && (!name[p.prefix.length] || /^[\s\-–—/('’.,:]/.test(name.slice(p.prefix.length))));
    return { area: match ? 'province' : 'central', province: match?.name || null };
  }
  function nonnegative(value) { const number = Number(value); return Number.isFinite(number) ? Math.max(0, number) : 0; }
  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  function metricValue(item, metric, date = today()) {
    if (metric === 'audits') return 1;
    const open = nonnegative(item.monitoring?.open);
    return metric === 'overdue' ? (item.monitoring?.dueDate && item.monitoring.dueDate < date ? open : 0) : open;
  }
  function groupRecords(items, metric = 'audits', date = today()) {
    const groups = new Map(provinces.map(p => [p.name, { items: [], value: 0 }]));
    const central = [];
    // A repeated record or the same unit's different audits must not distort counts.
    const seen = new Set();
    for (const item of items) {
      if (seen.has(item.key)) continue;
      seen.add(item.key);
      const place = classifyUnit(item.unit);
      if (!place.province) { central.push(item); continue; }
      const group = groups.get(place.province);
      group.items.push(item); group.value += metricValue(item, metric, date);
    }
    return { groups, central };
  }
  root.TurkeyGeography = { classifyUnit, groupRecords, metricValue };

  root.TurkeyMap = class TurkeyMap {
    constructor(host, options = {}) {
      this.host = host; this.options = options; this.items = []; this.selection = 'all'; this.selectedKey = null;
      this.metric = options.monitoring ? 'open' : 'audits'; this.label = '';
      this.render();
    }
    element(tag, className, text) {
      const el = document.createElement(tag); if (className) el.className = className;
      if (text !== undefined) el.textContent = text; return el;
    }
    button(text, action, className = 'btn secondary small') {
      const b = this.element('button', className, text); b.type = 'button'; b.onclick = action; return b;
    }
    update(label, items) {
      this.label = label; this.items = items;
      if (!items.some(item => item.key === this.selectedKey)) this.selectedKey = null;
      this.render();
    }
    select(value) {
      this.selection = value; this.selectedKey = null;
      this.paint(); this.renderDetails();
      this.provinceSelect.value = value;
    }
    metricLabel() { return { audits:'denetim', open:'açık bulgu', overdue:'süresi geçen açık bulgu' }[this.metric]; }
    render() {
      const focusedProvince = this.host.contains(document.activeElement) ? document.activeElement.dataset.geoProvince : null;
      this.host.replaceChildren();
      const toolbar = this.element('div', 'geo-toolbar');
      const label = this.element('label', '', 'Bölge / İl');
      this.provinceSelect = this.element('select'); this.provinceSelect.setAttribute('aria-label', 'Bölge veya il seç');
      [['all','Tüm kayıtlar'],['provincial','Taşra'],['central','Merkez'],...provinces.map(p => [p.name,p.name]).sort((a,b) => a[1].localeCompare(b[1],'tr'))].forEach(([value,name]) => {
        const option = this.element('option', '', name); option.value = value; this.provinceSelect.append(option);
      });
      this.provinceSelect.value = this.selection; this.provinceSelect.onchange = () => this.select(this.provinceSelect.value);
      label.append(this.provinceSelect); toolbar.append(label);
      if (this.options.monitoring) {
        const metricLabel = this.element('label', '', 'Harita rengi'); const select = this.element('select'); select.setAttribute('aria-label', 'Harita ölçütü');
        [['open','Açık bulgu sayısı'],['overdue','Süresi geçen açık bulgular'],['audits','Denetim sayısı']].forEach(([value,name]) => { const o = this.element('option','',name); o.value = value; select.append(o); });
        select.value = this.metric; select.onchange = () => { this.metric = select.value; this.paint(); this.renderDetails(); };
        metricLabel.append(select); toolbar.append(metricLabel);
      }
      toolbar.append(this.element('span','geo-period',this.label)); this.host.append(toolbar);
      const layout = this.element('div','geo-layout'); const mapArea = this.element('div','geo-map-area');
      this.hover = this.element('div','geo-hover','Bir ile tıklayarak denetimlerini görüntüleyin.'); mapArea.append(this.hover);
      const ns = 'http://www.w3.org/2000/svg'; const svg = document.createElementNS(ns,'svg');
      svg.setAttribute('viewBox',`0 0 ${root.TURKEY_MAP_DATA.width} ${root.TURKEY_MAP_DATA.height}`);
      svg.setAttribute('role','group'); svg.setAttribute('aria-label','Türkiye illeri: denetim ve izleme dağılımı'); svg.classList.add('geo-svg');
      this.paths = new Map();
      provinces.forEach(province => {
        const path = document.createElementNS(ns,'path'); path.setAttribute('d',province.path); path.setAttribute('fill-rule','evenodd'); path.setAttribute('tabindex','0'); path.setAttribute('role','button'); path.dataset.geoProvince = province.name;
        const title = document.createElementNS(ns,'title'); path.append(title);
        const activate = () => this.select(province.name);
        path.onclick = activate; path.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); } };
        path.onmouseenter = path.onfocus = () => { this.hover.textContent = path.getAttribute('aria-label'); };
        svg.append(path); this.paths.set(province.name,{path,title});
      });
      mapArea.append(svg); this.legend = this.element('div','geo-legend'); mapArea.append(this.legend);
      this.summary = this.element('div','geo-summary'); mapArea.append(this.summary);
      mapArea.append(this.element('p','geo-note','Birim adı il adıyla başlıyorsa taşra ve ilgili il, başlamıyorsa merkez olarak gösterilir.'));
      const credit = this.element('div','geo-credit'); credit.append(document.createTextNode('İl sınırları: '));
      const attribution = this.element('a','','© OpenStreetMap katkıcıları · ODbL'); attribution.href = 'https://www.openstreetmap.org/copyright'; attribution.target = '_blank'; attribution.rel = 'noopener noreferrer'; credit.append(attribution); mapArea.append(credit);
      this.details = this.element('aside','geo-details'); this.details.setAttribute('aria-live','polite');
      layout.append(mapArea,this.details); this.host.append(layout); this.paint(); this.renderDetails();
      this.paths.get(focusedProvince)?.path.focus({preventScroll:true});
    }
    paint() {
      this.grouped = groupRecords(this.items, this.metric);
      const values = [...this.grouped.groups.values()].map(g => g.value), max = Math.max(0,...values);
      for (const [name,{path,title}] of this.paths) {
        const group = this.grouped.groups.get(name);
        const level = group.value ? Math.max(1,Math.ceil(group.value / (max || 1) * 4)) : 0;
        path.setAttribute('class',`geo-province level-${level}${this.selection === name ? ' selected' : ''}`);
        path.setAttribute('aria-pressed',String(this.selection === name));
        const label = `${name}: ${group.items.length} denetim${this.metric !== 'audits' ? `, ${group.value} ${this.metricLabel()}` : ''}`;
        path.setAttribute('aria-label',label); title.textContent = label;
      }
      this.legend.replaceChildren();
      this.legend.append(this.element('span','','0'));
      for(let i=0;i<=4;i++) { const swatch=this.element('i',`geo-swatch level-${i}`); swatch.setAttribute('aria-hidden','true'); this.legend.append(swatch); }
      this.legend.append(this.element('span','',`${max} ${this.metricLabel()}`));
      const provincial = [...this.grouped.groups.values()].reduce((n,g)=>n+g.items.length,0);
      this.summary.replaceChildren();
      [['all',`Tümü · ${provincial+this.grouped.central.length}`],['provincial',`Taşra · ${provincial}`],['central',`Merkez · ${this.grouped.central.length}`]].forEach(([value,label])=>{
        const b=this.button(label,()=>this.select(value)); b.setAttribute('aria-pressed',String(this.selection===value)); this.summary.append(b);
      });
      if(this.paths.has(this.selection))this.hover.textContent=this.paths.get(this.selection).path.getAttribute('aria-label');
    }
    selectedItems() {
      if(this.selection==='central')return this.grouped.central;
      if(this.selection==='provincial')return [...this.grouped.groups.values()].flatMap(g=>g.items);
      if(this.selection==='all')return [...new Map(this.items.map(item=>[item.key,item])).values()];
      return this.grouped.groups.get(this.selection)?.items || [];
    }
    renderDetails() {
      const items=this.selectedItems(), item=items.find(i=>i.key===this.selectedKey);
      this.details.replaceChildren();
      const area={all:'Tüm kayıtlar',provincial:'Taşra',central:'Merkez'}[this.selection]||this.selection;
      this.details.append(this.element('p','eyebrow',area));
      if(!item){
        this.details.append(this.element('h3','',`${items.length} denetim`));
        if(this.options.monitoring)this.details.append(this.element('p','geo-total',`${items.reduce((n,i)=>n+metricValue(i,this.metric),0)} ${this.metricLabel()}`));
        if(!items.length){this.details.append(this.element('p','geo-note','Seçili yıl ve filtrelerde bu bölgeye ait kayıt bulunamadı.'));return;}
        const list=this.element('div','geo-records');
        items.forEach(i=>{const b=this.button('',()=>{this.selectedKey=i.key;this.renderDetails();},'geo-record');b.append(this.element('strong','',i.unit),this.element('span','',`${i.year}/${i.no} · ${i.type}`),this.element('span','',i.scope||'Kapsam belirtilmemiş'),this.element('small','',i.status));list.append(b);});
        this.details.append(list); return;
      }
      this.details.append(this.button('← Denetimlere dön',()=>{this.selectedKey=null;this.renderDetails();}));
      this.details.append(this.element('h3','',item.unit));
      const fields=[['Denetim',`${item.year}/${item.no}`],['Tür',item.type],['Durum',item.status],['Kapsam',item.scope],['Tarihler',item.dates],['Ekip',item.team],['Gözetim sorumlusu',item.supervisor]];
      if(item.monitoring)fields.push(['Toplam bulgu',item.monitoring.total],['Açık bulgu',item.monitoring.open],['İzleme son tarihi',item.monitoring.formattedDueDate],['İzleme sorumlusu',item.monitoring.officer]);
      const dl=this.element('dl'); fields.forEach(([label,value])=>dl.append(this.element('dt','',label),this.element('dd','',value===0?'0':String(value||'Belirtilmemiş'))));this.details.append(dl);
      if(this.options.canEdit?.(item))this.details.append(this.button(this.options.monitoring?'İzleme bilgilerini düzenle':'Denetimi düzenle',()=>this.options.onEdit?.(item)));
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
