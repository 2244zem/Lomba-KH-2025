# 🌱 EcoRevive - Platform Bisnis Digital Peduli Lingkungan

<div align="center">

![EcoRevive](https://img.shields.io/badge/EcoRevive-Sustainable%20Business-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![PHP](https://img.shields.io/badge/PHP-7.4+-purple)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

**♻️ Transformasi Sampah Menjadi Nilai Ekonomi 🌟**

[🚀 Demo](#-demo) • [📋 Fitur](#-fitur-utama) • [🛠️ Instalasi](#️-instalasi--setup) • [📁 Struktur](#-struktur-project) • [🎯 Penilaian](#-penilaian)

</div>

## 📖 Tentang EcoRevive

<div align="center">

🌍 **Visi**: Menciptakan ekosistem digital yang mendorong ekonomi sirkular dan gaya hidup berkelanjutan

</div>

EcoRevive adalah **platform bisnis digital revolusioner** yang mengintegrasikan teknologi modern dengan kepedulian lingkungan. Platform ini menghubungkan **masyarakatakat, pelaku bisnis, bank sampah, dan komunitas** dalam satu ekosistem yang saling menguntungkan.

### 🎯 **Value Proposition**
- ✅ **Untuk Masyarakat**: Hasilkan pendapatan dari sampah, beli produk ramah lingkungan
- ✅ **Untuk Bank Sampah**: Digitalisasi operasional, perluasan jangkauan
- ✅ **Untuk UKM**: Pasarkan produk daur ulang, dapatkan bahan baku murah
- ✅ **Untuk Lingkungan**: Pengurangan sampah, daur ulang optimal, jejak karbon rendah

## 🎨 Demo & Tampilan

<div align="center">

| 🏠 Halaman Utama | 📱 Marketplace | 🤖 AI Assistant |
|:---:|:---:|:---:|
| ![Home](https://via.placeholder.com/300x200/00a859/ffffff?text=Peta+Bank+Sampah) | ![Marketplace](https://via.placeholder.com/300x200/ff6b35/ffffff?text=Marketplace) | ![AI](https://via.placeholder.com/300x200/2e86ab/ffffff?text=AI+Assistant) |

| 🔄 Tukar Sampah | 📊 Dashboard | 🌱 Edukasi |
|:---:|:---:|:---:|
| ![Tukar](https://via.placeholder.com/300x200/00a859/ffffff?text=Tukar+Sampah) | ![Dashboard](https://via.placeholder.com/300x200/ff6b35/ffffff?text=Dashboard) | ![Edukasi](https://via.placeholder.com/300x200/2e86ab/ffffff?text=Edukasi) |

</div>

## 🛠️ Teknologi yang Digunakan

### 🎯 Frontend (Modern & Responsive)
- ⚛️ **React.js 18** - User interface yang interaktif
- 🚀 **Vite** - Fast development & building
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔄 **Axios** - HTTP client untuk API calls
- 🌙 **Context API** - State management yang efisien

### 🔧 Backend (Robust & Scalable)
- 🐘 **PHP Native** - Server-side processing
- 🗄️ **MySQL** - Database management
- 🛡️ **RESTful API** - Clean architecture
- 🔒 **Session-based Auth** - Keamanan terjamin

### 🏗️ Development Tools
- 📦 **XAMPP** - Local development environment
- 🔍 **Chrome DevTools** - Debugging & profiling
- 📝 **VS Code** - Code editor dengan extensions

## 📋 Prasyarat Sistem

Pastikan sistem Anda memenuhi requirements berikut:

### 🖥️ Software yang Diperlukan
- **Node.js** (v16 atau lebih baru) ⬇️ [Download](https://nodejs.org/)
- **XAMPP** (PHP 7.4+ & MySQL) ⬇️ [Download](https://www.apachefriends.org/)
- **Git** ⬇️ [Download](https://git-scm.com/)
- **Browser Modern** (Chrome, Firefox, Edge)

### 💻 Spesifikasi Minimum
- RAM: 4GB
- Storage: 2GB free space
- OS: Windows 10, macOS, atau Linux

## 🚀 Instalasi & Setup

### 📥 1. Clone Repository
```bash
# Clone repository dari GitHub
git clone https://github.com/2244zem/Lomba-KH-2025.git

# Masuk ke direktori project
cd Lomba-KH-2025
```

### 🗄️ 2. Setup Backend (XAMPP)

#### A. Start XAMPP Services
1. 🔧 Buka **XAMPP Control Panel**
2. 🟢 Start service **Apache** dan **MySQL**
3. 🌐 Buka http://localhost/phpmyadmin

#### B. Setup Database
```bash
# Masuk ke folder backend
cd BE

# Buat database (otomatis)
php reset-db.php

# Buat user demo
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

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

#### D. Test Backend
🌐 Buka browser dan test:
- http://localhost/BE/ → "API EcoRevive is running" ✅
- http://localhost/BE/test-db.php → "Database connection successful" ✅
- http://localhost/BE/test-cors.php → "CORS test successful" ✅

### ⚛️ 3. Setup Frontend

#### A. Install Dependencies
```bash
# Masuk ke folder frontend
cd FE

# Install semua dependencies
npm install

# Install package tambahan
npm install axios
```

#### B. Konfigurasi Environment
Buat file `.env` di folder `FE`:
```env
VITE_API_BASE_URL=http://localhost/BE
VITE_APP_NAME=EcoRevive
VITE_APP_VERSION=1.0.0
```

#### C. Jalankan Development Server
```bash
# Development mode (hot reload)
npm run dev

# Atau
npm start
```

🎉 **Frontend berjalan di:** http://localhost:5173

### ✅ 4. Verifikasi Koneksi

1. **Backend API**: http://localhost/BE/ → ✅ Running
2. **Frontend App**: http://localhost:5173 → ✅ Running  
3. **Database**: http://localhost/BE/test-db.php → ✅ Connected
4. **CORS**: http://localhost/BE/test-cors.php → ✅ Configured

## 👤 Panduan Pengguna

### 📝 Registrasi Akun Baru
1. 🌐 Buka http://localhost:5173/auth
2. 📝 Pilih tab **"Daftar"**
3. 📋 Isi form registrasi:
   - **Nama Lengkap** (contoh: Ahmad Susanto)
   - **Email** (contoh: zemylev@email.com)
   - **Password** (min. 6 karakter)
   - **Konfirmasi Password**
4. ✅ Klik **"Daftar"** - akun dibuat otomatis

### 🔐 Login ke Akun
1. 🌐 Buka http://localhost:5173/auth  
2. 🔑 Masukkan **email** dan **password**
3. ✅ Klik **"Masuk"**
4. 🎯 Diarahkan ke dashboard utama

### 👥 Akun Demo (Untuk Testing)
```bash
# Jalankan di folder BE
php create-demo-user.php
```

**🔐 Kredensial Demo:**
- 📧 Email: `demo@ecorevive.com`
- 🔑 Password: `demo123`

## 🛍️ Panduan Marketplace

### 🎯 1. Akses Marketplace
- 🔐 Login ke akun Anda
- 🏪 Klik **"Marketplace"** di navbar
- 🌐 Atau buka http://localhost:5173/marketplace

### 📤 2. Upload Produk
1. ➕ Klik tombol **"+ Jual Produk"**
2. 📝 Isi form upload:

| Field | Contoh | Keterangan |
|-------|--------|------------|
| **🖼️ Foto Produk** | `produk.jpg` | Max 5MB, format JPG/PNG |
| **📦 Nama Produk** | "Tas dari Plastik Daur Ulang" | Nama yang menarik |
| **📋 Deskripsi** | "Tas eco-friendly..." | Detail produk & manfaat |
| **📁 Kategori** | "Fashion" | Pilih kategori sesuai |
| **💰 Harga** | 1500 | Dalam poin EcoRevive |
| **📦 Stok** | 10 | Jumlah tersedia |
| **🏷️ Kondisi** | "Baru" | Baru/Bekas |

3. ✅ Klik **"Terbitkan Produk"**

### 🛒 3. Beli Produk
1. 🔍 Browse produk di marketplace
2. 👆 Klik produk untuk detail
3. 🛒 Klik **"Beli Sekarang"** atau **"Tawar"**
4. 💳 Bayar dengan poin EcoRevive
5. 📦 Produk akan diproses

## 🌟 Fitur Utama EcoRevive

### 🗺️ 1. Peta Bank Sampah Interaktif
```bash
Fungsi: Menemukan lokasi bank sampah terdekat
- 📍 GPS integration
- 🕒 Jam operasional real-time
- 📞 Kontak langsung
- 🚗 Navigasi Google Maps
```

### 🔄 2. Sistem Tukar Sampah
```bash
Fungsi: Konversi sampah menjadi poin digital
- 📊 Kategori: Plastik, Kertas, Logam, Kaca
- ⚖️ Sistem timbangan digital  
- 💰 Harga real-time
- 📈 Riwayat transaksi
```

### 🏦 3. Bank Sampah Digital
```bash
Fungsi: Digitalisasi operasional bank sampah
- 💳 Setor online
- 📱 E-wallet integration  
- 📊 Laporan otomatis
- 🔄 Auto-poin calculation
```

### 🚚 4. Penjemputan Sampah
```bash
Fungsi: Jemput sampah langsung dari rumah
- 📅 Jadwal fleksibel
- 🎯 Real-time tracking
- ✅ Konfirmasi digital
- ⭐ Rating system
```

### 🛍️ 5. Marketplace Kreatif
```bash
Fungsi: E-commerce produk daur ulang
- 🎨 Karya komunitas
- 💰 Sistem poin
- ⭐ Review & rating
- 🔄 Circular economy
```

### 🤖 6. AI Environmental Assistant
```bash
Fungsi: Asisten virtual ramah lingkungan
- 💬 Chat interaktif
- 🌱 Tips daur ulang
- 📊 Analisis kebiasaan
- 🎯 Rekomendasi personalized
```

### 📊 7. Carbon Calculator
```bash
Fungsi: Hitung & kurangi jejak karbon
- 🧮 Kalkulator interaktif
- 📈 Progress tracking
- 🎯 Target pengurangan
- 📊 Visualisasi data
```

### 🎮 8. Gamification System
```bash
Fungsi: Motivasi melalui game elements
- 🏆 Achievement badges
- 📊 Leaderboard
- 🎯 Daily challenges
- 🎁 Reward system
```

### 💰 9. Digital Wallet
```bash
Fungsi: Kelola aset digital pengguna
- 💳 Saldo poin
- 🔄 Transfer antar user
- 🏪 Redeem voucher
- 📊 History transaksi
```

### 📚 10. Education Platform
```bash
Fungsi: Edukasi lingkungan interaktif
- 📖 Artikel & blog
- 🎬 Video tutorial
- ❓ Kuis interaktif
- 📱 Mobile learning
```

## 📁 Struktur Project

```
Lomba-KH-2025/
├── 🎨 FE/                          # Frontend React
│   ├── src/
│   │   ├── 🧩 components/          # Komponen reusable
│   │   │   ├── 🎯 Button.jsx       # Tombol universal
│   │   │   ├── 📝 Input.jsx        # Input field
│   │   │   ├── 🧭 Navbar.jsx       # Navigasi utama
│   │   │   └── 🌙 ThemeToggle.jsx  # Toggle dark/light mode
│   │   │
│   │   ├── ⚡ features/            # Fitur modular
│   │   │   ├── 🤖 aiAssistant/     # AI Chat & recommendations
│   │   │   ├── 🔐 auth/           # Authentication system
│   │   │   ├── 🛍️ marketplace/    # E-commerce platform
│   │   │   ├── 🏦 bankSampah/     # Digital bank sampah
│   │   │   ├── 🎮 gamification/   # Game elements
│   │   │   └── 📚 education/      # Learning materials
│   │   │
│   │   ├── 🎛️ contexts/           # State management
│   │   │   ├── 🔐 AuthContext.jsx  # User session management
│   │   │   └── 🌙 ThemeContext.jsx # UI theme management
│   │   │
│   │   ├── 📄 pages/              # Application pages
│   │   │   ├── 🏠 Home.jsx        # Landing page
│   │   │   ├── 🔐 Auth.jsx        # Login/Register
│   │   │   ├── 🛍️ Marketplace.jsx # Product listings
│   │   │   └── 📊 Dashboard.jsx   # User dashboard
│   │   │
│   │   └── 🔧 services/           # API services
│   │       ├── 🌐 api.js          # Axios configuration
│   │       ├── 🔐 authApi.js      # Authentication API calls
│   │       └── 🛍️ marketplaceApi.js # Product API calls
│   │
│   ├── 📦 package.json            # Dependencies & scripts
│   ├── ⚙️ vite.config.js          # Vite configuration
│   ├── 🎨 tailwind.config.js      # Tailwind CSS config
│   └── 🌐 index.html              # Entry HTML
│
├── 🔧 BE/                          # Backend PHP
│   ├── 📄 index.php               # Main API entry point
│   ├── 🔐 login.php               # User authentication
│   ├── 📝 register.php            # User registration
│   ├── 🗄️ database.php           # Database configuration
│   ├── 🛍️ marketplace/           # Product management APIs
│   ├── 🏦 bankSampah/            # Bank operations APIs
│   ├── 🔧 utils/                  # Utility scripts
│   │   ├── 🗃️ reset-db.php       # Database reset
│   │   ├── 🔄 update-db.php       # Database updates
│   │   └── 👤 create-demo-user.php # Demo user creation
│   └── 🧪 tests/                  # API testing
│       ├── 🗄️ test-db.php        # Database connection test
│       └── 🌐 test-cors.php       # CORS configuration test
│
└── 📖 README.md                   # Project documentation
```

## 🎯 Panduan Penilaian untuk Panitia

### 📊 Kriteria Penilaian Technical

#### 🎨 **UI/UX Design** (30 points)
| Aspek | Bobot | Indikator | Cara Test |
|-------|-------|-----------|-----------|
| **Responsiveness** | 10% | Tampilan optimal di semua device | Resize browser, buka di mobile |
| **User Experience** | 10% | Navigasi intuitif, flow jelas | Coba semua fitur tanpa bantuan |
| **Visual Design** | 10% | Konsisten, modern, accessible | Perhatikan color scheme, typography |

#### ⚡ **Functionality** (40 points)
| Fitur | Bobot | Test Scenario | Expected Result |
|-------|-------|---------------|-----------------|
| **Authentication** | 10% | Register → Login → Logout | Session maintained, secure logout |
| **Marketplace** | 15% | Upload → Browse → Buy | Produk tampil, transaksi sukses |
| **Sampah Management** | 15% | Tukar → Setor → Track | Poin bertambah, riwayat tercatat |

#### 🔧 **Technical Implementation** (30 points)
| Aspek | Bobot | Checkpoint |
|-------|-------|-----------|
| **Code Quality** | 10% | Clean code, proper comments |
| **Architecture** | 10% | Modular, scalable structure |
| **Performance** | 10% | Fast loading, optimized assets |

### 🧪 Testing Checklist untuk Panitia

#### ✅ **Smoke Test** (Wajib)
- [ ] 🌐 Frontend bisa diakses (http://localhost:5173)
- [ ] 🔧 Backend API responsive (http://localhost/BE/)
- [ ] 🗄️ Database connected (http://localhost/BE/test-db.php)
- [ ] 🔐 Bisa register & login user baru
- [ ] 🏠 Buka halaman utama tanpa error

#### ✅ **Core Features Test**
- [ ] 🛍️ Marketplace: Upload, browse, beli produk
- [ ] 🔄 Tukar Sampah: Input data, dapat poin
- [ ] 🏦 Bank Sampah: Setor, lihat riwayat
- [ ] 🤖 AI Assistant: Chat & dapat rekomendasi
- [ ] 📊 Dashboard: Lihat statistik & progress

#### ✅ **User Experience Test**
- [ ] 📱 Responsive di mobile & desktop
- [ ] 🔄 Navigation smooth & intuitive
- [ /> 🎨 UI konsisten & visually appealing
- [ ] ⚡ Loading time acceptable (<3s)

### 📈 Metrik Kualitas

| Metric | Target | Cara Measure |
|--------|--------|--------------|
| **Page Load Time** | < 3 detik | Chrome DevTools |
| **Mobile Score** | > 90/100 | Lighthouse Audit |
| **API Response** | < 500ms | Network tab |
| **User Satisfaction** | Intuitif | User testing |

## 🐛 Troubleshooting & FAQ

### ❌ Common Issues & Solutions

#### Problem: "CORS Error" di Console
**🔧 Solution:**
```bash
# Test CORS configuration
cd BE
php test-cors.php

# Expected output: "CORS headers are set correctly"
```

#### Problem: "Database Connection Failed"
**🔧 Solution:**
1. ✅ Pastikan MySQL running di XAMPP
2. ✅ Check credentials di `BE/database.php`
3. ✅ Test: http://localhost/BE/test-db.php

#### Problem: "Port 5173 Already in Use"
**🔧 Solution:**
```bash
# Gunakan port berbeda
npm run dev -- --port 3000

# Atau kill process yang menggunakan port
npx kill-port 5173
```

#### Problem: "Frontend Tidak Connect ke Backend"
**🔧 Solution:**
1. ✅ Pastikan backend running: http://localhost/BE/
2. ✅ Check `.env` file: `VITE_API_BASE_URL=http://localhost/BE`
3. ✅ Test endpoint: http://localhost/BE/login.php

### ❓ Frequently Asked Questions

**Q: Bagaimana cara reset database?**
```bash
cd BE
php reset-db.php
```

**Q: Bagaimana menambah fitur baru?**
1. Buat component di `FE/src/features/`
2. Tambah route di `FE/src/App.jsx`
3. Buat API endpoint di `BE/`
4. Test thoroughly

**Q: Bagaimana deploy ke production?**
1. Build frontend: `npm run build`
2. Upload `dist/` ke web server
3. Upload `BE/` ke PHP server
4. Configure production database

## 🌟 Keunggulan Inovasi EcoRevive

### 🎯 **Business Innovation**
- 💡 **Model Bisnis Baru**: Monetisasi sampah melalui platform digital
- 🔄 **Circular Economy**: Menutup loop produksi-konsumsi-daur ulang
- 🤝 **Multi-stakeholder**: Integrasi masyarakat, bisnis, pemerintah

### 🛠️ **Technical Innovation**
- 🎯 **Full-Stack Modern**: React + PHP native yang optimal
- 📱 **Progressive Web App**: Bisa diinstall seperti native app
- 🤖 **AI Integration**: Personalized environmental recommendations

### 🌍 **Social Impact**
- 📊 **Measurable Impact**: Track pengurangan sampah & karbon
- 👥 **Community Building**: Kolaborasi massal untuk lingkungan
- 🎓 **Education**: Literasi lingkungan melalui gamification

## 📞 Support & Kontribusi

### 🐛 Melaporkan Bug
1. 📋 Check [Troubleshooting](#-troubleshooting--faq) section
2. 🔍 Coba reproduce issue
3. 📝 Buat issue di GitHub dengan detail:
   - Environment (OS, Browser, Node version)
   - Steps to reproduce
   - Expected vs Actual behavior
   - Screenshots/Logs

### 💡 Kontribusi Fitur Baru
1. 🍴 Fork repository
2. 🌿 Buat feature branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit changes: `git commit -m 'Add amazing feature'`
4. 📤 Push to branch: `git push origin feature/amazing-feature`
5. 🔄 Create Pull Request

### 📚 Learning Resources
- ⚛️ [React Documentation](https://reactjs.org/docs/getting-started.html)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- 🐘 [PHP Manual](https://www.php.net/manual/en/)
- 🗄️ [MySQL Documentation](https://dev.mysql.com/doc/)

## 👨‍💻 Tim Pengembang

<div align="center">

| Role | Responsibilities | Tech Stack |
|------|------------------|------------|
| **Full-Stack Developer** | System architecture, API design, UI/UX | React, PHP, MySQL |
| **UI/UX Designer** | User experience, visual design, prototyping |  Tailwind |
| **Environmental Expert** | Sustainability metrics, impact measurement | Environmental Science |

</div>

**📝 Note**: Project ini dikembangkan untuk Lomba KH 2025 dengan tujuan edukasi dan inovasi di bidang teknologi hijau.

---

<div align="center">

**EcoRevive telah siap menunjukkan kemampuan teknis dan inovasi bisnisnya.**

🚀 **Demo Live**: http://localhost:5173  
🔧 **Backend API**: http://localhost/BE/  
📊 **Database Test**: http://localhost/BE/test-db.php

**"Mari bersama-sama menciptakan masa depan yang lebih hijau dan berkelanjutan!"** 🌱

</div>
