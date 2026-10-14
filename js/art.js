// Semua ilustrasi dan ikon dibuat dengan SVG, jadi tidak perlu file gambar tambahan.

const ART = {};

ART.logo = `<svg viewBox="0 0 80 64" aria-hidden="true">
  <path d="M18 50c-9 0-14-6-14-13s6-12 12-12c1-9 9-16 19-16 8 0 15 5 17 12 1 0 2-1 4-1 8 0 13 6 13 13 0 9-6 17-15 17Z" fill="#fff" stroke="#3B6FB6" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="27" cy="33" r="3" fill="#2B3A55"/><circle cx="45" cy="33" r="3" fill="#2B3A55"/>
  <circle cx="22" cy="39" r="3.2" fill="#F7A8B8" opacity=".8"/><circle cx="50" cy="39" r="3.2" fill="#F7A8B8" opacity=".8"/>
  <path d="M31 39q5 4 10 0" fill="none" stroke="#2B3A55" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="50" y="40" width="26" height="20" rx="4" fill="#EF5B4C"/><path d="M60 45v10l8-5Z" fill="#fff"/>
</svg>`;

const ico = (body, fill = false) => `<svg viewBox="0 0 24 24" aria-hidden="true" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'}>${body}</svg>`;

ART.icon = {
  kartun: ico('<path d="M4 4l4 4.5A9 9 0 0 1 12 8a9 9 0 0 1 4 .5L20 4v9c0 4.4-3.6 7-8 7s-8-2.6-8-7Z"/><circle cx="9" cy="13" r="1.2" fill="currentColor"/><circle cx="15" cy="13" r="1.2" fill="currentColor"/><path d="M11 16h2"/>'),
  lagu: ico('<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  cerita: ico('<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3Z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7Z"/>'),
  pelajaran: ico('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/><path d="M12 7v3"/>'),
  search: ico('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
  game: ico('<path d="M7 7h10a5 5 0 0 1 4.6 7l-1.1 2.6a2.4 2.4 0 0 1-4 .5L15 15H9l-1.5 2.1a2.4 2.4 0 0 1-4-.5L2.4 14A5 5 0 0 1 7 7Z" fill="currentColor" stroke="none"/><path d="M7.5 10v3M6 11.5h3" stroke="#fff"/><circle cx="15.5" cy="10.5" r="1" fill="#fff" stroke="none"/><circle cx="17.5" cy="12.5" r="1" fill="#fff" stroke="none"/>'),
  menu: ico('<path d="M4 6h16M4 12h16M4 18h16" stroke-width="3"/>'),
  user: ico('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5" fill="currentColor"/><path d="M5.5 18.5c1.5-2.5 3.8-3.7 6.5-3.7s5 1.2 6.5 3.7" fill="currentColor"/>'),
  back: ico('<path d="M20 12H6M11 5l-7 7 7 7" stroke-width="3.2"/>'),
  more: ico('<circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>', true),
  heart: ico('<path d="M12 20s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8C20 15.4 12 20 12 20Z"/>'),
  close: ico('<path d="M6 6l12 12M18 6 6 18"/>'),
  home: ico('<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z"/>'),
  info: ico('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
  share: ico('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>'),
};

/* ---------- hewan (dipakai di kartu memori dan avatar profil) ---------- */
const face = (eyes = 'M-7 0', y = 0) => `<circle cx="-7" cy="${y}" r="3.2" fill="#2B3A55"/><circle cx="7" cy="${y}" r="3.2" fill="#2B3A55"/>
  <circle cx="-6" cy="${y - 1.2}" r="1" fill="#fff"/><circle cx="8" cy="${y - 1.2}" r="1" fill="#fff"/>`;
const smile = (y = 8) => `<path d="M-4 ${y}q4 4 8 0" fill="none" stroke="#2B3A55" stroke-width="2.2" stroke-linecap="round"/>`;
const blush = (y = 6) => `<ellipse cx="-13" cy="${y}" rx="4" ry="2.6" fill="#F7A8B8" opacity=".85"/><ellipse cx="13" cy="${y}" rx="4" ry="2.6" fill="#F7A8B8" opacity=".85"/>`;
const wrap = (inner) => `<svg viewBox="-50 -50 100 100" aria-hidden="true"><g>${inner}</g></svg>`;

ART.animals = {
  kelinci: wrap(`<ellipse cx="-11" cy="-30" rx="7" ry="20" fill="#fff" stroke="#C9CCD6" stroke-width="2"/><ellipse cx="11" cy="-30" rx="7" ry="20" fill="#fff" stroke="#C9CCD6" stroke-width="2"/>
    <ellipse cx="-11" cy="-28" rx="3" ry="13" fill="#F7B6C3"/><ellipse cx="11" cy="-28" rx="3" ry="13" fill="#F7B6C3"/>
    <ellipse cx="0" cy="26" rx="22" ry="18" fill="#fff" stroke="#C9CCD6" stroke-width="2"/>
    <circle cx="0" cy="2" r="22" fill="#fff" stroke="#C9CCD6" stroke-width="2"/>${face('', 0)}<path d="M-2 6h4l-2 2Z" fill="#F08DA2"/>${smile(9)}${blush(7)}`),
  gajah: wrap(`<circle cx="-24" cy="-2" r="17" fill="#A7B3C7"/><circle cx="24" cy="-2" r="17" fill="#A7B3C7"/><circle cx="-24" cy="-2" r="11" fill="#F2C4CE"/><circle cx="24" cy="-2" r="11" fill="#F2C4CE"/>
    <circle cx="0" cy="0" r="23" fill="#B9C4D6"/>${face('', -4)}<path d="M0 6c0 14-4 22 4 26" fill="none" stroke="#B9C4D6" stroke-width="10" stroke-linecap="round"/>${blush(4)}`),
  kucing: wrap(`<path d="M-22 -10-26 -34-6 -20Z M22 -10 26 -34 6 -20Z" fill="#F5A962"/><path d="M-21 -14-23 -28-11 -19Z M21 -14 23 -28 11 -19Z" fill="#F7C9A0"/>
    <circle cx="0" cy="2" r="25" fill="#F5A962"/><path d="M-6 -22l3 8M6 -22l-3 8M0 -23v8" stroke="#D9853D" stroke-width="3" stroke-linecap="round"/>${face('', 0)}<path d="M-2 6h4l-2 2Z" fill="#E86F8A"/>${smile(9)}
    <path d="M-12 8h-14M-12 12l-13 3M12 8h14M12 12l13 3" stroke="#B66C2C" stroke-width="1.6" stroke-linecap="round"/>`),
  beruang: wrap(`<circle cx="-19" cy="-19" r="9" fill="#A9744F"/><circle cx="19" cy="-19" r="9" fill="#A9744F"/><circle cx="-19" cy="-19" r="4.5" fill="#D9A77F"/><circle cx="19" cy="-19" r="4.5" fill="#D9A77F"/>
    <circle cx="0" cy="2" r="25" fill="#A9744F"/><ellipse cx="0" cy="10" rx="11" ry="8" fill="#E2BC97"/>${face('', -2)}<ellipse cx="0" cy="6" rx="3.5" ry="2.5" fill="#2B3A55"/>${smile(11)}`),
  katak: wrap(`<circle cx="-13" cy="-20" r="10" fill="#7BC97A"/><circle cx="13" cy="-20" r="10" fill="#7BC97A"/><circle cx="-13" cy="-20" r="6" fill="#fff"/><circle cx="13" cy="-20" r="6" fill="#fff"/>
    <circle cx="-13" cy="-20" r="3.2" fill="#2B3A55"/><circle cx="13" cy="-20" r="3.2" fill="#2B3A55"/><ellipse cx="0" cy="6" rx="27" ry="21" fill="#7BC97A"/>
    <path d="M-12 6q12 10 24 0" fill="none" stroke="#2B3A55" stroke-width="2.4" stroke-linecap="round"/>${blush(1)}`),
  anakayam: wrap(`<path d="M-4 -26q4-10 8 0" fill="#F6C343"/><circle cx="0" cy="4" r="25" fill="#FFD84D"/><path d="M-26 10q-8-4-6 6q6 2 8-2Z M26 10q8-4 6 6q-6 2-8-2Z" fill="#F6C343"/>
    ${face('', -2)}<path d="M-5 5h10l-5 6Z" fill="#F29A38"/>${blush(5)}`),
  babi: wrap(`<path d="M-24 -12-20 -32-6 -22Z M24 -12 20 -32 6 -22Z" fill="#F4A6B9"/><circle cx="0" cy="2" r="25" fill="#F7B8C7"/>${face('', -5)}
    <ellipse cx="0" cy="8" rx="10" ry="7" fill="#F08DA6"/><circle cx="-3.5" cy="8" r="1.8" fill="#B24E6A"/><circle cx="3.5" cy="8" r="1.8" fill="#B24E6A"/>`),
  panda: wrap(`<circle cx="-19" cy="-19" r="9" fill="#2B3A55"/><circle cx="19" cy="-19" r="9" fill="#2B3A55"/><circle cx="0" cy="2" r="25" fill="#fff" stroke="#C9CCD6" stroke-width="2"/>
    <ellipse cx="-9" cy="-1" rx="7" ry="9" fill="#2B3A55" transform="rotate(-20 -9 -1)"/><ellipse cx="9" cy="-1" rx="7" ry="9" fill="#2B3A55" transform="rotate(20 9 -1)"/>
    <circle cx="-8" cy="-1" r="2.6" fill="#fff"/><circle cx="8" cy="-1" r="2.6" fill="#fff"/><ellipse cx="0" cy="9" rx="3.5" ry="2.5" fill="#2B3A55"/>${smile(12)}`),
};

ART.star = `<svg viewBox="-50 -50 100 100" aria-hidden="true"><path d="M0-40 11.8-16.2 38-12.4 19-6 23.5 32.4 0 20.2-23.5 32.4-19-6-38-12.4-11.8-16.2Z" transform="translate(0 3)" fill="#FFC93C" stroke="#E8A317" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="-7" cy="0" r="2.6" fill="#7A4B12"/><circle cx="7" cy="0" r="2.6" fill="#7A4B12"/><path d="M-4 6q4 3 8 0" fill="none" stroke="#7A4B12" stroke-width="2" stroke-linecap="round"/></svg>`;

ART.cup = `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M22 112 34 14h52l12 98Z" fill="#1E74D6"/><path d="M34 14h52l2 14H32Z" fill="#3D8EEA"/>
  <ellipse cx="60" cy="14" rx="26" ry="6" fill="#1560B8"/><ellipse cx="60" cy="112" rx="38" ry="7" fill="#155FB5"/><path d="M44 30 38 96" stroke="#5BA3F0" stroke-width="5" stroke-linecap="round" opacity=".55"/></svg>`;

/* ---------- pemandangan peternakan untuk "Cari Perbedaan" ----------
   mods = Set perubahan yang diterapkan pada gambar kanan. */
ART.farm = (mods = new Set()) => {
  const has = (k) => mods.has(k);
  const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><circle cx="0" cy="0" r="9"/><circle cx="11" cy="-4" r="11"/><circle cx="23" cy="0" r="9"/><rect x="0" y="0" width="23" height="9"/></g>`;
  const tree = (x) => `<g transform="translate(${x} 0)"><rect x="-3" y="96" width="6" height="18" fill="#8B5A2B"/><circle cx="0" cy="88" r="13" fill="#3E9B4F"/><circle cx="-8" cy="96" r="9" fill="#3E9B4F"/><circle cx="8" cy="96" r="9" fill="#44A857"/></g>`;
  const hay = (x) => `<g transform="translate(${x} 128)"><path d="M-16 10q16-26 32 0Z" fill="#F2C94C"/><path d="M-10 6l4-8M0 4V-6M10 6 6-2" stroke="#D9A929" stroke-width="2"/></g>`;
  const fence = Array.from({ length: 9 }, (_, i) => (has('pagar') && (i === 2 || i === 3)) ? '' : `<rect x="${86 + i * 14}" y="104" width="5" height="18" rx="1" fill="#C0392B"/>`).join('');
  return `<svg viewBox="0 0 240 200" class="farm">
    <rect width="240" height="200" fill="#7CCBF2"/>
    ${has('matahari') ? '' : '<circle cx="190" cy="30" r="15" fill="#FFD43B"/>'}
    ${cloud(20, 28, .9)}${cloud(150, 40, .7)}${has('awan') ? '' : cloud(80, 18, .8)}${cloud(205, 70, .55)}
    <rect y="114" width="240" height="86" fill="#5DBB46"/>
    ${tree(18)}${has('pohon') ? '' : tree(40)}
    <rect x="86" y="108" width="128" height="4" fill="#C0392B"/><rect x="86" y="116" width="128" height="4" fill="#C0392B"/>${fence}
    <g transform="translate(96 46)">
      <path d="M0 30 34 6l34 24v54H0Z" fill="#D63A2F"/><path d="M-4 32 34 4l38 28" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
      ${has('jendela') ? '' : '<rect x="25" y="22" width="18" height="12" rx="2" fill="#BEE3F8" stroke="#fff" stroke-width="2"/><path d="M34 22v12M25 28h18" stroke="#fff" stroke-width="1.6"/>'}
      <rect x="20" y="52" width="28" height="32" fill="#A93226" stroke="#fff" stroke-width="2.5"/>
      ${has('pintu') ? '' : '<path d="M20 52l28 32M48 52 20 84" stroke="#fff" stroke-width="2.5"/>'}
    </g>
    <g transform="translate(206 86)">
      <path d="M-6 32 0 0l6 32Z" fill="#fff" stroke="#E9E4D8"/>
      <g fill="${has('kincir') ? '#4C9AFF' : '#F4C542'}"><path d="M0 0-3-26h6Z"/><path d="M0 0 26-3v6Z"/><path d="M0 0 3 26h-6Z"/><path d="M0 0-26 3v-6Z"/></g>
      <circle r="3.2" fill="#C0392B"/>
    </g>
    ${hay(70)}${has('jerami') ? '' : hay(206)}
    <g transform="translate(44 150)">
      <ellipse cx="0" cy="8" rx="20" ry="12" fill="#8C8F99"/><rect x="-14" y="14" width="5" height="14" fill="#6F737D"/><rect x="9" y="14" width="5" height="14" fill="#6F737D"/>
      <ellipse cx="-18" cy="-6" rx="10" ry="11" fill="#9FA3AD"/><path d="M-24-16-27-30-19-18Z M-13-16-10-30-18-18Z" fill="#7C808A"/>
      <circle cx="-21" cy="-8" r="1.6" fill="#2B3A55"/><circle cx="-15" cy="-8" r="1.6" fill="#2B3A55"/><ellipse cx="-18" cy="0" rx="6" ry="4" fill="#C9CCD3"/>
    </g>
    <g transform="translate(120 152)">
      <ellipse cx="0" cy="8" rx="18" ry="11" fill="#F4F1EA"/><rect x="-12" y="14" width="4" height="13" fill="#D5D0C4"/><rect x="8" y="14" width="4" height="13" fill="#D5D0C4"/>
      <ellipse cx="-14" cy="-6" rx="9" ry="10" fill="#E9E5DC"/><path d="M-20-14q-6-8-2-12M-9-14q6-8 2-12" fill="none" stroke="#A9A190" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="-17" cy="-7" r="1.6" fill="#2B3A55"/><circle cx="-11" cy="-7" r="1.6" fill="#2B3A55"/>
      <path d="M-22 2q8 5 16 0" fill="none" stroke="${has('kalung') ? '#2F80ED' : '#E74C3C'}" stroke-width="3"/>
    </g>
    <g transform="translate(182 154)">
      <ellipse cx="0" cy="8" rx="20" ry="12" fill="${has('sapi') ? '#fff' : '#9C5B2E'}"/>
      ${has('sapi') ? '<ellipse cx="-6" cy="4" rx="7" ry="5" fill="#8B4A23"/><ellipse cx="9" cy="11" rx="5" ry="4" fill="#8B4A23"/>' : ''}
      <rect x="-14" y="14" width="5" height="14" fill="${has('sapi') ? '#E5E0D6' : '#7D4520'}"/><rect x="9" y="14" width="5" height="14" fill="${has('sapi') ? '#E5E0D6' : '#7D4520'}"/>
      <ellipse cx="-18" cy="-6" rx="10" ry="10" fill="${has('sapi') ? '#fff' : '#A8653A'}"/><path d="M-26-12-31-18M-10-12-5-18" stroke="#E8D9B5" stroke-width="3" stroke-linecap="round"/>
      <circle cx="-21" cy="-8" r="1.6" fill="#2B3A55"/><circle cx="-15" cy="-8" r="1.6" fill="#2B3A55"/><ellipse cx="-18" cy="0" rx="6" ry="4" fill="#F4B6A6"/>
    </g>
    ${has('bunga') ? '<g transform="translate(150 186)"><circle r="4" fill="#FF7AB6"/><circle cx="5" r="4" fill="#FF7AB6"/><circle cx="2.5" cy="-4" r="4" fill="#FF7AB6"/><circle cx="2.5" cy="-1.3" r="2" fill="#FFD43B"/></g>' : ''}
  </svg>`;
};

/* Lokasi setiap perbedaan (koordinat viewBox 240x200) */
ART.farmDiffs = {
  matahari: { x: 190, y: 30, r: 18 },
  awan: { x: 92, y: 16, r: 16 },
  pohon: { x: 40, y: 94, r: 16 },
  jendela: { x: 130, y: 74, r: 13 },
  pintu: { x: 130, y: 114, r: 16 },
  kincir: { x: 206, y: 86, r: 22 },
  jerami: { x: 206, y: 132, r: 15 },
  kalung: { x: 106, y: 152, r: 12 },
  sapi: { x: 176, y: 156, r: 22 },
  pagar: { x: 120, y: 112, r: 15 },
  bunga: { x: 152, y: 184, r: 10 },
};

/* Ilustrasi kartu di halaman Mini Games */
ART.gameCard = {
  perbedaan: `<svg viewBox="0 0 160 130" aria-hidden="true"><g transform="translate(6 10) scale(.32)">${ART.farm().replace('<svg', '<svg width="240" height="200"')}</g>
    <g transform="translate(84 58) scale(.32)">${ART.farm(new Set(['matahari', 'sapi'])).replace('<svg', '<svg width="240" height="200"')}</g>
    <circle cx="150" cy="80" r="11" fill="none" stroke="#E53935" stroke-width="3"/><circle cx="66" cy="20" r="10" fill="none" stroke="#E53935" stroke-width="3"/></svg>`,
  kelinci: `<svg viewBox="0 0 160 130" aria-hidden="true"><g transform="translate(-2 46) scale(.6)">${ART.cup.replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(90 46) scale(.6)">${ART.cup.replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(80 100) scale(.5)">${ART.animals.kelinci.replace(/<\/?svg[^>]*>/g, '')}</g></svg>`,
  memori: `<svg viewBox="0 0 160 130" aria-hidden="true"><g transform="rotate(-10 60 70)"><rect x="30" y="26" width="58" height="80" rx="9" fill="#FFE7BF" stroke="#8D5A2B" stroke-width="3"/><g transform="translate(59 66) scale(.42)"><path d="M0-40 11.8-16.2 38-12.4 19-6 23.5 32.4 0 20.2-23.5 32.4-19-6-38-12.4-11.8-16.2Z" fill="#E5533D" stroke="#9C2F1F" stroke-width="4"/></g></g>
    <g transform="rotate(8 104 70)"><rect x="74" y="30" width="58" height="80" rx="9" fill="#FFE7BF" stroke="#8D5A2B" stroke-width="3"/><g transform="translate(103 70) scale(.5)">${ART.star.replace(/<\/?svg[^>]*>/g, '')}</g></g></svg>`,
};
