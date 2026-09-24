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

Laman rasmi sekarang: **<https://sentiq-21.pages.dev/>** (Cloudflare Pages,
disambung terus ke repo GitHub ini — setiap kali push ke `main`, Cloudflare
akan terbitkan versi baharu secara automatik).

Pilihan lain kalau perlu: Netlify Drop, GitHub Pages atau Vercel.

Selepas naik, buka pautan di telefon dan tekan **Install on your phone** pada
skrin Home — lihat seksyen 4.

## 3. Pasang di telefon

Skrin Home ada butang **Install on your phone** yang buka panduan langkah
demi langkah, dengan tab berasingan untuk Android dan iPhone/iPad.

| Peranti | Apa yang berlaku |
| --- | --- |
| Android (Chrome) | Chrome bagi API `beforeinstallprompt`, jadi butang hijau **Install now** muncul dan terus buka dialog pasang. Langkah manual tetap dipapar sebagai sandaran. |
| iPhone / iPad (Safari) | Safari **tiada** API pemasangan langsung. Tiada cara automatik — pengguna mesti buat sendiri: Share → Add to Home Screen. Sebab itu panduan bergambar ini wujud. |

Logik pemilihan tab automatik dan pengesanan peranti ada dalam
`js/install.js`.

Dua keadaan yang dikendalikan:

- **Pelayar dalam app lain** (pautan dibuka terus dari WhatsApp, Instagram,
  Facebook, TikTok) — tiada apa boleh dipasang di situ, jadi satu amaran
  muncul menyuruh pengguna pilih "Open in browser" dahulu. Ini penting sebab
  kebanyakan orang akan terima pautan SentiQ 21 melalui WhatsApp.
- **App sudah dipasang** — butang Install terus disembunyikan.

## 4. Bahasa

Aplikasi ini ada dalam **empat bahasa**: Bahasa Melayu, English, தமிழ் dan
中文. Penukar bahasa ada di bahagian atas skrin Home.

- **Kali pertama app dibuka**, satu popup muncul menyuruh pengguna pilih
  bahasa. Ia hanya muncul sekali — selepas pengguna pilih, ia tidak muncul
  lagi. Penukar bahasa di atas skrin Home kekal untuk tukar kemudian.
- Bahasa yang ditanda dahulu dalam popup mengikut tetapan bahasa pelayar
  pengguna; kalau tiada yang padan, **Bahasa Melayu** digunakan.
- Pilihan pengguna disimpan dalam peranti, jadi ia kekal selepas tutup app.
- Keputusan yang disimpan **tidak terikat** kepada bahasa. Skor disimpan
  sebagai jawapan mentah, jadi keputusan lama akan dipapar dalam bahasa yang
  sedang dipilih.
- Dalam Supabase, tahap keparahan sentiasa disimpan dalam **Bahasa
  Inggeris** supaya data boleh dibandingkan antara peranti.

Semua teks ada dalam satu fail, `js/i18n.js`. Untuk mengubah ayat, cari
kuncinya (contoh `home.start`, `q13`, `severity.severe`) dan sunting keempat-empat
bahasa. Ujian akan gagal kalau ada kunci tertinggal dalam mana-mana bahasa.

Untuk menambah bahasa kelima: tambah satu entri dalam `LANGS`, satu jadual
dalam `DICT`, dan satu set langkah dalam `STEPS` — itu sahaja.

> **Nota terjemahan DASS-21.** Terjemahan 21 penyataan dalam app ini adalah
> terjemahan makna daripada teks Inggeris yang digunakan oleh app asal. DASS-21
> ada versi rasmi yang telah disahkan secara psikometrik (contohnya versi
> Bahasa Melayu oleh Musa, Fadzil & Zain, 2007). Untuk kegunaan klinikal atau
> penyelidikan sebenar, versi rasmi yang bertauliah patut digunakan dan ayat
> dalam `js/i18n.js` digantikan dengannya.

Label butang dalam panduan pemasangan (`Menu`, `Install`, `Share`,
`Add to Home Screen`) sengaja dikekalkan dalam Bahasa Inggeris untuk semua
bahasa, kerana itulah yang tertera pada kebanyakan telefon di Malaysia.

