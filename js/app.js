// Milky Wilky: router, halaman video, pencarian, favorit, menu, dan profil.

const CATS = [
  { id: 'kartun', name: 'Kartun' },
  { id: 'lagu', name: 'Lagu Anak' },
  { id: 'cerita', name: 'Cerita' },
  { id: 'pelajaran', name: 'Pelajaran' },
];
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const byId = Object.fromEntries(VIDEOS.map((v) => [v.id, v]));

/* ---------- penyimpanan lokal (favorit & profil) ---------- */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem('mw-' + k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('mw-' + k, JSON.stringify(v)); } catch { /* mode privat */ } },
};
const favs = () => store.get('favs', []);
const isFav = (id) => favs().includes(id);
function toggleFav(id) {
  const f = favs();
  const on = !f.includes(id);
  store.set('favs', on ? [id, ...f] : f.filter((x) => x !== id));
  toast(on ? 'Disimpan ke Favorit' : 'Dihapus dari Favorit');
  return on;
}
const profile = () => store.get('profile', { name: '', avatar: '' });

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- header ---------- */
function userButton() {
  const p = profile();
  const inner = p.avatar && ART.animals[p.avatar] ? `<span class="avatar">${ART.animals[p.avatar]}</span>` : ART.icon.user;
  return `<button class="tool user" data-act="profile" aria-label="Profil">${inner}</button>`;
}
const catButtons = (active) => `<nav class="cats" aria-label="Kategori">${CATS.map((c) =>
  `<a class="cat${c.id === active ? ' is-active' : ''}" href="#/kategori/${c.id}" title="${c.name}" aria-label="${c.name}">${ART.icon[c.id]}</a>`).join('')}</nav>`;

function renderHeader(mode, opts = {}) {
  const h = $('#header');
  const logo = `<a class="logo" href="#/" aria-label="Beranda Milky Wilky">${ART.logo}</a>`;
  const back = `<button class="back-btn" data-act="back" aria-label="Kembali">${ART.icon.back}</button>`;
  const search = `<form class="search" id="search" role="search"><input id="q" type="search" placeholder="Cari Video" aria-label="Cari video" value="${esc(opts.q || '')}" autocomplete="off"><button aria-label="Cari">${ART.icon.search}</button></form>`;
  const game = `<a class="tool${mode === 'games' ? ' is-active' : ''}" href="#/games" aria-label="Mini Games" title="Mini Games">${ART.icon.game}</a>`;
  const menu = `<button class="tool" data-act="menu" aria-label="Menu">${ART.icon.menu}</button>`;
  const searchToggle = `<button class="tool search-toggle" data-act="search" aria-label="Cari">${ART.icon.search}</button>`;

  if (mode === 'video') h.innerHTML = `<div class="wrap">${back}${catButtons(opts.cat)}${search}<div class="tools">${searchToggle}${game}${menu}${userButton()}</div></div>`;
  else if (mode === 'game') h.innerHTML = `<div class="wrap">${back}${logo}<div class="tools">${menu}${userButton()}</div></div>`;
  else h.innerHTML = `<div class="wrap">${logo}${search}<div class="tools">${searchToggle}${game}${menu}${userButton()}</div></div>`;
  h.className = 'header' + (mode === 'video' ? ' video' : '');

  const form = $('#search');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('#q').value.trim();
    location.hash = q ? '#/cari/' + encodeURIComponent(q) : '#/';
  });
}

/* ---------- kartu video ---------- */
const thumb = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
function card(v) {
  return `<article class="card" data-id="${v.id}">
    <a href="#/video/${v.id}">
      <div class="thumb"><img src="${thumb(v.id)}" alt="" loading="lazy"><span class="len">${esc(v.length)}</span>${isFav(v.id) ? `<span class="fav-dot" title="Favorit">${ART.icon.heart}</span>` : ''}</div>
    </a>
    <div class="card-body"><a class="card-title" href="#/video/${v.id}">${esc(v.title)}</a>
      <button class="kebab" data-act="more" aria-label="Pilihan lain">${ART.icon.more}</button></div>
  </article>`;
}
const grid = (list) => list.length ? `<div class="grid">${list.map(card).join('')}</div>` : '';

/* ---------- halaman ---------- */
function pageCategory(cat) {
  renderHeader('home');
  const list = VIDEOS.filter((v) => v.cat === cat);
  $('#app').innerHTML = catButtons(cat) + grid(list);
}

