// Tiga mini game Milky Wilky. Setiap game punya level yang makin sulit dan 3 bantuan (kaca pembesar) per level.
// mount(el) menggambar game ke dalam el dan mengembalikan fungsi pembersih (dipanggil saat pindah halaman).

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const getLevel = (id) => { try { return Math.max(1, +localStorage.getItem('mw-lvl-' + id) || 1); } catch { return 1; } };
const setLevel = (id, n) => { try { localStorage.setItem('mw-lvl-' + id, n); } catch { /* abaikan */ } };
const HINTS = 3;

function shell(el, title) {
  el.innerHTML = `<section class="board-wrap">
    <div class="board-top"><h1>${title}</h1>
      <div class="hint"><span class="hint-n">${HINTS}/${HINTS}</span><button class="hint-btn" aria-label="Bantuan">${ART.icon.search}</button></div></div>
    <div class="board"><span class="level"></span><div class="stage"></div></div>
  </section>`;
  const r = {
    board: el.querySelector('.board'), stage: el.querySelector('.stage'), level: el.querySelector('.level'),
    hintN: el.querySelector('.hint-n'), hintBtn: el.querySelector('.hint-btn'), hints: HINTS,
    setHints(n) { r.hints = n; r.hintN.textContent = `${n}/${HINTS}`; r.hintBtn.disabled = n <= 0; },
  };
  return r;
}

function win(board, { title = 'Hebat!', text, next, retry }) {
  const w = document.createElement('div');
  w.className = 'win';
  w.innerHTML = `<div><div class="stars">${ART.star}${ART.star}${ART.star}</div><h2>${title}</h2><p>${text}</p>
    <div class="actions">${retry ? '<button class="btn blue" data-w="retry">Main Lagi</button>' : ''}<button class="btn" data-w="next">Level Berikutnya</button></div></div>`;
  board.appendChild(w);
  w.querySelector('[data-w="next"]').onclick = () => { w.remove(); next(); };
  w.querySelector('[data-w="retry"]')?.addEventListener('click', () => { w.remove(); retry(); });
}

/* ================= 1. Cari Perbedaan ================= */
function mountPerbedaan(el) {
  const ui = shell(el, 'Temukan 5 perbedaan dalam gambar tersebut!');
  let level = getLevel('perbedaan');
  let diffs, found, hinted;

  function round() {
    diffs = shuffle(Object.keys(ART.farmDiffs)).slice(0, 5);
    found = new Set(); hinted = new Set();
    ui.level.textContent = `Level ${level}`;
    ui.setHints(HINTS);
    ui.stage.innerHTML = `<div class="diff"><div class="scene">${ART.farm()}</div><div class="scene">${ART.farm(new Set(diffs))}</div></div>
      <div class="found"><span>Perbedaan ditemukan <b class="fn">0</b>/5</span></div>`;
    ui.stage.querySelectorAll('.scene').forEach((s) => s.addEventListener('click', onClick));
  }

  function mark(key, cls = '') {
    const d = ART.farmDiffs[key];
    ui.stage.querySelectorAll('.scene').forEach((s) => {
      s.querySelector(`.mark[data-k="${key}"]`)?.remove();
      s.insertAdjacentHTML('beforeend', `<span class="mark ${cls}" data-k="${key}" style="left:${d.x / 240 * 100}%;top:${d.y / 200 * 100}%;width:${d.r * 2.2 / 240 * 100}%"></span>`);
    });
  }

  function onClick(e) {
    const s = e.currentTarget, b = s.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width * 240, y = (e.clientY - b.top) / b.height * 200;
    const hit = diffs.find((k) => !found.has(k) && Math.hypot(ART.farmDiffs[k].x - x, ART.farmDiffs[k].y - y) <= ART.farmDiffs[k].r + 6);
    if (hit) {
      found.add(hit); mark(hit);
      ui.stage.querySelector('.fn').textContent = found.size;
      if (found.size === diffs.length) setTimeout(() => win(ui.board, { text: `Kamu menemukan semua perbedaan di level ${level}.`, next: () => { setLevel('perbedaan', ++level); round(); } }), 500);
    } else {
      const m = document.createElement('span');
      m.className = 'miss'; m.textContent = '×';
      m.style.left = (e.clientX - b.left) + 'px'; m.style.top = (e.clientY - b.top) + 'px';
      s.appendChild(m); setTimeout(() => m.remove(), 700);
    }
  }

  ui.hintBtn.onclick = () => {
    const left = diffs.filter((k) => !found.has(k) && !hinted.has(k));
    if (!left.length || ui.hints <= 0) return;
    const k = left[Math.floor(Math.random() * left.length)];
    hinted.add(k); mark(k, 'hinted'); ui.setHints(ui.hints - 1);
  };
  round();
}

