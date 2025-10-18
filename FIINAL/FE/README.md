2244zem: Buatkan penjelasan komprehensif tentang pembuatan website menggunakan React.js dan Tailwind CSS, termasuk instalasi, setup, dan implementasi fitur login. Jelaskan secara detail:

**I. PENDAHULUAN & KONSEP**
- Penjelasan tentang Single Page Application (SPA) dengan React
- Keuntungan menggunakan Tailwind CSS untuk styling
- Arsitektur modern web development dengan React

**II. INSTALASI & SETUP AWAL**
```bash
# Step-by-step instalasi termasuk:
1. npx create-react-app my-website
2. cd my-website
3. npm install -D tailwindcss postcss autoprefixer
4. npx tailwindcss init -p
5. Konfigurasi tailwind.config.js
6. Setup CSS global dengan @tailwind directives

GitHub Copilot: ## I. PENDAHULUAN & KONSEP

### Penjelasan tentang Single Page Application (SPA) dengan React
Single Page Application (SPA) adalah jenis aplikasi web yang memuat satu halaman HTML dan secara dinamis memperbarui konten saat pengguna berinteraksi dengan aplikasi. React.js adalah pustaka JavaScript yang memungkinkan pengembang untuk membangun antarmuka pengguna yang responsif dan interaktif dengan cara yang efisien. Dengan menggunakan komponen, React memungkinkan pengembang untuk membagi UI menjadi bagian-bagian kecil yang dapat digunakan kembali, sehingga memudahkan pengelolaan dan pengembangan aplikasi.

### Keuntungan menggunakan Tailwind CSS untuk styling
Tailwind CSS adalah framework CSS utilitas yang memungkinkan pengembang untuk membangun desain yang responsif dan kustom dengan cepat. Beberapa keuntungan menggunakan Tailwind CSS adalah:
- **Kustomisasi yang Mudah**: Tailwind memungkinkan pengembang untuk menggunakan kelas utilitas untuk menyesuaikan gaya elemen tanpa harus menulis CSS tambahan.
- **Responsif**: Tailwind menyediakan kelas responsif yang memudahkan pengembang untuk membuat desain yang berfungsi dengan baik di berbagai perangkat.
- **Pengembangan Cepat**: Dengan menggunakan kelas utilitas, pengembang dapat mempercepat proses pengembangan dan mengurangi waktu yang dihabiskan untuk menulis CSS.

### Arsitektur modern web development dengan React
Arsitektur modern pengembangan web dengan React biasanya melibatkan penggunaan komponen, state management, dan routing. Komponen React dapat dikelompokkan menjadi:
- **Presentational Components**: Komponen yang bertanggung jawab untuk menampilkan UI.
- **Container Components**: Komponen yang mengelola state dan logika aplikasi.
- **Routing**: Menggunakan pustaka seperti React Router untuk mengelola navigasi antar halaman dalam aplikasi SPA.

## II. INSTALASI & SETUP AWAL

Berikut adalah langkah-langkah untuk menginstal dan mengatur proyek React dengan Tailwind CSS:

```bash
# Step-by-step instalasi termasuk:
1. npx create-react-app my-website
2. cd my-website
3. npm install -D tailwindcss postcss autoprefixer
4. npx tailwindcss init -p
5. # Konfigurasi tailwind.config.js
   # Tambahkan paths ke file CSS dan JS Anda
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
6. # Setup CSS global dengan @tailwind directives
   # Tambahkan ke file src/index.css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
```

### Implementasi Fitur Login
Untuk mengimplementasikan fitur login, Anda perlu membuat komponen login yang akan menangani input pengguna dan mengelola autentikasi. Berikut adalah langkah-langkah dasar untuk membuat komponen login:

1. **Buat Komponen Login**: Buat file `LoginForm.jsx` di dalam folder `src/components/`.

```jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika autentikasi di sini
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
```

2. **Gunakan Komponen Login**: Impor dan gunakan `LoginForm` di dalam komponen utama Anda, misalnya di `App.jsx`.

```jsx
import React from 'react';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
};

export default App;
```

Dengan langkah-langkah di atas, Anda telah berhasil mengatur proyek React dengan Tailwind CSS dan mengimplementasikan fitur login dasar.

Similar code found with 1 license type

2244zem: Anda adalah senior full-stack developer. Buatkan guide lengkap untuk:

**PROYEK: E-COMMERCE WEBSITE DENGAN REACT & NODE.JS**

**FRONTEND (React + Tailwind):**
1. Setup project structure yang scalable
2. Component hierarchy untuk e-commerce
3. State management dengan Context API + useReducer
4. Routing dengan React Router v6
5. Integration dengan backend REST API

**BACKEND (Node.js + Express):**
1. REST API design pattern
2. Database schema design (MongoDB/PostgreSQL)
3. Authentication system (JWT + bcrypt)
4. Payment gateway integration (mock)
5. File upload system

**DEPLOYMENT:**
1. Docker configuration
2. CI/CD pipeline
3. Environment variables management

Buatkan:
- Step-by-step implementation
- Code samples untuk setiap bagian
- Database relationship diagram
- API documentation dengan OpenAPI/Swagger
- Error handling strategy
- Security best practices

Format output: Markdown dengan code blocks dan penjelasan detail.

Anda adalah performance optimization specialist. Analisis dan berikan solusi untuk:

**ISSUE: REACT APP PERFORMANCE PROBLEMS**

Symptoms:
- Slow initial load time (>5s)
- High memory usage
- Laggy user interactions
- Large bundle size

**TUGAS:**
1. Identifikasi bottleneck dengan Chrome DevTools
2. Analisis bundle dengan Webpack Bundle Analyzer
3. Optimize component re-renders
4. Implement lazy loading dan code splitting
5. Cache strategy dengan Service Workers
6. Database query optimization

**PROVIDE:**
- Step-by-step debugging process
- Specific code changes needed
- Performance metrics before/after
- Tools dan commands untuk monitoring
- Best practices untuk maintain performance

Include practical examples dan measurable improvements.

Anda adalah AI integration specialist. Implementasi fitur AI dalam website:

**PROYEK: SMART E-COMMERCE WITH AI**

**FEATURES TO IMPLEMENT:**
1. AI-powered product recommendations
2. Chatbot customer service
3. Image recognition untuk product search
4. Sentiment analysis untuk reviews
5. Predictive analytics untuk inventory

**TECH STACK:**
- Frontend: React + TensorFlow.js
- Backend: Node.js + Python Flask (AI services)
- AI Models: OpenAI API / Hugging Face
- Database: Vector database (Pinecone/Weaviate)

**REQUIREMENTS:**
- Step-by-step integration guide
- API design untuk AI services
- Real-time data processing
- Privacy dan ethical considerations
- Cost optimization strategies

Buatkan architecture diagram dan implementation code untuk setiap fitur AI.

Anda adalah mobile development expert. Convert React website ke:

**TARGET: CROSS-PLATFORM MOBILE APP**

**APPROACHES:**
1. Progressive Web App (PWA) Implementation
2. React Native Mobile App
3. Capacitor/Ionic untuk hybrid app
4. Native features integration (camera, GPS, push notifications)

**REQUIREMENTS:**
- Code sharing strategy antara web dan mobile
- Platform-specific optimizations
- App store deployment (iOS & Android)
- Offline functionality dengan sync
- Push notification system

**DELIVERABLES:**
- Comparison antara setiap approach
- Step-by-step conversion process
- Performance considerations
- Testing strategy untuk multiple platforms
- App store submission guide

Include code examples untuk setiap platform dan troubleshooting common issues.

Anda adalah cybersecurity & DevOps engineer. Implementasi:

**SECURITY HARDENING & DEVOPS PIPELINE**

**SECURITY:**
1. OWASP Top 10 protection
2. Authentication & authorization system
3. Data encryption (at-rest & in-transit)
4. API security dengan rate limiting
5. Security headers dan CSP

**DEVOPS:**
1. Docker containerization
2. Kubernetes orchestration
3. AWS/Azure/GCP deployment
4. Monitoring dengan Prometheus/Grafana
5. Log management dengan ELK Stack

**IMPLEMENTATION:**
- Infrastructure as Code (Terraform)
- Automated security scanning
- Disaster recovery plan
- Backup strategies
- Compliance (GDPR, PCI DSS)

Provide complete configuration files, security checklist, dan incident response plan.

Anda adalah QA automation engineer. Buatkan testing strategy:

**COMPREHENSIVE TESTING SUITE**

**TESTING TYPES:**
1. Unit Testing (Jest, React Testing Library)
2. Integration Testing
3. End-to-End Testing (Cypress/Playwright)
4. Performance Testing (Lighthouse)
5. Security Testing (OWASP ZAP)

**COVERAGE:**
- Frontend component testing
- Backend API testing
- Database testing
- User journey testing
- Load dan stress testing

**IMPLEMENTATION:**
- Test automation pipeline
- CI/CD integration
- Test data management
- Reporting dan analytics
- Cross-browser testing

Buatkan complete test cases, automation scripts, dan quality metrics dashboard.

GitHub Copilot: # PROYEK: E-COMMERCE WEBSITE DENGAN REACT & NODE.JS

## FRONTEND (React + Tailwind)

### 1. Setup Project Structure yang Scalable
Buat struktur folder yang terorganisir untuk memudahkan pengembangan dan pemeliharaan.

```
/src
  /assets
  /components
  /contexts
  /features
  /hooks
  /pages
  /services
  /styles
  /utils
