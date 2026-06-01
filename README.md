# 🌿 Multimedia Pembelajaran Interaktif Fotosintesis

Website pembelajaran IPA Kelas VII SMP Kurikulum Merdeka dengan tema **Fotosintesis**.
Dibuat menggunakan **HTML5, CSS3, dan JavaScript murni** — tanpa framework apa pun.

## 🚀 Cara Menjalankan

1. Buka folder `Fotosintesis-Web` di **Visual Studio Code**.
2. Klik kanan pada `index.html` → **Open with Live Server** (atau buka langsung di browser).
3. Daftar akun di halaman **Daftar**, lalu **Masuk**.

Tidak perlu instalasi, tidak perlu `npm install`, tidak perlu build.

## 📂 Struktur Folder

```
Fotosintesis-Web/
├── index.html          # Halaman beranda
├── login.html          # Halaman login
├── register.html       # Halaman daftar akun
├── cp-tujuan.html      # Capaian & tujuan pembelajaran
├── materi.html         # 5 materi + animasi fotosintesis
├── video.html          # Video edukasi YouTube
├── quiz.html           # Quiz interaktif 10 soal
├── profil.html         # Profil pembuat
│
├── css/                # File styling
├── js/                 # File JavaScript
├── data/               # Data materi, soal, video (mudah diedit)
└── assets/             # Tempat menaruh gambar/video lokal
```

## ✏️ Cara Mengubah Konten

- **Materi**: edit `data/materi.js`
- **Soal Quiz**: edit `data/quiz.js`
- **Video YouTube**: edit `data/video.js` — cukup ganti `embedId`
- **Profil pembuat**: edit langsung di `profil.html`

## 🎨 Warna Tema

- Hijau Daun `#2E7D32`
- Hijau Muda `#81C784`
- Kuning Lembut `#FDD835`
- Putih `#FFFFFF`

## 📱 Responsif

Tampilan menyesuaikan di laptop, tablet, dan smartphone (navbar hamburger di mobile).

---

© Multimedia Pembelajaran Fotosintesis - IPA SMP