/* ================= 2. Temukan Kelinci ================= */
function mountKelinci(el) {
  const ui = shell(el, 'Temukan kelinci yang ada di dalam gelas!');
  let level = getLevel('kelinci');
  let slots, bunny, phase, alive = true;
  const X = [17, 50, 83];

  ui.stage.innerHTML = `<div class="shell">${[0, 1, 2].map((i) => `<div class="cupbox" data-i="${i}"><div class="bunny">${ART.animals.kelinci}</div><div class="c">${ART.cup}</div></div>`).join('')}</div>
    <p class="status"></p><div class="actions"><button class="btn start">Mulai!</button></div>`;
  const boxes = [...ui.stage.querySelectorAll('.cupbox')];
  const status = ui.stage.querySelector('.status');
  const startBtn = ui.stage.querySelector('.start');
  const shellEl = ui.stage.querySelector('.shell');

  const place = (dur = 350) => boxes.forEach((b, i) => { b.style.transitionDuration = dur + 'ms'; b.style.left = `calc(${X[slots[i]]}% - ${b.offsetWidth / 2}px)`; });

  function round() {
    slots = [0, 1, 2]; bunny = Math.floor(Math.random() * 3); phase = 'ready';
    ui.level.textContent = `Level ${level}`; ui.setHints(HINTS); ui.hintBtn.disabled = true;
    boxes.forEach((b, i) => { b.className = 'cupbox' + (i === bunny ? ' show up' : ''); });
    place(0);
    status.textContent = 'Lihat baik-baik di mana kelincinya!';
    startBtn.textContent = 'Mulai!'; startBtn.hidden = false;
    shellEl.classList.add('locked');
  }

  async function play() {
    startBtn.hidden = true; phase = 'shuffle';
    boxes[bunny].classList.remove('up');
    await wait(500); if (!alive) return;
    boxes[bunny].classList.remove('show');
    status.textContent = 'Gelas sedang diacak...';
    const swaps = Math.min(4 + level * 2, 24), speed = Math.max(170, 520 - level * 40);
    for (let n = 0; n < swaps; n++) {
      const [a, b] = shuffle([0, 1, 2]);
      [slots[a], slots[b]] = [slots[b], slots[a]];
      place(speed);
      await wait(speed + 60); if (!alive) return;
    }
    phase = 'pick'; shellEl.classList.remove('locked'); ui.hintBtn.disabled = ui.hints <= 0;
    status.textContent = 'Di gelas mana kelincinya?';
  }

  boxes.forEach((b, i) => b.addEventListener('click', async () => {
    if (phase !== 'pick') return;
    phase = 'done'; shellEl.classList.add('locked'); ui.hintBtn.disabled = true;
    b.classList.add('up');
    if (i === bunny) {
      b.classList.add('show'); status.textContent = 'Ketemu!';
      await wait(700); if (!alive) return;
      win(ui.board, { text: `Kelinci ditemukan di level ${level}.`, next: () => { setLevel('kelinci', ++level); round(); } });
    } else {
      await wait(500); if (!alive) return;
      boxes[bunny].classList.add('up', 'show');
      status.textContent = 'Yah, kelincinya ada di sini. Coba lagi ya!';
      startBtn.textContent = 'Coba Lagi'; startBtn.hidden = false;
      startBtn.onclick = () => { startBtn.onclick = play; round(); };
    }
  }));
  startBtn.onclick = play;
  ui.hintBtn.onclick = () => {
    if (phase !== 'pick' || ui.hints <= 0) return;
    ui.setHints(ui.hints - 1);
    boxes[bunny].classList.remove('wiggle'); void boxes[bunny].offsetWidth; boxes[bunny].classList.add('wiggle');
  };
  const onResize = () => place(0);
  window.addEventListener('resize', onResize);
  round();
  return () => { alive = false; window.removeEventListener('resize', onResize); };
}

/* ================= 3. Memory Card ================= */
function mountMemori(el) {
  const ui = shell(el, 'Temukan dua kartu yang sama hingga semua kartu terbuka!');
  let level = getLevel('memori');
  let open, lock, moves, timer;
  const NAMES = Object.keys(ART.animals);

  function round() {
    const pairs = Math.min(1 + level, NAMES.length);
    const deck = shuffle([...shuffle(NAMES).slice(0, pairs), ...[]].flatMap((n) => [n, n]));
    let cols = deck.length <= 8 ? deck.length / 2 : Math.ceil(deck.length / 2);
    if (window.innerWidth < 641) cols = Math.min(cols, 4);
    open = []; lock = false; moves = 0;
    ui.level.textContent = `Level ${level}`; ui.setHints(HINTS);
    ui.stage.innerHTML = `<div class="mem" style="grid-template-columns:repeat(${cols}, auto)">${deck.map((n) =>
      `<button class="mcard" data-n="${n}" aria-label="Kartu"><div class="flip"><div class="face back">${ART.star}</div><div class="face front">${ART.animals[n]}</div></div></button>`).join('')}</div>`;
    ui.stage.querySelectorAll('.mcard').forEach((c) => c.addEventListener('click', () => flip(c)));
  }

  function flip(c) {
    if (lock || c.classList.contains('open') || c.classList.contains('done')) return;
    c.classList.add('open'); open.push(c);
    if (open.length < 2) return;
    moves++;
    const [a, b] = open; open = [];
    if (a.dataset.n === b.dataset.n) {
      a.classList.add('done'); b.classList.add('done');
      if (!ui.stage.querySelector('.mcard:not(.done)')) setTimeout(() => win(ui.board, { text: `Selesai dalam ${moves} langkah.`, next: () => { setLevel('memori', ++level); round(); }, retry: round }), 600);
    } else {
      lock = true;
      timer = setTimeout(() => { a.classList.remove('open'); b.classList.remove('open'); lock = false; }, 850);
    }
  }

  ui.hintBtn.onclick = () => {
    if (lock || ui.hints <= 0) return;
    ui.setHints(ui.hints - 1); lock = true;
    const closed = [...ui.stage.querySelectorAll('.mcard:not(.done):not(.open)')];
    closed.forEach((c) => c.classList.add('open'));
    timer = setTimeout(() => { closed.forEach((c) => c.classList.remove('open')); lock = false; }, 1300);
  };
  round();
  return () => clearTimeout(timer);
}

const GAMES = [
  { id: 'perbedaan', title: 'Cari Perbedaan', mount: mountPerbedaan },
  { id: 'kelinci', title: 'Temukan Kelinci', mount: mountKelinci },
  { id: 'memori', title: 'Memory Card', mount: mountMemori },
];