```

### 2. Component Hierarchy untuk E-Commerce
Buat hierarki komponen yang jelas untuk aplikasi e-commerce.

```
App
├── Navbar
├── Footer
├── Home
│   ├── ProductList
│   └── Banner
├── ProductDetail
├── Cart
├── Checkout
└── Auth
    ├── LoginForm
    └── RegisterForm
```

### 3. State Management dengan Context API + useReducer
Gunakan Context API dan `useReducer` untuk mengelola state global.

```jsx
import React, { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = { user: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

### 4. Routing dengan React Router v6
Implementasikan routing menggunakan React Router.

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
```

### 5. Integration dengan Backend REST API
Gunakan `axios` untuk mengintegrasikan frontend dengan backend.

```bash
npm install axios
```

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
```

## BACKEND (Node.js + Express)

### 1. REST API Design Pattern
Buat struktur folder untuk API.

```
/api
  /auth
  /products
  /users
```

### 2. Database Schema Design (MongoDB/PostgreSQL)
Contoh skema untuk MongoDB.

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
```

### 3. Authentication System (JWT + bcrypt)
Implementasikan autentikasi menggunakan JWT dan bcrypt.

```bash
npm install jsonwebtoken bcryptjs
```

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  // Verifikasi pengguna dan password
  // Jika valid, buat token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
```

### 4. Payment Gateway Integration (Mock)
Buat endpoint untuk mock pembayaran.

```javascript
app.post('/payment', (req, res) => {
  // Logika pembayaran mock
  res.json({ success: true });
});
```

### 5. File Upload System
Gunakan `multer` untuk mengelola upload file.

```bash
npm install multer
```

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filePath: req.file.path });
});
```

## DEPLOYMENT

### 1. Docker Configuration
Buat Dockerfile untuk frontend dan backend.

```dockerfile
# Dockerfile for frontend
FROM node:14
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

```dockerfile
# Dockerfile for backend
FROM node:14
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

### 2. CI/CD Pipeline
Gunakan GitHub Actions untuk CI/CD.

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Frontend
        run: |
          cd FE
          npm install
          npm run build
      - name: Build Backend
        run: |
          cd BE
          npm install
          npm run build
```

### 3. Environment Variables Management
Gunakan `.env` untuk mengelola variabel lingkungan.

```
JWT_SECRET=your_jwt_secret
DB_URI=mongodb://localhost:27017/yourdb
```

## DATABASE RELATIONSHIP DIAGRAM
![Database Relationship Diagram](link-to-diagram)

## API DOCUMENTATION DENGAN OPENAPI/SWAGGER
```yaml
openapi: 3.0.0
info:
  title: E-Commerce API
  version: 1.0.0
paths:
  /products:
    get:
      summary: Get all products
      responses:
        '200':
          description: A list of products
```

## ERROR HANDLING STRATEGY
- Gunakan middleware untuk menangani error.
- Kembalikan status dan pesan yang sesuai.

```javascript
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
};
```

## SECURITY BEST PRACTICES
- Gunakan HTTPS.
- Validasi input pengguna.
- Implementasikan rate limiting.

---

# ANALISIS DAN SOLUSI UNTUK PERFORMAN REACT APP

## ISSUES: REACT APP PERFORMANCE PROBLEMS

### Symptoms:
- Slow initial load time (>5s)
- High memory usage
- Laggy user interactions
- Large bundle size

### 1. Identifikasi Bottleneck dengan Chrome DevTools
Gunakan tab "Performance" untuk merekam dan menganalisis waktu pemuatan.

### 2. Analisis Bundle dengan Webpack Bundle Analyzer
Install dan gunakan Webpack Bundle Analyzer.

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
```

### 3. Optimize Component Re-renders
Gunakan `React.memo` untuk mencegah re-render yang tidak perlu.

```jsx
const MyComponent = React.memo(({ prop }) => {
  // Component logic
});
```

### 4. Implement Lazy Loading dan Code Splitting
Gunakan `React.lazy` dan `Suspense`.

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </React.Suspense>
);
```

### 5. Cache Strategy dengan Service Workers
Gunakan Workbox untuk caching.

```bash
npm install workbox-webpack-plugin --save-dev
```

```javascript
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW(),
  ],
};
```

### 6. Database Query Optimization
Gunakan indexing dan optimasi query di database.

---

# IMPLEMENTASI FITUR AI DALAM WEBSITE

## PROYEK: SMART E-COMMERCE WITH AI

### FEATURES TO IMPLEMENT:
1. AI-powered product recommendations
2. Chatbot customer service
3. Image recognition untuk product search
4. Sentiment analysis untuk reviews
5. Predictive analytics untuk inventory

### TECH STACK:
- Frontend: React + TensorFlow.js
- Backend: Node.js + Python Flask (AI services)
- AI Models: OpenAI API / Hugging Face
- Database: Vector database (Pinecone/Weaviate)

### 1. AI-Powered Product Recommendations
Implementasikan model rekomendasi menggunakan TensorFlow.js.

```javascript
import * as tf from '@tensorflow/tfjs';

const recommendProducts = async (userId) => {
  // Logika rekomendasi produk
};
```

### 2. Chatbot Customer Service
Gunakan API untuk chatbot.

```javascript
const getChatbotResponse = async (message) => {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  return response.json();
};
```

