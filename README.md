# 🌱 EcoRevive - Digital Business Platform for Environmental Sustainability

EcoRevive adalah platform bisnis digital yang peduli lingkungan, menghubungkan masyarakat, pelaku bisnis, dan komunitas dalam gerakan pengelolaan sampah berkelanjutan.

## Tentang EcoRevive

EcoRevive dibangun dengan visi menciptakan ekosistem digital yang mendukung ekonomi sirkular melalui:

- **♻️ Pengelolaan Sampah Modern** - Sistem terintegrasi dari pengumpulan hingga daur ulang
- **💰 Ekonomi Berkelanjutan** - Menghasilkan nilai ekonomi dari sampah yang dikelola
- **🤝 Kolaborasi Komunitas** - Menghubungkan semua pihak dalam satu platform
- **🌍 Dampak Lingkungan** - Mengurangi jejak karbon dan polusi

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js** - Library UI modern
- **Vite** - Build tool dan dev server
- **Tailwind CSS** - Framework styling
- **Axios** - HTTP client untuk API

### Backend
- **PHP Native** - Server-side processing
- **MySQL** - Database management
- **XAMPP** - Local development environment

## 📋 Prasyarat

- Node.js (v16 atau lebih baru)
- XAMPP (PHP 7.4+ dan MySQL)
- Git
- Browser modern

## 🚀 Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/2244zem/Lomba-KH-2025.git
cd Lomba-KH-2025
```

### 2. Setup Backend (XAMPP)

#### A. Start XAMPP
1. Buka XAMPP Control Panel
2. Start **Apache** dan **MySQL**
3. Buka http://localhost/phpmyadmin

#### B. Buat Database
1. Buka phpMyAdmin (http://localhost/phpmyadmin)
2. Buat database baru: `ecorevive_db`
3. Import SQL file atau jalankan script setup:

```bash
# Masuk ke folder backend
cd BE

# Jalankan script setup database
php reset-db.php
php create-demo-user.php
```

#### C. Konfigurasi Database
Edit file `BE/database.php`:
```php
<?php
$host = 'localhost';
$username = 'root';      // Default XAMPP
$password = '';          // Default XAMPP (kosong)
$database = 'ecorevive_db';

// Koneksi database...
?>
```

#### D. Test Backend
1. Pastikan folder `BE` ada di `C:\xampp\htdocs\` (atau sesuai instalasi XAMPP)
2. Buka http://localhost/BE/test-db.php untuk test koneksi database
3. Buka http://localhost/BE/test-cors.php untuk test CORS

### 3. Setup Frontend

#### A. Install Dependencies
```bash
# Masuk ke folder frontend
cd FE

# Install semua dependencies
npm install

# Install package tambahan jika diperlukan
npm install axios
```

#### B. Konfigurasi Environment
Buat file `.env` di folder `FE`:
```env
VITE_API_BASE_URL=http://localhost/BE
VITE_APP_NAME=EcoRevive
```

#### C. Jalankan Development Server
```bash
# Development mode
npm run dev

