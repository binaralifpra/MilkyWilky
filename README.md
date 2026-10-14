# Milky Wilky

Website video anak seperti YouTube Kids: kartun, lagu anak, dongeng, dan pelajaran yang sudah dipilih, ditambah tiga mini game.

## Fitur

- **4 kategori video**: Kartun, Lagu Anak, Cerita, Pelajaran (47 video pilihan).
- **Pemutar video** dengan daftar video lain dari kategori yang sama.
- **Pencarian** yang hanya mencari di dalam daftar video pilihan, jadi anak tidak bisa menemukan video di luar daftar.
- **Favorit** dan **profil** (nama + avatar hewan), tersimpan di perangkat.
- **Mini games** dengan level dan 3 bantuan per level:
  - **Cari Perbedaan**: temukan 5 perbedaan, susunan perbedaannya acak setiap level.
  - **Temukan Kelinci**: tebak gelas berisi kelinci; makin tinggi level, makin cepat dan banyak acakannya.
  - **Memory Card**: cocokkan pasangan kartu hewan; jumlah kartu bertambah tiap level.

## Teknologi

HTML, CSS, dan JavaScript murni, tanpa build step dan **tanpa API key**.

- Video diputar dengan **YouTube embed** (`youtube-nocookie.com`, mode privasi, tanpa rekomendasi di akhir video).
- Thumbnail diambil dari `i.ytimg.com`.
- Semua ilustrasi (logo, ikon, hewan, gelas, pemandangan game) dibuat dengan SVG di `js/art.js`.

## Menambah video

Buka `js/videos.js`, lalu tambahkan baris baru:

```js
{"id": "ID_VIDEO", "cat": "lagu", "title": "Judul video", "channel": "Nama channel", "length": "3:20", "views": "1.000 x ditonton"},
```

`ID_VIDEO` adalah kode setelah `v=` pada URL YouTube. Pastikan video tersebut mengizinkan diputar di website lain (embed).

## Struktur

```
index.html      Satu halaman, navigasi lewat #/ (kategori, video, cari, favorit, games)
css/style.css   Seluruh tampilan
js/videos.js    Daftar video
js/art.js       Ilustrasi & ikon SVG
js/games.js     Tiga mini game
js/app.js       Router, halaman video, pencarian, favorit, menu, profil
```

## Menjalankan

```
python -m http.server
```

lalu buka http://localhost:8000. Bisa langsung di-hosting di GitHub Pages.