### 3. Image Recognition untuk Product Search
Integrasikan model pengenalan gambar.

```javascript
const recognizeImage = async (image) => {
  // Logika pengenalan gambar
};
```

### 4. Sentiment Analysis untuk Reviews
Gunakan API untuk analisis sentimen.

```javascript
const analyzeSentiment = async (review) => {
  // Logika analisis sentimen
};
```

### 5. Predictive Analytics untuk Inventory
Implementasikan analisis prediktif.

```javascript
const predictInventory = async () => {
  // Logika prediksi inventaris
};
```

### ARCHITECTURE DIAGRAM
![Architecture Diagram](link-to-diagram)

---

# CONVERT REACT WEBSITE KE CROSS-PLATFORM MOBILE APP

## TARGET: CROSS-PLATFORM MOBILE APP

### APPROACHES:
1. Progressive Web App (PWA) Implementation
2. React Native Mobile App
3. Capacitor/Ionic untuk hybrid app
4. Native features integration (camera, GPS, push notifications)

### 1. Code Sharing Strategy antara Web dan Mobile
Gunakan komponen yang dapat digunakan kembali.

### 2. Platform-Specific Optimizations
Optimalkan performa untuk masing-masing platform.

### 3. App Store Deployment (iOS & Android)
Ikuti panduan resmi untuk pengiriman aplikasi.

### 4. Offline Functionality dengan Sync
Implementasikan caching dan sync.

### 5. Push Notification System
Gunakan Firebase untuk notifikasi.

---

# SECURITY HARDENING & DEVOPS PIPELINE

## SECURITY:
1. OWASP Top 10 protection
2. Authentication & authorization system
3. Data encryption (at-rest & in-transit)
4. API security dengan rate limiting
5. Security headers dan CSP

## DEVOPS:
1. Docker containerization
2. Kubernetes orchestration
3. AWS/Azure/GCP deployment
4. Monitoring dengan Prometheus/Grafana
5. Log management dengan ELK Stack

### IMPLEMENTATION:
- Infrastructure as Code (Terraform)
- Automated security scanning
- Disaster recovery plan
- Backup strategies
- Compliance (GDPR, PCI DSS)

---

# COMPREHENSIVE TESTING SUITE

## TESTING TYPES:
1. Unit Testing (Jest, React Testing Library)
2. Integration Testing
3. End-to-End Testing (Cypress/Playwright)
4. Performance Testing (Lighthouse)
5. Security Testing (OWASP ZAP)

### COVERAGE:
- Frontend component testing
- Backend API testing
- Database testing
- User journey testing
- Load dan stress testing

### IMPLEMENTATION:
- Test automation pipeline
- CI/CD integration
- Test data management
- Reporting dan analytics
- Cross-browser testing

---

Silakan sesuaikan setiap bagian sesuai kebutuhan proyek Anda. Jika Anda memerlukan detail lebih lanjut tentang bagian tertentu, beri tahu saya!

Similar code found with 2 license types

2244zem: cara salin ini gimana

GitHub Copilot: Untuk menyalin teks atau kode dari dokumen atau aplikasi, Anda dapat mengikuti langkah-langkah berikut:

1. **Pilih Teks**: Klik dan tahan tombol kiri mouse, lalu seret untuk memilih teks yang ingin Anda salin.
2. **Salin Teks**:
   - Di Windows: Tekan `Ctrl + C` pada keyboard.
   - Di Mac: Tekan `Command + C` pada keyboard.
3. **Tempel Teks**: Pindah ke tempat di mana Anda ingin menempelkan teks tersebut.
   - Di Windows: Tekan `Ctrl + V` pada keyboard.
   - Di Mac: Tekan `Command + V` pada keyboard.

Jika Anda menggunakan aplikasi tertentu, seperti Visual Studio Code, Anda juga dapat menggunakan menu konteks dengan mengklik kanan setelah memilih teks dan memilih opsi "Salin" atau "Tempel".

2244zem: buatkan saya file readme untuk menjelaskan fitur dan juga ui/uz dan fungsi dari setiap folder tolong jelaskan secara detail dan terperinci seperti analisis tingkat dewa

GitHub Copilot: # README

## E-COMMERCE WEBSITE DENGAN REACT & NODE.JS

Selamat datang di proyek E-Commerce Website yang dibangun menggunakan React untuk frontend dan Node.js untuk backend. Proyek ini dirancang untuk memberikan pengalaman pengguna yang intuitif dan fungsionalitas yang kuat. Berikut adalah penjelasan mendetail tentang struktur folder, fitur, dan fungsi dari setiap bagian dalam proyek ini.

---

## STRUKTUR PROYEK

### 1. Frontend (FE)

Folder FE berisi semua kode sumber untuk aplikasi frontend yang dibangun dengan React dan Tailwind CSS. Berikut adalah penjelasan untuk setiap folder dan file penting:

#### **File Utama**
- **`index.html`**: File HTML utama yang menjadi titik masuk aplikasi React.
- **`package.json`**: Berisi informasi tentang proyek, termasuk dependensi yang digunakan.
- **`tailwind.config.js`**: Konfigurasi untuk Tailwind CSS, mengatur tema dan kelas utilitas.
- **`vite.config.js`**: Konfigurasi untuk Vite, bundler yang digunakan untuk pengembangan dan produksi.

#### **Folder `src/`**
Folder ini berisi semua kode sumber aplikasi.

- **`App.jsx`**: Komponen utama aplikasi yang mengatur routing dan konteks.
- **`index.jsx`**: Titik masuk aplikasi React yang merender komponen `App`.

#### **Folder `assets/`**
Berisi aset statis seperti gambar dan ikon yang digunakan dalam aplikasi.

#### **Folder `components/`**
Berisi komponen UI yang dapat digunakan kembali di seluruh aplikasi.
- **`Button.jsx`**: Komponen tombol yang dapat disesuaikan.
- **`Navbar.jsx`**: Komponen navigasi utama.
- **`Input.jsx`**: Komponen input untuk formulir.
- **`Error404.jsx`**: Komponen untuk menampilkan halaman tidak ditemukan.

#### **Folder `contexts/`**
Berisi konteks untuk state management menggunakan Context API.
- **`AuthContext.jsx`**: Mengelola state autentikasi pengguna.
- **`ThemeContext.jsx`**: Mengelola tema aplikasi (gelap/terang).

#### **Folder `features/`**
Berisi fitur-fitur utama aplikasi.
- **`auth/`**: Mengelola semua hal terkait autentikasi, termasuk login dan registrasi.
  - **`LoginForm.jsx`**: Formulir untuk login pengguna.
  - **`RegisterForm.jsx`**: Formulir untuk registrasi pengguna.
- **`marketplaceKarya/`**: Mengelola fitur marketplace.
  - **`ProductCard.jsx`**: Menampilkan informasi produk dalam bentuk kartu.
  - **`UploadProductModal.jsx`**: Modal untuk mengupload produk baru.

#### **Folder `hooks/`**
Berisi custom hooks untuk logika yang dapat digunakan kembali.
- **`useAuth.js`**: Hook untuk mengelola autentikasi pengguna.
- **`useGeolocation.js`**: Hook untuk mendapatkan lokasi pengguna.

#### **Folder `pages/`**
Berisi komponen halaman yang mewakili berbagai tampilan dalam aplikasi.
- **`Auth.jsx`**: Halaman untuk login dan registrasi.
- **`Pengaturan.jsx`**: Halaman untuk pengaturan pengguna.