## 5. Cadangan dan langkah susulan

Selepas skor dipaparkan, app memberi cadangan yang **dipadankan dengan skor**
pengguna. Ada tiga bahagian:

1. **Satu ayat langkah seterusnya**, berdasarkan subskala yang **paling teruk**
   (bukan purata — satu skor `Severe` tetap perlu ditangani walaupun dua lagi
   normal).
2. **Satu kad bagi setiap subskala**, disusun daripada paling teruk ke paling
   ringan. Setiap kad ada ringkasan mengikut tahap, dan 5 langkah praktikal.
3. **Blok talian bantuan**, muncul hanya apabila perlu.

Semua ini juga dimasukkan ke dalam PDF yang dicetak, supaya pengguna boleh
bawa helaian itu berjumpa kaunselor.

### Nada mengikut tahap

Jumlahnya **15 kombinasi** (3 subskala × 5 tahap). Nada berubah secara sedar:
bantuan kendiri memimpin ketika skor rendah, dan beralih kepada "sila jumpa
seseorang" apabila skor naik.

| Tahap | Nada cadangan |
| --- | --- |
| Normal | Kekalkan tabiat yang sedang berkesan |
| Mild | Cuba langkah di bawah dua minggu, kemudian uji semula |
| Moderate | Amalkan langkah, **dan** pertimbangkan berjumpa kaunselor |
| Severe | Sila buat temu janji dengan profesional minggu ini |
| Extremely Severe | Sila berjumpa profesional secepat mungkin + talian bantuan |

### Bila talian bantuan dipaparkan

Dua pencetus, dalam `js/advice.js`:

- mana-mana subskala mencapai **Severe** atau **Extremely Severe**; **atau**
- **soalan 21** (*"Saya rasa hidup ini tidak bermakna"*) dijawab **3**, walaupun
  jumlah skor kekal rendah.

Pencetus kedua itu sengaja berhati-hati. Seseorang boleh menjawab soalan itu
pada tahap tertinggi sementara skor keseluruhannya masih dalam julat normal,
dan dalam keadaan itu memaparkan nombor bantuan adalah kesilapan yang lebih
selamat daripada menyembunyikannya. Ia **bukan** peraturan klinikal.

### ⚠️ Talian bantuan — sahkan sebelum lancar

Nombor talian ada di **bahagian atas `js/advice.js`**, dalam satu blok yang
ditanda jelas. Nombor yang salah pada skrin ini lebih teruk daripada tiada
nombor langsung: seseorang dalam kesusahan akan mendail dan tidak dapat
sesiapa.

**Dail setiap satu sendiri sebelum lancar, dan semak semula setiap semester.**
Kalau institusi anda ada talian kaunseling sendiri, letakkan ia di tempat
pertama dalam senarai itu.

Nombor yang ada sekarang:

| Talian | Nombor |
| --- | --- |
| Talian Kasih | 15999 |
| Talian HEAL (KKM) | 15555 |
| Befrienders Kuala Lumpur | 03-7627 2929 |

### Had cadangan ini

Cadangan ini adalah **bantuan kendiri am** yang selaras dengan amalan biasa
(pengaktifan tingkah laku untuk kemurungan, pernafasan dan pendedahan
berperingkat untuk kebimbangan, pengurusan beban untuk tekanan). Ia **bukan**
rawatan, bukan preskripsi, dan tidak menggantikan penilaian profesional. Teks
setiap tahap ditulis supaya tidak memberi jaminan pemulihan dan tidak
menghalang pengguna daripada mendapatkan bantuan.

## 6. Cara "Print PDF"

Butang **Print PDF** pada skrin Result membuka kotak dialog cetak pelayar.
Di situ pilih **Save as PDF** (Android dan komputer kedua-duanya ada pilihan
ini) — sama seperti versi asal aplikasi.

Reka letak laporan yang dicetak dikawal oleh bahagian `@media print` dalam
`css/styles.css`.

## 7. Supabase (pilihan)

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

