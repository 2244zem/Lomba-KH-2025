# ECOAPP - Platform Daur Ulang Sampah Modern

## 📖 Tentang Project

ECOAPP adalah solusi digital komprehensif untuk mengatasi masalah sampah melalui pendekatan kolaboratif antara masyarakat, pelaku daur ulang, dan pemerintah. Platform ini memadukan teknologi modern dengan kesadaran lingkungan untuk menciptakan ekonomi sirkular yang berkelanjutan.

## 🎯 Latar Belakang & Motivasi

### Data Fakta Sampah Indonesia
- Produksi sampah nasional: **64 juta ton/tahun**
- Sampah plastik di laut: **1.29 juta ton/tahun**  
- Tingkat daur ulang: **kurang dari 10%**
- Potensi ekonomi terbuang: **Rp 10 triliun/tahun**

### Visi ECOAPP
Menciptakan ekosistem digital yang mengubah sampah dari masalah lingkungan menjadi sumber daya ekonomi melalui partisipasi aktif masyarakat.

## 🏗️ Arsitektur Teknical

### Frontend Stack
```
React 18 → UI Components & State Management
Tailwind CSS → Styling & Responsive Design
Vite → Build Tool & Dev Server
React Router → Client-side Navigation
Context API → Global State Management
Axios → HTTP Client
```

### Backend Stack
```
PHP 8+ → Server-side Logic
MySQL → Database Management
JWT → Authentication System
REST API → Service Architecture
PDO → Database Abstraction
```

### Development Environment
```
XAMPP → Local Server Stack
Git → Version Control
VS Code → Development IDE
Chrome DevTools → Debugging
```

## 📱 Fitur Detail

### 1. Authentication System
- **Registrasi User** - Pendaftaran dengan validasi email
- **Login/Logout** - Sistem autentikasi aman dengan JWT
- **Profile Management** - Kelola data pribadi dan preferensi
- **Session Management** - Auto-login dan token refresh

### 2. Marketplace Daur Ulang
- **Product Catalog** - Katalog produk daur ulang terkategori
- **Product Upload** - Upload produk dengan detail lengkap
- **Search & Filter** - Pencarian dan filter produk
- **Shopping Cart** - Keranjang belanja terintegrasi
- **Transaction History** - Riwayat transaksi lengkap

### 3. Waste Reporting System
- **Interactive Map** - Peta interaktif untuk lokasi sampah
- **Photo Upload** - Upload foto evidence sampah
- **Location Tagging** - Penandaan lokasi GPS
- **Status Tracking** - Tracking status laporan
- **Priority System** - Sistem prioritas berdasarkan kepadatan

### 4. Digital Wallet & Rewards
- **Balance Management** - Kelola saldo dompet digital
- **Point System** - Sistem poin untuk partisipasi
- **Reward Redemption** - Penukaran poin menjadi hadiah
- **Transaction Ledger** - Buku catatan transaksi

### 5. AI Assistant
- **Smart Chatbot** - Asisten virtual untuk bantuan
- **Product Recommendation** - Rekomendasi produk personal
- **Waste Education** - Edukasi pengelolaan sampah
- **Quick Tips** - Tips praktis harian

## 🗂️ Struktur Folder Detail

### Frontend Structure
```
src/
├── components/           # Reusable UI Components
│   ├── ui/              # Basic components (Button, Input, Modal)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── auth/            # Authentication components
├── pages/               # Application Pages
│   ├── Auth/            # Login/Register pages
│   ├── Dashboard/       # Main dashboard
│   ├── Marketplace/     # Product marketplace
│   ├── Reports/         # Waste reporting
│   └── Profile/         # User profile management
├── contexts/            # React Contexts
│   ├── AuthContext.jsx  # Authentication state
│   └── AppContext.jsx   # Global application state
├── services/            # API Services
│   ├── api.js          # Axios instance & config
│   ├── authApi.js      # Authentication API calls
│   └── marketApi.js    # Marketplace API calls
├── hooks/               # Custom React Hooks
│   ├── useAuth.js      # Authentication hook
│   └── useApi.js       # API call hook
├── utils/               # Utility Functions
│   ├── validators.js   # Input validation
│   └── formatters.js   # Data formatting
└── assets/              # Static Assets
    ├── images/          # Image files
    └── styles/          # Global styles
```

### Backend Structure
```
api/
├── auth/                # Authentication Endpoints
│   ├── login.php        # User login
│   ├── register.php     # User registration
│   └── logout.php       # User logout
├── marketplace/         # Marketplace Endpoints
│   ├── products.php     # Product management
│   ├── categories.php   # Product categories
│   └── transactions.php # Transaction handling
├── reports/             # Reporting Endpoints
│   ├── create.php       # Create waste reports
│   ├── list.php         # List user reports
│   └── status.php       # Report status updates
├── users/               # User Management
│   ├── profile.php      # User profile
│   └── wallet.php       # Wallet management
└── config/              # Configuration
    ├── database.php     # Database connection
    └── cors.php         # CORS configuration
```

## ⚙️ Setup & Installation

### Prerequisites Installation
1. **Install Node.js** (versi 18 atau lebih tinggi)
2. **Install XAMPP** (Apache + MySQL + PHP)
3. **Install Git** untuk version control
4. **Code Editor** (VS Code recommended)

### Step-by-Step Setup

#### 1. Database Setup
```sql
-- Create database
CREATE DATABASE ecoapp;

-- Import from file
mysql -u root -p ecoapp < database/ecoapp.sql
```

#### 2. Backend Configuration
```php
// config/database.php
$host = 'localhost';
$dbname = 'ecoapp';
$username = 'root';
$password = '';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Environment Configuration
```env
# .env file
VITE_API_BASE_URL=http://localhost/ecoapp/api
VITE_APP_NAME=ECOAPP
VITE_APP_VERSION=1.0.0
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/logout` | User logout |

### Marketplace
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/marketplace/products` | Get products list |
| POST | `/marketplace/products` | Create new product |
| GET | `/marketplace/products/{id}` | Get product detail |
| PUT | `/marketplace/products/{id}` | Update product |

### Waste Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reports/create` | Create waste report |
| GET | `/reports/list` | Get user reports |
| GET | `/reports/{id}` | Get report detail |

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    balance DECIMAL(10,2) DEFAULT 0,
    points INT DEFAULT 0,
    role ENUM('user', 'admin') DEFAULT 'user',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
npm run build

# The build files will be in 'dist' folder
# Deploy to web server (Apache/Nginx)
```

### Server Configuration
```apache
# .htaccess for Apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] User authentication flow
- [ ] Product CRUD operations
- [ ] Waste reporting system
- [ ] Wallet transactions
- [ ] Responsive design testing
- [ ] Cross-browser compatibility

### Performance Metrics
- First Contentful Paint: < 2s
- Time to Interactive: < 3s
- Mobile Responsiveness: 100%
- API Response Time: < 500ms

## 🔒 Security Features

- JWT Token Authentication
- Password Hashing (bcrypt)
- CORS Protection
- Input Validation & Sanitization
- SQL Injection Prevention
- XSS Protection

## 📞 Support & Maintenance

### Documentation
- API Documentation: `/api/docs`
- Component Library: Storybook
- Database Schema: ER Diagrams

### Monitoring
- Error Tracking: Console logging
- Performance: Chrome DevTools
- Analytics: Custom tracking

---

**ECOAPP** - Innovating Waste Management Through Technology