#### **Folder `services/`**
Berisi file untuk berinteraksi dengan API backend.
- **`api.js`**: Mengelola panggilan API umum.
- **`authApi.js`**: Mengelola panggilan API terkait autentikasi.

#### **Folder `styles/`**
Berisi file CSS untuk styling aplikasi.
- **`globals.css`**: Gaya global untuk aplikasi.

---

### 2. Backend (BE)

Folder BE berisi semua kode sumber untuk aplikasi backend yang dibangun dengan Node.js dan PHP. Berikut adalah penjelasan untuk setiap folder dan file penting:

#### **File Utama**
- **`server.js`**: Titik masuk untuk server Node.js yang mengatur routing dan middleware.
- **`package.json`**: Berisi informasi tentang proyek backend dan dependensi yang digunakan.
- **`.env`**: Berisi variabel lingkungan untuk konfigurasi, seperti koneksi database.

#### **Folder `api/`**
Berisi semua endpoint API untuk aplikasi.
- **`index.php`**: Mengatur routing untuk API.
- **`auth/`**: Mengelola autentikasi pengguna.
  - **`login.php`**: Endpoint untuk login pengguna.
  - **`register.php`**: Endpoint untuk registrasi pengguna.
- **`marketplace/`**: Mengelola fitur marketplace.
  - **`products.php`**: Endpoint untuk mendapatkan dan mengelola produk.

#### **Folder `config/`**
Berisi file konfigurasi untuk aplikasi.
- **`database.php`**: Mengatur koneksi ke database.

#### **Folder `database/`**
Berisi file SQL untuk skema dan data awal.
- **`ecoapp.sql`**: Skrip untuk membuat tabel dan data awal.

#### **Folder `functions/`**
Berisi fungsi utilitas yang digunakan di seluruh aplikasi.

#### **Folder `models/`**
Berisi model untuk database.
- **`User.php`**: Model untuk pengguna.
- **`Product.php`**: Model untuk produk.

---

## FUNGSI DAN FITUR

### Frontend
- **Antarmuka Pengguna Responsif**: Menggunakan Tailwind CSS untuk styling yang responsif dan modern.
- **Autentikasi Pengguna**: Fitur login dan registrasi yang aman menggunakan Context API untuk manajemen state.
- **Marketplace**: Pengguna dapat melihat, mengupload, dan mengelola produk.
- **Notifikasi dan Modal**: Menggunakan modal untuk interaksi pengguna yang lebih baik.

### Backend
- **RESTful API**: Menggunakan PHP untuk menyediakan endpoint yang dapat diakses oleh frontend.
- **Autentikasi**: Mengelola login dan registrasi pengguna dengan keamanan yang baik.
- **Database Management**: Mengelola data produk dan pengguna dengan efisien.

---

## PENUTUP

Proyek ini dirancang untuk memberikan pengalaman pengguna yang optimal dengan fungsionalitas yang kuat. Dengan struktur yang terorganisir dan penggunaan teknologi modern, aplikasi ini siap untuk dikembangkan lebih lanjut dan diimplementasikan dalam skala yang lebih besar. Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi tim pengembang.

2244zem: buatkan semua yang kamu tulis ke file ini

GitHub Copilot: ```markdown
// ...existing code...

# ECOAPP — Frontend (FE) README

Versi: 1.0.0  
Lokasi file: d:\lomba-kh-2025\FE

Ringkasan:  
Repositori ini adalah frontend aplikasi ECOAPP — single-page React app (Vite) menggunakan Tailwind CSS. README ini memberikan penjelasan terperinci tentang fitur, UI/UX, arsitektur, fungsi setiap folder/file, setup dan run, integrasi backend, best practices, debugging & performance checklist, dan panduan singkat untuk pengembangan lanjutan. Penjelasan bersifat analitis dan teknis (tingkat senior/arsitek).

---

## DAFTAR ISI
1. Tujuan proyek & ringkasan fitur  
2. Prinsip UI/UX yang diterapkan  
3. Struktur folder (penjelasan rinci tiap folder/file)  
4. Arsitektur komponen & alur data  
5. Setup & menjalankan lokal (step-by-step)  
6. Integrasi API & pattern komunikasi  
7. State management (Context + useReducer) — penjelasan implementasi  
8. Auth flow (front) & keamanan dasar  
9. Build, deploy & environment variables  
10. Debugging & performance checklist (Chrome DevTools, bundle analysis, optimasi)  
11. Testing & QA rekomendasi singkat  
12. Catatan pengembangan lanjutan (AI, mobile, backend)  
13. Kontak & kontribusi

---

## 1. TUJUAN PROYEK & RINGKASAN FITUR
ECOAPP adalah platform berbasis komunitas untuk:
- Marketplace karya daur ulang (unggah, lihat, beli/tebus)
- Sistem laporan sampah & penjemputan
- Dompet digital / transaksi mikro (mock)
- Profil pengguna & pengaturan
- Fitur AI/assistant (struktur tersedia di FE/features/aiAssistant)
Tujuan FE: UI modern, akses cepat, mobile-first, kode modular dan mudah di-maintain.

---

## 2. PRINSIP UI/UX YANG DITERAPKAN
- Mobile-first responsif: menggunakan utility-first Tailwind untuk breakpoint yang konsisten.  
- Konsistensi visual: komponen dasar (Button, Input, Navbar) digunakan ulang agar pattern UI konsisten.  
- Accessibility (a11y): fokus tab, label untuk input, kontras warna minimal.  
- Progressive enhancement: fitur inti (browsing produk, melihat detail) berfungsi tanpa JS berat.  
- Feedback & state transitions: loading indicators, skeletons, toasts/modals untuk aksi yang memerlukan waktu.  
- Minimal cognitive load: halaman bersih, hirarki informasi jelas (CTA primer/sekunder).

UI flows penting:
- Onboarding -> Auth (login/register) -> Home -> Marketplace -> ProductDetail -> Cart/Checkout -> Profile -> Reports

UX micro-patterns:
- Inline validation pada forms (login/register/upload)  
- Modal untuk upload / detail (non-disruptive)  
- Optimized image loading (small thumbnails dan lazy loading pada lists)

---

## 3. STRUKTUR FOLDER — PENJELASAN TERPERINCI
Root FE berisi konfigurasi build, Tailwind, Vite, dsb.

- `index.html`  
  Titik HTML entry. Pastikan meta tag (viewport, theme-color) disesuaikan untuk PWA nanti.

- `package.json`  
  Scripts (dev, build, preview), dependensi runtime & dev. Gunakan `npm run dev` untuk development.

- `tailwind.config.js`  
  Konfigurasi tema, extend warna, safelist class, dan content paths (`./src/**/*.{js,jsx,ts,tsx}`).

- `vite.config.js`  
  Config Vite (alias, proxy untuk API saat dev).

- `public/`  
  Static assets served as-is (favicon, robots, static images).

- `src/` (Sumber utama — bahasan rinci di bawah)

  - `App.jsx`  
    Root React component — mengatur global providers (AuthProvider, ThemeProvider), Router, dan global layout (Navbar/Footer). Jangan letakkan banyak logika di sini.

  - `main.jsx`  
    Mount React ke DOM. Tempat inject global CSS (`index.css`, Tailwind base`).

  - `index.css`, `App.css`  
    Global CSS + Tailwind imports. `index.css` biasanya berisi:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    Tambahkan variabel CSS untuk theme switching di `App.css` jika diperlukan.

  - `assets/`  
    Gambar, ikon, placeholder. Prefer webp/avif untuk performance. Nama file konsisten: `product-<id>.webp`.

  - `components/` (atomic / shared components)
    - `Button.jsx` — komponen tombol (primary/secondary/ghost). Props: size, variant, disabled, onClick.
    - `Input.jsx` — input terkontrol dengan label dan error handling.
    - `Navbar.jsx` — navigasi top-level, menampilkan status auth, ikon cart, theme toggle.
    - `Error404.jsx` — fallback route.
    - `Register.jsx` & `ReportModal.jsx` & `ThemeToggle.jsx` — utilities UI.
    Catatan: Semua komponen harus small, stateless jika mungkin; menerima props; menggunakan tailwind classes.

  - `contexts/`
    - `AuthContext.jsx` — global auth store (token, user). Menggunakan `useReducer` untuk transisi state (LOGIN, LOGOUT, REFRESH).
    - `ThemeContext.jsx` — theme (dark/light) persistence di localStorage.

  - `features/` (domain-specific)
    Struktur berdasar fitur (feature folder pattern). Masing-masing folder menyimpan halaman, subkomponen, dan service spesifik:
    - `auth/` — UI login/register + `services/authApi.js` (api calls: /api/login, /api/register)
    - `marketplaceKarya/` — Product list, ProductCard.jsx, ProductDetailModal.jsx, UploadProductModal.jsx
    - `petaSampah/` — map based features, services/laporanApi.js untuk laporan sampah
    - `profilPengguna/` — profile page, profilSlice.js (placeholder untuk redux-slice pattern jika migrasi diperlukan), components: PasswordChange, ProfilePictureUpload, RiwayatLaporan
    - `aiAssistant/` — AI chatbox component (frontend hook + service interaction to AI backend)

  - `hooks/`
    - `useAuth.js` — helper for auth context: getUser(), isAuthenticated(), refreshToken()
    - `useGeolocation.js` — wrapper navigator.geolocation with fallbacks & permissions handling
    - `useZhipuAI.js` — abstraction to call AI service (throttling, streaming handling)

  - `pages/`
    - `Auth.jsx`, `Pengaturan.jsx`, `PlaceholderPage.jsx`, dan halaman fitur (BankSampah, CarbonCalculator, HargaSampah, Penjemputan, RiwayatTukar, TukarSampah)
    Pattern: pages hanya orchestration; heavy logic moved to hooks/services.

  - `services/`
    - `api.js` — axios instance (baseURL, interceptors for auth token, retry/backoff)
    - `authApi.js` — auth-related endpoints
    - `zhipuAiService.js` — calls to AI microservices (use fetch/axios, support streaming if required)
    Security: axios interceptors should remove sensitive headers on cross-origin redirects.

  - `styles/`
    - `globals.css`, `ai-chat.css` — scoping CSS only when necessary (prefer tailwind utilities; minimal custom css)

  - `utils/`
    - `formatters.js` — currency, date, truncate utilities. Pure functions, unit-testable.