# atau
npm start
```

Frontend akan berjalan di http://localhost:5173

### 4. Verifikasi Koneksi

1. **Backend**: http://localhost/BE/ → Harus menampilkan "API EcoRevive is running"
2. **Frontend**: http://localhost:5173 → Harus menampilkan aplikasi EcoRevive
3. **Database**: http://localhost/BE/test-db.php → Harus menampilkan "Database connection successful"

## 👤 Cara Membuat Akun & Login

### Registrasi Akun Baru
1. Buka http://localhost:5173/auth
2. Pilih tab "Daftar"
3. Isi form registrasi:
   - Nama lengkap
   - Email
   - Password (min. 6 karakter)
   - Konfirmasi password
4. Klik "Daftar" - akun akan dibuat secara otomatis

### Login ke Akun
1. Buka http://localhost:5173/auth
2. Masukkan email dan password
3. Klik "Masuk"
4. Anda akan diarahkan ke dashboard utama

### Akun Demo (Opsional)
Jalankan script untuk membuat akun demo:
```bash
cd BE
php create-demo-user.php
```

**Akun Demo:**
- Email: `demo@ecorevive.com`
- Password: `demo123`

## 🛍️ Cara Upload Produk di Marketplace

### 1. Akses Marketplace
- Login ke akun Anda
- Klik "Marketplace" di navbar
- Atau buka http://localhost:5173/marketplace

### 2. Upload Produk
1. Klik tombol **"+ Jual Produk"**
2. Isi form upload produk:
   - **Foto Produk**: Upload gambar produk (max 5MB)
   - **Nama Produk**: Beri nama yang menarik
   - **Deskripsi**: Jelaskan detail produk
   - **Kategori**: Pilih kategori yang sesuai
   - **Harga**: Tentukan harga dalam poin
   - **Stok**: Jumlah produk yang tersedia
   - **Kondisi**: Baru/Bekas

### 3. Submit Produk
- Klik "Terbitkan Produk"
- Produk akan langsung tampil di marketplace
- Produk bisa diedit/dihapus kapan saja

## 🌟 Fitur Utama EcoRevive

### 1. Peta Bank Sampah
- Temukan bank sampah terdekat
- Lihat jam operasional dan layanan
- Navigasi dengan Google Maps integration

### 2. Tukar Sampah
- Tukar sampah menjadi poin
- Berbagai kategori sampah: plastik, kertas, logam, dll.
- Riwayat transaksi lengkap

### 3. Bank Sampah Digital
- Setor sampah online
- Tracking jumlah setoran
- Laporan bulanan

### 4. Penjemputan Sampah
- Jadwal penjemputan fleksibel
- Tracking driver real-time
- Konfirmasi penjemputan

### 5. Marketplace Karya Daur Ulang
- Jual beli produk daur ulang
- Karya kreatif komunitas
- Sistem poin dan reward

### 6. AI Assistant
- Konsultasi pengelolaan sampah
- Tips daur ulang kreatif
- Rekomendasi personalized

### 7. Kalkulator Karbon
- Hitung jejak karbon pribadi
- Rekomendasi pengurangan
- Tracking progress lingkungan

### 8. Gamification
- Tantangan lingkungan harian
- Badge dan achievement
- Leaderboard komunitas

### 9. Dompet Digital
- Kelola poin hasil tukar sampah
- Transfer poin ke anggota lain
- Tukar poin dengan voucher

### 10. Platform Edukasi
- Artikel dan tutorial
- Video edukasi daur ulang
- Kuis interaktif

## 🗂️ Struktur Project

```
Lomba-KH-2025/
├── FE/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Komponen reusable
│   │   ├── features/       # Fitur-fitur modular
│   │   ├── contexts/       # State management
│   │   ├── pages/          # Halaman aplikasi
│   │   └── services/       # API services
│   ├── package.json
│   └── vite.config.js
├── BE/                 # Backend PHP
│   ├── api/            # Endpoint API
│   ├── database.php    # Konfigurasi database
│   ├── login.php       # Endpoint login
│   └── register.php    # Endpoint register
└── README.md
```

## 🐛 Troubleshooting

### Problem: CORS Error
**Solusi:**
```bash
# Jalankan test CORS
cd BE
php test-cors.php
```

### Problem: Database Connection Failed
**Solusi:**
1. Pastikan MySQL running di XAMPP
2. Check kredensial di `database.php`
3. Test koneksi: http://localhost/BE/test-db.php

### Problem: Frontend Tidak Connect ke Backend
**Solusi:**
1. Pastikan backend running di http://localhost/BE/
2. Check `VITE_API_BASE_URL` di `.env`
3. Test endpoint: http://localhost/BE/login.php

### Problem: Port Already in Use
**Solusi:**
```bash
# Ganti port dev server
npm run dev -- --port 3000
```

## 📞 Support

Jika mengalami masalah:
1. Check troubleshooting di atas
2. Pastikan semua prasyarat terpenuhi
3. Buka issue di repository GitHub

## 🌍 Kontribusi

EcoRevive terbuka untuk kontribusi! Silakan:
1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

---

**🌱 Together We Create Sustainable Future!**
