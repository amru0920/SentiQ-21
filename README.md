# SentiQ 21 (versi web / PWA)

Aplikasi saringan kendiri kesihatan mental berasaskan **DASS-21**, dibina
semula sebagai laman web biasa (HTML + CSS + JavaScript) yang boleh dipasang
di telefon sebagai aplikasi (PWA).

Tiada framework, tiada `npm install`, tiada proses *build*. Buka `index.html`
melalui pelayan web, siap.

---

## 1. Cara jalankan di komputer

PWA perlu dihidangkan melalui pelayan (bukan klik dua kali pada fail), kerana
*service worker* tidak berfungsi pada `file://`.

```bash
python -m http.server 8777
```

Kemudian buka <http://127.0.0.1:8777/> dalam pelayar.

## 2. Cara naikkan ke internet

Mana-mana hosting statik boleh. Syarat penting: **mesti HTTPS**, barulah
"Install app" dan mod luar talian berfungsi.

| Pilihan | Cara |
| --- | --- |
| Netlify Drop | Seret seluruh folder projek ke <https://app.netlify.com/drop> |
| GitHub Pages | Push repo ini, Settings → Pages → pilih branch |
| Vercel | `vercel deploy` dari dalam folder projek |

Selepas naik, buka pautan di telefon → menu Chrome → **Add to Home screen**.
Ikon SentiQ 21 akan muncul di skrin utama dan aplikasi terbuka tanpa bar
pelayar.

## 3. Cara "Print PDF"

Butang **Print PDF** pada skrin Result membuka kotak dialog cetak pelayar.
Di situ pilih **Save as PDF** (Android dan komputer kedua-duanya ada pilihan
ini) — sama seperti versi asal aplikasi.

Reka letak laporan yang dicetak dikawal oleh bahagian `@media print` dalam
`css/styles.css`.

## 4. Supabase (pilihan)

Aplikasi berfungsi **sepenuhnya tanpa Supabase** — keputusan disimpan dalam
peranti pengguna sendiri. Supabase hanya menambah salinan dalam pangkalan
data supaya keputusan kekal walaupun tukar peranti.

Langkah:

1. Buat projek baharu di <https://supabase.com>.
2. Dashboard → **SQL Editor** → New query → tampal isi `supabase/schema.sql`
   → **Run**.
3. Dashboard → **Project Settings → API**, salin **Project URL** dan kunci
   **anon public**.
4. Isikan dalam `config.js`:

```js
window.SENTIQ_CONFIG = {
  SUPABASE_URL: 'https://xxxxxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOi...',
  SUPABASE_TABLE: 'dass_results',
};
```

Nota keselamatan:

- Kunci `anon` memang direka untuk didedahkan dalam kod web. **Jangan**
  letakkan kunci `service_role` di sini.
- Setiap peranti dapat satu `device_id` rawak. Dasar RLS dalam
  `schema.sql` hanya membenarkan sesuatu peranti membaca barisnya sendiri.
- Tiada nama, e-mel atau nombor telefon disimpan — barisnya tanpa nama.
- Jika peranti tiada internet, keputusan disimpan dahulu dan dihantar
  automatik apabila sambungan pulih.

## 5. Struktur fail

```
index.html              empat skrin: Home, DASS-21, Result, History
config.js               tetapan Supabase (kosong = mod luar talian)
manifest.webmanifest    nama, ikon dan warna aplikasi
sw.js                   service worker (mod luar talian)
css/styles.css          semua gaya, termasuk reka letak cetakan PDF
js/
├── data.js             21 penyataan DASS-21 + kumpulan subskala
├── scoring.js          pengiraan skor dan tahap keparahan
├── storage.js          sejarah dalam peranti (localStorage)
├── supabase.js         penyegerakan ke Supabase (pilihan)
├── printout.js         binaan laporan untuk dicetak
└── app.js              aliran skrin dan kawalan borang
icons/                  ikon aplikasi (dijana daripada logo)
supabase/schema.sql     jadual + dasar keselamatan
test/scoring.test.js    ujian pengiraan skor
tools/make_logo.py      skrip melukis logo + ikon
```

Itu sahaja fail projek ini. Tiada folder lain yang diperlukan.

## 6. Ujian

```bash
node test/scoring.test.js
```

Tujuh ujian, termasuk satu yang mengeluarkan semula contoh dalam laporan
inovasi (Depression 30, Anxiety 34, Stress 36 — semuanya *Extremely Severe*).

## 7. Pengiraan DASS-21

Setiap subskala ada 7 penyataan, dijawab 0–3. Jumlahnya **didarab dua**
kerana DASS-21 ialah versi pendek DASS-42. Skor maksimum setiap subskala
ialah 42.

| Tahap | Depression | Anxiety | Stress |
| --- | --- | --- | --- |
| Normal | 0–9 | 0–7 | 0–14 |
| Mild | 10–13 | 8–9 | 15–18 |
| Moderate | 14–20 | 10–14 | 19–25 |
| Severe | 21–27 | 15–19 | 26–33 |
| Extremely Severe | 28+ | 20+ | 34+ |

Soalan mengikut subskala:

- **Depression** — 3, 5, 10, 13, 16, 17, 21
- **Anxiety** — 2, 4, 7, 9, 15, 19, 20
- **Stress** — 1, 6, 8, 11, 12, 14, 18

## 8. Logo

Logo dilukis melalui skrip, bukan fail imej yang diedit tangan. Untuk
mengubahnya, sunting `tools/make_logo.py`, kemudian jalankan dari akar
projek:

```bash
python tools/make_logo.py   # tulis semula semua fail dalam icons/
```

Skrip ini perlukan Python dengan Pillow (`pip install pillow`). Ia hanya
digunakan bila nak ubah logo — aplikasi itu sendiri tidak perlukan Python.


## 9. Penafian

SentiQ 21 ialah **alat saringan**, bukan alat diagnosis. Keputusan tidak
menggantikan temu bual klinikal bersemuka. Pengguna yang mengalami tekanan
emosi yang ketara perlu berjumpa doktor atau profesional kesihatan mental.