---

## 4. ARSITEKTUR KOMPONEN & ALUR DATA
- Pattern: feature-first + shared components + context for cross-cutting concerns.  
- Data flow: Components -> hooks/service -> api.js (axios) -> backend -> response -> update context/local state.

Contoh alur permintaan data produk:
1. `MarketplacePage` mount -> call `useEffect` -> `services/api.fetchProducts()`
2. `api.js` axios instance sends GET `/api/products`
3. Response -> map to model -> setPageState(products)
4. `ProductList` renders `ProductCard` (memoized) dengan lazy-loading image.

Optimasi:
- Memoize `ProductCard` dengan React.memo and key props to reduce rerenders.
- Virtualize lists jika > 50 items (react-window/react-virtual).
- Use Suspense + lazy for modals/pages.

---

## 5. SETUP & MENJALANKAN LOKAL (STEP-BY-STEP)

Persyaratan:
- Node.js >= 18, npm/yarn, Git

Langkah:
1. Buka terminal di folder FE:
   - Windows (PowerShell / cmd):
     ```bash
     cd d:\lomba-kh-2025\FE
     npm install
     ```
2. Setup env untuk dev (jika menggunakan proxy API): buat file `.env` (ingat .env tidak dimasukkan ke VCS)
   contoh `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_AI_SERVICE_URL=http://localhost:8000
   ```
3. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Akses: http://localhost:5173 (default Vite)
4. Build production:
   ```bash
   npm run build
   npm run preview
   ```

Notes: Jika backend (BE) berada pada BE, sesuaikan `VITE_API_BASE_URL` ke alamat tempat server BE berjalan.

---

## 6. INTEGRASI API & PATTERN KOMUNIKASI
- Gunakan REST endpoints yang disediakan BE (lihat folder BE untuk list endpoint). Pattern:
  - GET `/api/products`
  - GET `/api/products/:id`
  - POST `/api/auth/login`
  - POST `/api/auth/register`
  - POST `/api/marketplace/upload_product`
  - POST `/api/reports` (laporan sampah)
- axios instance (`services/api.js`) harus:
  - Inject JWT dari `AuthContext` header `Authorization: Bearer <token>`
  - Handle 401 -> attempt token refresh -> if fails -> redirect to login
  - Use exponential backoff for transient errors (retry up to N)
  - Sanitize outgoing payloads (remove undefined fields)
  - Centralize error parsing (map backend error codes -> UI messages)

Contoh `api.js` snippet:
```javascript
// filepath: src/services/api.js
// contoh axios instance (instantiation dan interceptor ada di file nyata)
```

---

## 7. STATE MANAGEMENT (CONTEXT + useReducer)
Pattern implementasi:
- AuthContext: `useReducer` dengan actions: LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN, SET_USER
- CartContext: (jika diperlukan) `useReducer` dengan actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, CLEAR_CART
- ThemeContext: toggle theme + persist ke localStorage

Keuntungan:
- Deterministic state transitions (reducer)
- Easy to test (pure functions)
- Lightweight vs Redux untuk aplikasi skala menengah

Contoh reducer skeleton (file: `src/contexts/AuthContext.jsx`):
```javascript
// useReducer with initial state
// actions: LOGIN, LOGOUT, REFRESH
```

---

## 8. AUTH FLOW (FRONT) & KEAMANAN DASAR
Flow:
1. User submits login form -> `authApi.login(credentials)`
2. Backend returns `{ token, user }`. Simpan token secara aman: prefer httpOnly cookie (but requires BE support). Jika tidak memungkinkan, simpan di memory + refresh token in httpOnly cookie.
3. AuthContext dispatch LOGIN -> set user & token (if stored in memory) -> set axios default header
4. For protected routes, use a ProtectedRoute wrapper that checks `isAuthenticated`.

Security tips (frontend):
- Jangan simpan access token di localStorage if refresh tokens available via httpOnly cookie.
- CSR protection: include anti-CSRF token if using cookies.
- Sanitize and validate user input on both sides.
- Limit file upload sizes client-side before upload.
- CORS: use strict allowed origins in BE.

---

