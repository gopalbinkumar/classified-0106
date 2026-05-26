╔══════════════════════════════════════════════════════════════╗
║         🎂 BIRTHDAY WEBSITE — README.txt 🎂                 ║
║         Romantic Birthday Website for Your Dearest Love      ║
╚══════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════
CARA MENJALANKAN
═══════════════════════════════════════════════════════════════

1. Pastikan Laragon / XAMPP sudah berjalan.

2. Letakkan folder "birthday" di dalam:
   • Laragon : C:\laragon\www\birthday
   • XAMPP   : C:\xampp\htdocs\birthday

3. Buka browser dan akses:
   http://localhost/birthday/

═══════════════════════════════════════════════════════════════
STRUKTUR FILE
═══════════════════════════════════════════════════════════════

birthday/
│
├── index.php               ← Halaman utama + konfigurasi
│
├── css/
│   └── style.css           ← Semua style (pink pastel elegant)
│
├── js/
│   └── script.js           ← Semua JavaScript / animasi
│
├── assets/
│   ├── photos/             ← Letakkan foto kamu di sini
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   ├── photo4.jpg
│   │   ├── photo5.jpg
│   │   └── photo6.jpg
│   │
│   ├── video/              ← Letakkan video kenangan di sini
│   │   └── kenangan.mp4
│   │
│   └── music/              ← (Opsional) Musik latar
│
└── README.txt              ← File ini

═══════════════════════════════════════════════════════════════
CARA KUSTOMISASI
═══════════════════════════════════════════════════════════════

Buka index.php dan edit bagian konfigurasi di atas:

  $config = [
      'lover_name'     => 'Sayang',           ← Nama pacar kamu
      'your_name'      => 'Aku',              ← Nama kamu
      'birth_date'     => '27 Mei',           ← Tanggal ulang tahun
      'together_since' => '1 Januari 2023',   ← Tanggal resmi bersama
  ];

Edit $timeline untuk mengubah kenangan di Section 3.
Edit $reasons untuk mengubah alasan menyayangi di Section 5.
Edit $letter_lines untuk mengubah isi surat di Section 2.

═══════════════════════════════════════════════════════════════
MENAMBAHKAN FOTO
═══════════════════════════════════════════════════════════════

1. Siapkan 6 foto (format .jpg / .png / .webp)
2. Rename menjadi: photo1.jpg, photo2.jpg, ... photo6.jpg
3. Letakkan di folder: assets/photos/
4. Foto otomatis tampil di Section 4 (Galeri)

Tips: Ukuran ideal foto 800x800 px (1:1 ratio) agar tampil rapi
di grid galeri.

═══════════════════════════════════════════════════════════════
MENAMBAHKAN VIDEO
═══════════════════════════════════════════════════════════════

1. Siapkan file video (format .mp4 disarankan)
2. Rename menjadi: kenangan.mp4
3. Letakkan di folder: assets/video/
4. Video otomatis tampil di Section 6

═══════════════════════════════════════════════════════════════
FITUR LENGKAP
═══════════════════════════════════════════════════════════════

✅ Loading screen animasi
✅ Floating hearts di background
✅ Section Hero dengan efek parallax
✅ Surat digital dengan efek typewriter
✅ Timeline kenangan dengan animasi scroll
✅ Galeri foto dengan modal & swipe mobile
✅ Alasan menyayangi dengan animasi fade
✅ Section video HTML5
✅ Ucapan ulang tahun dengan doa & harapan
✅ Tombol kejutan (confetti + overlay "I Love You")
✅ Scroll reveal animation
✅ Mobile-first responsive design
✅ Navigasi dengan scroll smooth

═══════════════════════════════════════════════════════════════
BROWSER YANG DIDUKUNG
═══════════════════════════════════════════════════════════════

✅ Google Chrome (disarankan)
✅ Mozilla Firefox
✅ Microsoft Edge
✅ Safari (iOS & macOS)
✅ Chrome / Browser bawaan Android

═══════════════════════════════════════════════════════════════
TEKNOLOGI
═══════════════════════════════════════════════════════════════

• PHP Native (tidak ada framework)
• HTML5 Semantic
• CSS3 (Custom Properties, Grid, Flexbox, Animations)
• JavaScript Vanilla (ES6+)
• Google Fonts: Great Vibes + Poppins

═══════════════════════════════════════════════════════════════
WARNA TEMA
═══════════════════════════════════════════════════════════════

--primary-pink:  #FF6B9D   ← Pink utama
--soft-pink:     #FFD6E5   ← Pink lembut
--background:    #FFF5F8   ← Background halaman
--dark-text:     #5A3D46   ← Teks gelap
--white:         #FFFFFF   ← Putih
--accent-gold:   #F7C873   ← Aksen emas

═══════════════════════════════════════════════════════════════
                    Made with ❤️ for your love
═══════════════════════════════════════════════════════════════