## 8. Struktur fail

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
├── i18n.js             semua teks dalam 4 bahasa
├── supabase.js         penyegerakan ke Supabase (pilihan)
├── advice.js           cadangan mengikut skor + talian bantuan
├── printout.js         binaan laporan untuk dicetak
├── install.js          panduan "Add to Home Screen"
└── app.js              aliran skrin dan kawalan borang
icons/
├── icon-*.png          ikon app (logo Flutter)
├── apple-touch-icon.png
├── favicon.ico
├── logo.png            logo SentiQ, dipapar dalam skrin Home
└── og-image.png        banner untuk kad pratonton pautan
supabase/schema.sql     jadual + dasar keselamatan
test/scoring.test.js    ujian pengiraan skor
tools/
├── make_icons.py       jana ikon app daripada logo Flutter
└── make_logo.py        lukis logo SentiQ + banner pautan
```

Itu sahaja fail projek ini. Tiada folder lain yang diperlukan.

## 9. Ujian

```bash
node test/scoring.test.js
```

24 ujian, meliputi:

- pengiraan skor dan sempadan setiap tahap keparahan
- satu ujian yang mengeluarkan semula contoh dalam laporan inovasi
  (Depression 30, Anxiety 34, Stress 36 — semuanya *Extremely Severe*)
- kelengkapan terjemahan: setiap kunci mesti wujud dalam keempat-empat
  bahasa, tiada yang kosong, dan `{placeholder}` mesti sepadan
- kelengkapan cadangan: kesemua 15 kombinasi subskala × tahap mesti ada teks
  dalam setiap bahasa
- logik talian bantuan: dipaparkan dari tahap Severe ke atas, dan apabila
  soalan 21 dijawab 3 — tetapi **tidak** pada tahap Moderate

## 10. Pengiraan DASS-21

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

## 11. Kad pratonton pautan

Bila pautan di-share di WhatsApp, Telegram, Facebook atau X, ia akan papar
kad dengan banner `icons/og-image.png`, tajuk dan penerangan. Semua itu
datang daripada tag `og:` dalam `<head>` fail `index.html`.

**Penting:** URL dalam tag `og:url`, `og:image` dan `twitter:image` mesti
**URL penuh**, bukan laluan relatif — kalau tidak, WhatsApp abaikan. Sekarang
ia ditetapkan kepada `https://sentiq-21.pages.dev/`. Kalau app dipindah ke
domain lain, tukar tiga URL itu (dan `rel="canonical"`) dalam `index.html`.

WhatsApp simpan (*cache*) kad tu agak lama. Selepas tukar banner, guna
<https://developers.facebook.com/tools/debug/> dan tekan *Scrape Again*
untuk paksa ia baca semula.

## 12. Logo dan ikon

Dua sumber berbeza:

| Fail | Sumber | Dipakai di mana |
| --- | --- | --- |
| `icons/icon-*.png`, `apple-touch-icon.png`, `favicon.ico` | `tools/flutter-logo-source.png` | ikon app di skrin utama telefon, tab pelayar |
| `icons/logo.png`, `icons/og-image.png` | dilukis oleh `tools/make_logo.py` | skrin Home dalam app, banner kad pautan |

Untuk jana semula, dari akar projek:

```bash
python tools/make_icons.py   # ikon app
python tools/make_logo.py    # logo SentiQ + banner pautan
```

Kedua-duanya perlukan Python dengan Pillow (`pip install pillow`), dan hanya
digunakan bila nak ubah logo — aplikasi itu sendiri tidak perlukan Python.


## 13. Penafian

SentiQ 21 ialah **alat saringan**, bukan alat diagnosis. Keputusan tidak
menggantikan temu bual klinikal bersemuka. Pengguna yang mengalami tekanan
emosi yang ketara perlu berjumpa doktor atau profesional kesihatan mental.

---

## Nota untuk penyelenggara

Setiap kali mana-mana fail dalam `SHELL` (dalam `sw.js`) berubah, **naikkan
nombor `CACHE`** di baris atas `sw.js` (contoh `sentiq21-v2` → `sentiq21-v3`).
Kalau tidak, telefon yang pernah buka app akan terus guna salinan lama yang
tersimpan, dan perubahan awak tak nampak.