## 9. BUILD, DEPLOY & ENVIRONMENT VARIABLES
- Build command: `npm run build`. Output: `dist/`
- Environment variables for Vite: prefiks `VITE_` (mis: `VITE_API_BASE_URL`)
- CI/CD: build artifacts from FE then serve via CDN or static host (Vercel/Netlify/S3+CloudFront).
- For Docker: multistage build:
  - stage build: npm ci && npm run build
  - stage serve: nginx serve `dist/`

Contoh Dockerfile (ringkas):
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 10. DEBUGGING & PERFORMANCE CHECKLIST (PRAKTIS)
Symptoms umum: slow initial load, large bundle, laggy UIs.

Step-by-step:
1. Measure baseline:
   - Lighthouse (Chrome DevTools) -> record metrics: FCP, LCP, TTI, TBT, CLS.
   - Network tab: check large assets & blocking requests.
2. Bundle analysis:
   - `npm run build` + `webpack-bundle-analyzer` or `source-map-explorer` for Vite builds.
   - Target: split vendor + app; remove unused libs.
3. Component re-renders:
   - React DevTools Profiler -> identify components with frequent re-render.
   - Use `React.memo`, `useMemo`, `useCallback` selectively.
4. Code-splitting & lazy loading:
   - Route-based: React.lazy for pages.
   - Component-level: lazy load heavy components (maps, charts, AI chat).
5. Image optimization:
   - Resize server-side; serve webp/avif; use srcset; lazy load images with placeholder.
6. Caching & SW:
   - Use Workbox to precache shell, runtime cache for images/API with stale-while-revalidate.
7. Network optimization:
   - Enable gzip/brotli on server; use HTTP/2.
8. DevTools profiling:
   - Memory snapshot to identify leaks (e.g., unremoved intervals, listeners).
9. Database queries (BE): index hotspot queries, paginate.

Measurable goal: reduce TTFB + LCP to < 2.5s on 3G simulated, bundle < 200KB gzipped for initial route.

Tools & commands:
- Lighthouse: Chrome DevTools -> Lighthouse
- Bundle analyze: `npx source-map-explorer dist/assets/index-*.js`
- Profiler: React DevTools
- Network: Chrome -> Performance -> Capture

---

## 11. TESTING & QA (REKOMENDASI SINGKAT)
- Unit tests: Jest + React Testing Library (components + hooks)
- Integration: msw (Mock Service Worker) for API mocking
- E2E: Cypress for critical user flows (auth, upload, checkout)
- Performance: Lighthouse CI in CI pipeline
- Security scanning: npm audit + Snyk

Contoh jest script di package.json:
```json
"test": "vitest"
```
(Atau setup Jest if preferred.)

---

## 12. PANDUAN PENGEMBANGAN LANJUTAN
- Migrasi state ke Redux Toolkit jika state kompleks / cross-cutting heavy.  
- Tambahkan server-side rendering (SSR) / SSG (Next.js) jika SEO diperlukan untuk public marketplace pages.  
- AI integration: FE sudah sediakan `features/aiAssistant` — connect ke AI microservice melalui secure endpoint; stream chat responses for better UX.  
- Mobile: convert to PWA (manifest + service worker) or reuse logic in React Native with shared component primitives.

---

## 13. CATATAN TEKNIS PENTING & BEST PRACTICES
- Keep components small and single-responsibility.  
- Centralize API layer & error handling.  
- Use types (TypeScript) for larger codebases — strongly recommended.  
- Linting & formatting (ESLint + Prettier) enforced pre-commit hooks.  
- Document public components & hooks with JSDoc.

---

## 14. KONTRIBUSI & WORKFLOW
- Branching: feature/<ticket>-short-desc  
- PR checklist: lint pass, tests added, components documented, story or demo screenshot.  
- Review: peer review required; run local build and smoke test.

---

## 15. QUICK REFERENCE: PERINTAH PENTING
- Install: `npm install`  
- Dev: `npm run dev`  
- Build: `npm run build`  
- Preview build: `npm run preview`  
- Lint: `npm run lint` (jika tersedia)  
- Test: `npm run test`

---

## 16. REFERENSI & LINK
- Vite: https://vitejs.dev/  
- Tailwind CSS: https://tailwindcss.com/  
- React Router v6: https://reactrouter.com/  
- Workbox: https://developers.google.com/web/tools/workbox

---

## 17. PENUTUP (NOTE PENTING)
README ini adalah dokumentasi tingkat arsitektur yang menjelaskan tanggung jawab folder, alur data, prinsip UI/UX, dan checklist teknis. Untuk perubahan besar (mis: migrasi ke TypeScript, SSR, atau penggantian state management), buat proposal arsitektur terpisah dengan dampak pada CI/CD, testing, dan tugas migrasi.

Jika diperlukan, saya dapat membuat dokumentasi tambahan:
- OpenAPI spec untuk endpoint yang digunakan FE  
- Contoh proxy Vite config untuk pengembangan terintegrasi BE  
- Skrip Docker Compose untuk menjalankan FE + BE + DB lokal

---


2244zem: saya ingin menyalin dengan muda semuanya tapi tidak bisa]

GitHub Copilot: GitHub Copilot

Berikut dua cara cepat untuk menyalin seluruh isi README ke file lokal (Windows + VS Code). Pilih salah satu yang nyaman.

1) Cara mudah (GUI / VS Code)
- Di chat: klik tombol "Copy" pada block kode atau pilih teks block -> Ctrl+C.  
- Buka VS Code, buka file: README.md  
- Select All (Ctrl+A) -> Paste (Ctrl+V) -> Save (Ctrl+S).

2) Cara langsung via PowerShell (menimpa file)
- Buka PowerShell sebagai user biasa.
- Salin seluruh block README di bawah, lalu jalankan perintah ini (atau simpan sebagai script .ps1):