function pageSearch(q) {
  renderHeader('home', { q });
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const list = VIDEOS.filter((v) => words.every((w) => (v.title + ' ' + v.channel + ' ' + v.cat).toLowerCase().includes(w)));
  $('#app').innerHTML = catButtons() + `<h1 class="page-title">Hasil untuk "${esc(q)}"</h1>` +
    (list.length ? grid(list) : `<div class="empty"><b>Belum ada videonya</b>Coba kata lain, misalnya "lagu", "kancil", atau "nussa".</div>`);
}

function pageFavorites() {
  renderHeader('home');
  const list = favs().map((id) => byId[id]).filter(Boolean);
  $('#app').innerHTML = catButtons() + `<h1 class="page-title">Video Favorit</h1>` +
    (list.length ? grid(list) : `<div class="empty"><b>Belum ada favorit</b>Tekan tombol titik tiga pada video, lalu pilih "Simpan ke Favorit".</div>`);
}

const COLORS = ['#e2557b', '#ff9f43', '#4fa7ef', '#2ec4b6', '#9b6dde', '#5c9d4a'];
function pageVideo(id) {
  const v = byId[id];
  if (!v) { location.hash = '#/'; return; }
  renderHeader('video', { cat: v.cat });
  const others = VIDEOS.filter((x) => x.cat === v.cat && x.id !== v.id);
  const color = COLORS[[...v.channel].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
  const fav = isFav(v.id);
  $('#app').innerHTML = `
    <section class="player-page">
      <div class="player-main">
        <div class="player"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
        <div class="video-head">
          <span class="ch-avatar" style="background:${color}">${esc(v.channel.trim().charAt(0).toUpperCase())}</span>
          <h1>${esc(v.title)}<small>${esc(v.channel)}</small></h1>
          <button class="pill${fav ? ' is-on' : ''}" data-act="fav" data-id="${v.id}">${ART.icon.heart}<span>${fav ? 'Favorit' : 'Simpan'}</span></button>
        </div>
        <div class="desc"><b>${esc(v.views)}</b> · ${esc(CATS.find((c) => c.id === v.cat).name)} · ${esc(v.length)}<br>
          Video dari channel <b>${esc(v.channel)}</b>, diputar melalui YouTube.</div>
      </div>
      <aside class="side" aria-label="Video lainnya">${others.map(card).join('')}</aside>
    </section>`;
  window.scrollTo(0, 0);
}

function pageGames() {
  renderHeader('games');
  $('#app').innerHTML = `<div class="games">${GAMES.map((g) => `
    <a class="game-card" href="#/games/${g.id}"><div class="in"><span class="game-title">${g.title.replace(' ', '<br>')}</span>${ART.gameCard[g.id]}</div></a>`).join('')}</div>`;
}

function pageGame(id) {
  const g = GAMES.find((x) => x.id === id);
  if (!g) { location.hash = '#/games'; return; }
  renderHeader('game');
  return g.mount($('#app'));
}

/* ---------- router ---------- */
let cleanup = null;
function route() {
  if (typeof cleanup === 'function') cleanup();
  cleanup = null;
  closeAll();
  const [, a = '', b = ''] = location.hash.replace(/^#/, '').split('/');
  if (a === 'kategori' && CATS.some((c) => c.id === b)) pageCategory(b);
  else if (a === 'cari') pageSearch(decodeURIComponent(b));
  else if (a === 'video') pageVideo(b);
  else if (a === 'favorit') pageFavorites();
  else if (a === 'games' && b) cleanup = pageGame(b);
  else if (a === 'games') pageGames();
  else pageCategory('kartun');
}
window.addEventListener('hashchange', route);

/* ---------- menu (drawer) ---------- */
function openDrawer() {
  const d = $('#drawer');
  d.innerHTML = `<button class="x" data-act="close" aria-label="Tutup">${ART.icon.close}</button>
    <a href="#/">${ART.icon.home}Beranda</a>
    ${CATS.map((c) => `<a href="#/kategori/${c.id}">${ART.icon[c.id]}${c.name}</a>`).join('')}
    <hr><a href="#/games">${ART.icon.game}Mini Games</a>
    <a href="#/favorit">${ART.icon.heart}Video Favorit</a>
    <hr><button class="row" data-act="parents">${ART.icon.info}Untuk Orang Tua</button>`;
  d.classList.add('open');
  $('#overlay').classList.add('open');
}
function openModal(html) {
  $('#modal').innerHTML = html;
  $('#modal').classList.add('open');
  $('#overlay').classList.add('open');
}
function closeAll() {
  $('#drawer').classList.remove('open');
  $('#modal').classList.remove('open');
  $('#overlay').classList.remove('open');
  document.querySelectorAll('.popover').forEach((p) => p.remove());
}

function openProfile() {
  const p = profile();
  let pick = p.avatar || 'kelinci';
  openModal(`<h2>Profil</h2><p>Nama dan avatar ini hanya tersimpan di perangkat ini.</p>
    <label for="pname">Nama</label><input id="pname" maxlength="20" placeholder="Tulis namamu" value="${esc(p.name)}">
    <label>Pilih avatar</label><div class="avatars">${['kelinci', 'kucing', 'beruang', 'panda', 'gajah', 'katak', 'anakayam', 'babi'].map((a) =>
      `<button type="button" data-avatar="${a}" class="${a === pick ? 'is-on' : ''}" aria-label="${a}">${ART.animals[a]}</button>`).join('')}</div>
    <div class="actions"><button class="btn blue" data-act="close">Batal</button><button class="btn" data-act="save-profile">Simpan</button></div>`);
  $('#modal').querySelectorAll('[data-avatar]').forEach((b) => b.addEventListener('click', () => {
    pick = b.dataset.avatar;
    $('#modal').querySelectorAll('[data-avatar]').forEach((x) => x.classList.toggle('is-on', x === b));
  }));
  openProfile.getPick = () => pick;
}

/* ---------- klik global ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) {
    if (!e.target.closest('.popover')) document.querySelectorAll('.popover').forEach((p) => p.remove());
    return;
  }
  const act = el.dataset.act;
  if (act === 'back') history.length > 1 ? history.back() : (location.hash = '#/');
  else if (act === 'menu') openDrawer();
  else if (act === 'close') closeAll();
  else if (act === 'profile') openProfile();
  else if (act === 'save-profile') {
    const name = $('#pname').value.trim();
    store.set('profile', { name, avatar: openProfile.getPick() });
    closeAll();
    toast(name ? `Halo, ${name}!` : 'Profil disimpan');
    route();
  } else if (act === 'parents') {
    closeAll();
    openModal(`<h2>Untuk Orang Tua</h2>
      <p>Semua video di Milky Wilky dipilih satu per satu dari YouTube, jadi anak hanya bisa menonton video yang ada di daftar. Pencarian pun hanya mencari di dalam daftar tersebut.</p>
      <p style="margin-top:10px">Video diputar dengan mode privasi YouTube (youtube-nocookie) dan tanpa rekomendasi video lain di akhir tayangan. Favorit, profil, dan level game hanya tersimpan di perangkat ini.</p>
      <div class="actions"><button class="btn" data-act="close">Mengerti</button></div>`);
  } else if (act === 'search') {
    $('#search')?.classList.toggle('open');
    $('#q')?.focus();
  } else if (act === 'fav') {
    const on = toggleFav(el.dataset.id);
    el.classList.toggle('is-on', on);
    el.querySelector('span').textContent = on ? 'Favorit' : 'Simpan';
  } else if (act === 'more') {
    e.stopPropagation();
    document.querySelectorAll('.popover').forEach((p) => p.remove());
    const c = el.closest('.card');
    const id = c.dataset.id;
    const pop = document.createElement('div');
    pop.className = 'popover';
    pop.innerHTML = `<button data-act="pop-fav">${ART.icon.heart}${isFav(id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}</button>
      <button data-act="pop-share">${ART.icon.share}Salin tautan YouTube</button>`;
    c.appendChild(pop);
  } else if (act === 'pop-fav') {
    const c = el.closest('.card');
    const on = toggleFav(c.dataset.id);
    el.closest('.popover').remove();
    const t = c.querySelector('.thumb');
    const dot = t.querySelector('.fav-dot');
    if (on && !dot) t.insertAdjacentHTML('beforeend', `<span class="fav-dot" title="Favorit">${ART.icon.heart}</span>`);
    if (!on && dot) dot.remove();
    if (!on && location.hash === '#/favorit') route();
  } else if (act === 'pop-share') {
    const id = el.closest('.card').dataset.id;
    el.closest('.popover').remove();
    navigator.clipboard?.writeText('https://www.youtube.com/watch?v=' + id).then(() => toast('Tautan disalin'), () => toast('Gagal menyalin'));
  }
});
$('#overlay').addEventListener('click', closeAll);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

route();
