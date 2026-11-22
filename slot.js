/* ==========================================================
   INDEX 슬롯 카드 — 공용 렌더러 (entries.js 다음에 불러오기)
   IndexSlot.render(entry, { link, art, isNew })  → 카드 HTML
   IndexSlot.sealed(no)                         → 다음 기록 대기 카드
   ========================================================== */
(() => {
  const ENTRIES = (window.INDEX_ENTRIES || []).slice().sort((a, b) => a.no - b.no);
  const LOGO = window.INDEX_LOGO || '';
  const NEWEST = Math.max(0, ...ENTRIES.map(e => e.no));
  const pad = n => String(n).padStart(3, '0');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let uid = 0;

  function inkOn(hex) {
    const h = hex.replace('#', '');
    const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? '#17151a' : '#f7f4ee';
  }
  function vars(e) {
    const ac2 = e.accent2 || '#17151a';
    return `--ac:${e.accent};--ac2:${ac2};--ac2-ink:${inkOn(ac2)};`;
  }
  const kindEn = k => (k === 'personnel' ? 'PERSONNEL FILE' : 'SUBJECT FILE');
  const tabX = no => 5 + ((no - 1) % 4) * 22;

  /* 로고 도장 — INDEX_LOGO가 비어 있으면 임시 도장 */
  function stamp(e, sealed) {
    // 검정 로고를 SVG 필터로 캐릭터 색에 맞춰 칠함 (파일로 열어도 동작)
    if (LOGO && !sealed) {
      const h = (e.accent || '#17151a').replace('#', '');
      const [r, g, b] = [0, 2, 4].map(i => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3));
      const fid = 'lg' + (uid++);
      return `<div class="slot-stamp is-logo" aria-hidden="true"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <filter id="${fid}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 1 0"/></filter>
        <image href="${esc(LOGO)}" x="0" y="0" width="100" height="100" filter="url(#${fid})"/>
      </svg></div>`;
    }
    const id = 'stp' + (uid++);
    const ring = sealed ? 'PENDING ✦ AWAITING REVIEW ✦ INDEX-KR ✦ ' : `INDEX-KR ✦ REGISTERED ✦ ${esc(e.registered)} ✦ `;
    return `<div class="slot-stamp" aria-hidden="true"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs><path id="${id}" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/></defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text fill="currentColor" font-family="JetBrains Mono, monospace" font-weight="800" font-size="8.4" letter-spacing="1.6"><textPath href="#${id}">${ring}</textPath></text>
      <text x="50" y="47" text-anchor="middle" fill="currentColor" font-family="Anton, sans-serif" font-size="9" letter-spacing="1">${sealed ? 'NO.' : 'INDEX'}</text>
      <text x="50" y="65" text-anchor="middle" fill="currentColor" font-family="Anton, sans-serif" font-size="17">${pad(e.no)}</text>
    </svg></div>`;
  }

  function band(e, label) {
    const unit = `<span>${esc(label)}</span><span>✦</span><span>INDEX-KR</span><span>✦</span><span>${esc(kindEn(e.kind))}</span><span>✦</span>`;
    const run = unit.repeat(4);
    return `<footer class="slot-band">
      <div class="band-run"><div>${run}${run}</div><div class="band-cta">OPEN FILE <span>↗</span></div></div>
      <div class="band-file"><span>INDEX ARCHIVES</span><i class="barcode"></i><span>${esc(e.file)}</span></div>
    </footer>`;
  }

  function art(a, e) {
    if (!a) return '';
    if (a.cutout) {
      return `<figure class="slot-art cutout" style="--pos:${a.pos || '50% 100%'};--sc:${a.scale || 1}"><img src="${esc(a.src)}" alt="${esc(e.ko)}"></figure>`;
    }
    return `<figure class="slot-art framed${a.blend ? ' blend' : ''}"><img src="${esc(a.src)}" alt="${esc(e.ko)}" style="object-position:${a.pos || '50% 30%'}"></figure>`;
  }

  function render(e, opts = {}) {
    const a = opts.art || e.art[0];
    const tag = opts.link ? 'a' : 'div';
    const href = opts.link ? ` href="${esc(opts.link === true ? '#/' + e.id : opts.link)}"` : '';
    const en = e.en.toUpperCase();
    const enSize = Math.min(46, 190 / Math.max(en.length, 1));
    const chips = (e.chips || []).slice(0, 3).map(([k, v]) => `<li><small>${esc(k)}</small><span>${esc(v)}</span></li>`).join('');
    const isNew = opts.isNew ?? (opts.link && e.no === NEWEST);
    return `<${tag} class="slot${opts.cls ? ' ' + opts.cls : ''}" data-kind="${esc(e.kind)}" data-id="${esc(e.id)}"${href} style="${vars(e)}--tab-x:${tabX(e.no)}cqw;--en:${enSize}cqw" aria-label="No.${pad(e.no)} ${esc(e.ko)}">
      <div class="slot-inner">
        <div class="slot-tab"><small>No.</small>${pad(e.no)}</div>
        <div class="slot-paper">
          <header class="slot-meta"><b>INDEX-KR</b><span>${kindEn(e.kind)}</span><i></i><span>${esc(e.file)}</span></header>
          <div class="slot-en fill" aria-hidden="true">${esc(en)}</div>
          ${art(a, e)}
          ${a && a.cutout ? '' : `<div class="slot-en line" aria-hidden="true">${esc(en)}</div>`}
          <div class="slot-side">REG. <b>${esc(e.registered)}</b> — ${esc(e.chips?.[0]?.[1] || '')} — ${esc(en)}</div>
          ${isNew ? '<div class="slot-new">NEW</div>' : ''}
          <div class="slot-info">
            <p class="slot-kind">${esc(e.kindLabel)}</p>
            <h3 class="slot-ko">${esc(e.ko)}</h3>
            <p class="slot-epi">${esc(e.epithet)}</p>
            <ul class="slot-chips">${chips}</ul>
          </div>
          ${stamp(e)}
          ${band(e, en)}
        </div>
      </div>
    </${tag}>`;
  }

  function sealed(no) {
    const e = { no, file: 'PENDING-' + pad(no), kind: 'subject', accent: '#9a938a', accent2: '#17151a', registered: '----.--.--' };
    return `<div class="slot sealed" data-kind="sealed" style="${vars(e)}--tab-x:${tabX(no)}cqw;--en:31cqw" aria-label="다음 기록 대기 중">
      <div class="slot-inner">
        <div class="slot-tab"><small>No.</small>${pad(no)}</div>
        <div class="slot-paper">
          <header class="slot-meta"><b>INDEX-KR</b><span>NEXT ENTRY</span><i></i><span>${e.file}</span></header>
          <div class="slot-en fill" aria-hidden="true" style="color:rgba(23,21,26,.1)">SEALED</div>
          <div class="sealed-mark" aria-hidden="true">?</div>
          <div class="slot-side">REG. <b>PENDING</b> — CLASSIFIED</div>
          <div class="slot-info">
            <p class="slot-kind">INDEX 등록 심사 중</p>
            <h3 class="slot-ko">기록 대기</h3>
            <p class="slot-epi"><span class="redact" style="width:5.5em"></span></p>
            <ul class="slot-chips"><li><small>TYPE</small><span>▒▒</span></li><li><small>CLASS</small><span>▒▒</span></li><li><small>UNIT</small><span>▒▒</span></li></ul>
          </div>
          ${stamp(e, true)}
          ${band(e, 'CLASSIFIED')}
        </div>
      </div>
    </div>`;
  }

  window.IndexSlot = { ENTRIES, NEWEST, LOGO, render, sealed, vars, pad, esc, kindEn, inkOn };
})();