```powershell
$content = @"
# ECOAPP — Frontend (FE) README

Versi: 1.0.0  
Lokasi file: d:\lomba-kh-2025\FE

Ringkasan:  
Repositori ini adalah frontend aplikasi ECOAPP — single-page React app (Vite) menggunakan Tailwind CSS. README ini memberikan penjelasan terperinci tentang fitur, UI/UX, arsitektur, fungsi setiap folder/file, setup dan run, integrasi backend, best practices, debugging & performance checklist, dan panduan singkat untuk pengembangan lanjutan. Penjelasan bersifat analitis dan teknis (tingkat senior/arsitek).

---

## DAFTAR ISI
1. Tujuan proyek & ringkasan fitur  
2. Prinsip UI/UX yang diterapkan  
3. Struktur folder (penjelasan rinci tiap folder/file)  
4. Arsitektur komponen & alur data  
5. Setup & menjalankan lokal (step-by-step)  
6. Integrasi API & pattern komunikasi  
7. State management (Context + useReducer) — penjelasan implementasi  
8. Auth flow (front) & keamanan dasar  
9. Build, deploy & environment variables  
10. Debugging & performance checklist (Chrome DevTools, bundle analysis, optimasi)  
11. Testing & QA rekomendasi singkat  
12. Catatan pengembangan lanjutan (AI, mobile, backend)  
13. Kontak & kontribusi

---

## 1. TUJUAN PROYEK & RINGKASAN FITUR
ECOAPP adalah platform berbasis komunitas untuk:
- Marketplace karya daur ulang (unggah, lihat, beli/tebus)
- Sistem laporan sampah & penjemputan
- Dompet digital / transaksi mikro (mock)
- Profil pengguna & pengaturan
- Fitur AI/assistant (struktur tersedia di FE/features/aiAssistant)
Tujuan FE: UI modern, akses cepat, mobile-first, kode modular dan mudah di-maintain.

---

## 2. PRINSIP UI/UX YANG DITERAPKAN
- Mobile-first responsif: menggunakan utility-first Tailwind untuk breakpoint yang konsisten.  
- Konsistensi visual: komponen dasar (Button, Input, Navbar) digunakan ulang agar pattern UI konsisten.  
- Accessibility (a11y): fokus tab, label untuk input, kontras warna minimal.  
- Progressive enhancement: fitur inti (browsing produk, melihat detail) berfungsi tanpa JS berat.  
- Feedback & state transitions: loading indicators, skeletons, toasts/modals untuk aksi yang memerlukan waktu.  
- Minimal cognitive load: halaman bersih, hirarki informasi jelas (CTA primer/sekunder).

UI flows penting:
- Onboarding -> Auth (login/register) -> Home -> Marketplace -> ProductDetail -> Cart/Checkout -> Profile -> Reports

UX micro-patterns:
- Inline validation pada forms (login/register/upload)  
- Modal untuk upload / detail (non-disruptive)  
- Optimized image loading (small thumbnails dan lazy loading pada lists)

---

## 3. STRUKTUR FOLDER — PENJELASAN TERPERINCI
Root FE berisi konfigurasi build, Tailwind, Vite, dsb.

- `index.html`  
  Titik HTML entry. Pastikan meta tag (viewport, theme-color) disesuaikan untuk PWA nanti.

- `package.json`  
  Scripts (dev, build, preview), dependensi runtime & dev. Gunakan `npm run dev` untuk development.

- `tailwind.config.js`  
  Konfigurasi tema, extend warna, safelist class, dan content paths (`./src/**/*.{js,jsx,ts,tsx}`).

- `vite.config.js`  
  Config Vite (alias, proxy untuk API saat dev).

- `public/`  
  Static assets served as-is (favicon, robots, static images).

- `src/` (Sumber utama — bahasan rinci di bawah)

  - `App.jsx`  
    Root React component — mengatur global providers (AuthProvider, ThemeProvider), Router, dan global layout (Navbar/Footer). Jangan letakkan banyak logika di sini.

  - `main.jsx`  
    Mount React ke DOM. Tempat inject global CSS (`index.css`, Tailwind base`).

  - `index.css`, `App.css`  
    Global CSS + Tailwind imports. `index.css` biasanya berisi:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    Tambahkan variabel CSS untuk theme switching di `App.css` jika diperlukan.

  - `assets/`  
    Gambar, ikon, placeholder. Prefer webp/avif untuk performance. Nama file konsisten: `product-<id>.webp`.

  - `components/` (atomic / shared components)
    - `Button.jsx` — komponen tombol (primary/secondary/ghost). Props: size, variant, disabled, onClick.
    - `Input.jsx` — input terkontrol dengan label dan error handling.
    - `Navbar.jsx` — navigasi top-level, menampilkan status auth, ikon cart, theme toggle.
    - `Error404.jsx` — fallback route.
    - `Register.jsx` & `ReportModal.jsx` & `ThemeToggle.jsx` — utilities UI.
    Catatan: Semua komponen harus small, stateless jika mungkin; menerima props; menggunakan tailwind classes.

  - `contexts/`
    - `AuthContext.jsx` — global auth store (token, user). Menggunakan `useReducer` untuk transisi state (LOGIN, LOGOUT, REFRESH).
    - `ThemeContext.jsx` — theme (dark/light) persistence di localStorage.

  - `features/` (domain-specific)
    Struktur berdasar fitur (feature folder pattern). Masing-masing folder menyimpan halaman, subkomponen, dan service spesifik:
    - `auth/` — UI login/register + `services/authApi.js` (api calls: /api/login, /api/register)
    - `marketplaceKarya/` — Product list, ProductCard.jsx, ProductDetailModal.jsx, UploadProductModal.jsx
    - `petaSampah/` — map based features, services/laporanApi.js untuk laporan sampah
    - `profilPengguna/` — profile page, profilSlice.js (placeholder untuk redux-slice pattern jika migrasi diperlukan), components: PasswordChange, ProfilePictureUpload, RiwayatLaporan
    - `aiAssistant/` — AI chatbox component (frontend hook + service interaction to AI backend)

  - `hooks/`
    - `useAuth.js` — helper for auth context: getUser(), isAuthenticated(), refreshToken()
    - `useGeolocation.js` — wrapper navigator.geolocation with fallbacks & permissions handling
    - `useZhipuAI.js` — abstraction to call AI service (throttling, streaming handling)

  - `pages/`
    - `Auth.jsx`, `Pengaturan.jsx`, `PlaceholderPage.jsx`, dan halaman fitur (BankSampah, CarbonCalculator, HargaSampah, Penjemputan, RiwayatTukar, TukarSampah)
    Pattern: pages hanya orchestration; heavy logic moved to hooks/services.

  - `services/`
    - `api.js` — axios instance (baseURL, interceptors for auth token, retry/backoff)
    - `authApi.js` — auth-related endpoints
    - `zhipuAiService.js` — calls to AI microservices (use fetch/axios, support streaming if required)
    Security: axios interceptors should remove sensitive headers on cross-origin redirects.

  - `styles/`
    - `globals.css`, `ai-chat.css` — scoping CSS only when necessary (prefer tailwind utilities; minimal custom css)

  - `utils/`
    - `formatters.js` — currency, date, truncate utilities. Pure functions, unit-testable.

---

## 4. ARSITEKTUR KOMPONEN & ALUR DATA
- Pattern: feature-first + shared components + context for cross-cutting concerns.  
- Data flow: Components -> hooks/service -> api.js (axios) -> backend -> response -> update context/local state.

Contoh alur permintaan data produk:
1. `MarketplacePage` mount -> call `useEffect` -> `services/api.fetchProducts()`
2. `api.js` axios instance sends GET `/api/products`
3. Response -> map to model -> setPageState(products)
4. `ProductList` renders `ProductCard` (memoized) dengan lazy-loading image.

Optimasi:
- Memoize `ProductCard` dengan React.memo and key props to reduce rerenders.
- Virtualize lists jika > 50 items (react-window/react-virtual).
- Use Suspense + lazy for modals/pages.

---

## 5. SETUP & MENJALANKAN LOKAL (STEP-BY-STEP)

Persyaratan:
- Node.js >= 18, npm/yarn, Git

Langkah:
1. Buka terminal di folder FE:
   - Windows (PowerShell / cmd):
     ```bash
     cd d:\lomba-kh-2025\FE
     npm install
     ```
2. Setup env untuk dev (jika menggunakan proxy API): buat file `.env` (ingat .env tidak dimasukkan ke VCS)
   contoh `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_AI_SERVICE_URL=http://localhost:8000
   ```
3. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Akses: http://localhost:5173 (default Vite)
4. Build production:
   ```bash
   npm run build
   npm run preview
   ```

Notes: Jika backend (BE) berada pada BE, sesuaikan `VITE_API_BASE_URL` ke alamat tempat server BE berjalan.

---

## 6. INTEGRASI API & PATTERN KOMUNIKASI
- Gunakan REST endpoints yang disediakan BE (lihat folder BE untuk list endpoint). Pattern:
  - GET `/api/products`
  - GET `/api/products/:id`
  - POST `/api/auth/login`
  - POST `/api/auth/register`
  - POST `/api/marketplace/upload_product`
  - POST `/api/reports` (laporan sampah)
- axios instance (`services/api.js`) harus:
  - Inject JWT dari `AuthContext` header `Authorization: Bearer <token>`
  - Handle 401 -> attempt token refresh -> if fails -> redirect to login
  - Use exponential backoff for transient errors (retry up to N)
  - Sanitize outgoing payloads (remove undefined fields)
  - Centralize error parsing (map backend error codes -> UI messages)

Contoh `api.js` snippet:
```javascript
// filepath: src/services/api.js
// contoh axios instance (instantiation dan interceptor ada di file nyata)
```

---

## 7. STATE MANAGEMENT (CONTEXT + useReducer)
Pattern implementasi:
- AuthContext: `useReducer` dengan actions: LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN, SET_USER
- CartContext: (jika diperlukan) `useReducer` dengan actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, CLEAR_CART
- ThemeContext: toggle theme + persist ke localStorage

Keuntungan:
- Deterministic state transitions (reducer)
- Easy to test (pure functions)
- Lightweight vs Redux untuk aplikasi skala menengah

Contoh reducer skeleton (file: `src/contexts/AuthContext.jsx`):
```javascript
// useReducer with initial state
// actions: LOGIN, LOGOUT, REFRESH
```

---

## 8. AUTH FLOW (FRONT) & KEAMANAN DASAR
Flow:
1. User submits login form -> `authApi.login(credentials)`
2. Backend returns `{ token, user }`. Simpan token secara aman: prefer httpOnly cookie (but requires BE support). Jika tidak memungkinkan, simpan di memory + refresh token in httpOnly cookie.
3. AuthContext dispatch LOGIN -> set user & token (if stored in memory) -> set axios default header
4. For protected routes, use a ProtectedRoute wrapper that checks `isAuthenticated`.

Security tips (frontend):
- Jangan simpan access token di localStorage if refresh tokens available via httpOnly cookie.
- CSR protection: include anti-CSRF token if using cookies.
- Sanitize and validate user input on both sides.
- Limit file upload sizes client-side before upload.
- CORS: use strict allowed origins in BE.

---

## 9. BUILD, DEPLOY & ENVIRONMENT VARIABLES
- Build command: `npm run build`. Output: `dist/`
- Environment variables for Vite: prefiks `VITE_` (mis: `VITE_API_BASE_URL`)
- CI/CD: build artifacts from FE then serve via CDN or static host (Vercel/Netlify/S3+CloudFront).
- For Docker: multistage build:
  - stage build: npm ci && npm run build
  - stage serve: nginx serve `dist/`

Contoh Dockerfile (ringkas):
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 10. DEBUGGING & PERFORMANCE CHECKLIST (PRAKTIS)
Symptoms umum: slow initial load, large bundle, laggy UIs.

Step-by-step:
1. Measure baseline:
   - Lighthouse (Chrome DevTools) -> record metrics: FCP, LCP, TTI, TBT, CLS.
   - Network tab: check large assets & blocking requests.
2. Bundle analysis:
   - `npm run build` + `webpack-bundle-analyzer` or `source-map-explorer` for Vite builds.
   - Target: split vendor + app; remove unused libs.
3. Component re-renders:
   - React DevTools Profiler -> identify components with frequent re-render.
   - Use `React.memo`, `useMemo`, `useCallback` selectively.
4. Code-splitting & lazy loading:
   - Route-based: React.lazy for pages.
   - Component-level: lazy load heavy components (maps, charts, AI chat).
5. Image optimization:
   - Resize server-side; serve webp/avif; use srcset; lazy load images with placeholder.
6. Caching & SW:
   - Use Workbox to precache shell, runtime cache for images/API with stale-while-revalidate.
7. Network optimization:
   - Enable gzip/brotli on server; use HTTP/2.
8. DevTools profiling:
   - Memory snapshot to identify leaks (e.g., unremoved intervals, listeners).
9. Database queries (BE): index hotspot queries, paginate.

Measurable goal: reduce TTFB + LCP to < 2.5s on 3G simulated, bundle < 200KB gzipped for initial route.

Tools & commands:
- Lighthouse: Chrome DevTools -> Lighthouse
- Bundle analyze: `npx source-map-explorer dist/assets/index-*.js`
- Profiler: React DevTools
- Network: Chrome -> Performance -> Capture

---

## 11. TESTING & QA (REKOMENDASI SINGKAT)
- Unit tests: Jest + React Testing Library (components + hooks)
- Integration: msw (Mock Service Worker) for API mocking
- E2E: Cypress for critical user flows (auth, upload, checkout)
- Performance: Lighthouse CI in CI pipeline
- Security scanning: npm audit + Snyk

Contoh jest script di package.json:
```json
"test": "vitest"
```
(Atau setup Jest if preferred.)

---

## 12. PANDUAN PENGEMBANGAN LANJUTAN
- Migrasi state ke Redux Toolkit jika state kompleks / cross-cutting heavy.  
- Tambahkan server-side rendering (SSR) / SSG (Next.js) jika SEO diperlukan untuk public marketplace pages.  
- AI integration: FE sudah sediakan `features/aiAssistant` — connect ke AI microservice melalui secure endpoint; stream chat responses for better UX.  
- Mobile: convert to PWA (manifest + service worker) atau reuse logic in React Native dengan shared component primitives.

---

## 13. CATATAN TEKNIS PENTING & BEST PRACTICES
- Keep components small and single-responsibility.  
- Centralize API layer & error handling.  
- Use types (TypeScript) for larger codebases — strongly recommended.  
- Linting & formatting (ESLint + Prettier) enforced pre-commit hooks.  
- Document public components & hooks with JSDoc.

---

## 14. KONTRIBUSI & WORKFLOW
- Branching: feature/<ticket>-short-desc  
- PR checklist: lint pass, tests added, components documented, story or demo screenshot.  
- Review: peer review required; run local build and smoke test.

---

## 15. QUICK REFERENCE: PERINTAH PENTING
- Install: `npm install`  
- Dev: `npm run dev`  
- Build: `npm run build`  
- Preview build: `npm run preview`  
- Lint: `npm run lint` (jika tersedia)  
- Test: `npm run test`

---

## 16. REFERENSI & LINK
- Vite: https://vitejs.dev/  
- Tailwind CSS: https://tailwindcss.com/  
- React Router v6: https://reactrouter.com/  
- Workbox: https://developers.google.com/web/tools/workbox

---

## 17. PENUTUP (NOTE PENTING)
README ini adalah dokumentasi tingkat arsitektur yang menjelaskan tanggung jawab folder, alur data, prinsip UI/UX, dan checklist teknis. Untuk perubahan besar (mis: migrasi ke TypeScript, SSR, atau penggantian state management), buat proposal arsitektur terpisah dengan dampak pada CI/CD, testing, dan tugas migrasi.

Jika diperlukan, saya dapat membuat dokumentasi tambahan:
- OpenAPI spec untuk endpoint yang digunakan FE  
- Contoh proxy Vite config untuk pengembangan terintegrasi BE  
- Skrip Docker Compose untuk menjalankan FE + BE + DB lokal
"@
Set-Content -Path "d:\lomba-kh-2025\FE\README.md" -Value $content -Encoding UTF8
```

Jika masih bermasalah: jelaskan error / perilaku (mis. tombol paste tidak aktif, permission denied) dan saya beri perintah troubleshooting singkat.