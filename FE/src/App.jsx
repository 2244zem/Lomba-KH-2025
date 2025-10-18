import React, { lazy, Suspense, useEffect } from 'react'; // TAMBAHKAN useEffect
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-red-200 dark:border-red-800">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Oops! Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Maaf, terjadi masalah saat memuat halaman. Silakan coba lagi.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <summary className="cursor-pointer font-semibold text-sm">
                  Debug Information
                </summary>
                <pre className="text-xs mt-2 whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🔄 Refresh Halaman
              </button>
              <button
                onClick={() => window.history.back()}
                className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                ↩️ Kembali
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy imports - HAPUS dompetDigital karena sudah dihapus
const TukarSampah = lazy(() => import('./pages/TukarSampah'));
const RiwayatTukar = lazy(() => import('./pages/RiwayatTukar'));
const PetaSampah = lazy(() => import('./features/petaSampah'));
const ProfilPengguna = lazy(() => import('./features/profilPengguna/index'));
const Auth = lazy(() => import('./features/auth'));
const MarketplaceKarya = lazy(() => import('./features/marketplaceKarya'));
const BisnisLingkungan = lazy(() => import('./features/bisnisLingkungan'));
const AIAssistant = lazy(() => import("./features/aiAssistant"));
const PusatDaurUlang = lazy(() => import('./features/pusatDaurUlang'));
const CarbonCalculator = lazy(() => import('./pages/CarbonCalculator'));
const Penjemputan = lazy(() => import('./pages/Penjemputan'));
const BankSampah = lazy(() => import('./pages/BankSampah'));
const HargaSampah = lazy(() => import('./pages/HargaSampah'));

// HAPUS DompetDigital karena sudah dihapus
const Pencapaian = lazy(() => import('./features/pencapaian/components'));
const Pengaturan = lazy(() => import('./features/pengaturan/components'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Memuat EcoSync...
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Menyiapkan pengalaman terbaik untuk Anda
      </p>
    </div>
  </div>
);

const PageLoadingFallback = () => (
  <div className="min-h-96 flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
      <div className="text-sm text-gray-500">Memuat halaman...</div>
    </div>
  </div>
);

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-white/20">
          <div className="text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-8">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sepertinya halaman yang Anda cari telah tersesat dalam perjalanan daur ulang. 
            Mari kita bantu mengembalikannya ke siklus yang benar! 🌍
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => window.history.back()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
            >
              <span>↩️ Kembali</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
            >
              <span>🏠 Beranda</span>
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              💡 Tips Navigasi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-green-700">
                • Gunakan menu navigasi
              </div>
              <div className="text-green-700">
                • Periksa URL yang diketik
              </div>
              <div className="text-green-700">
                • Hubungi support jika perlu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    console.log('🔄 AppContent rendered:', { 
      loading, 
      user: user ? 'Logged in' : 'Not logged in',
      path: location.pathname 
    });
  }, [loading, user, location.pathname]);

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${theme}`}>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PetaSampah />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/profil" element={
                user ? <ProfilPengguna /> : <Navigate to="/auth" replace />
              } />
              <Route path="/auth" element={
                !user ? <Auth /> : <Navigate to="/" replace />
              } />
              <Route path="/pusat-daur-ulang" element={<PusatDaurUlang />} />
              <Route path="/marketplace" element={<MarketplaceKarya />} />
              <Route path="/tukar-sampah" element={<TukarSampah />} />
              <Route path="/bisnis-lingkungan" element={<BisnisLingkungan />} />
              
              <Route path="/penjemputan" element={
                user ? <Penjemputan /> : <Navigate to="/auth" replace />
              } />
              <Route path="/bank-sampah" element={<BankSampah />} />
              <Route path="/harga-sampah" element={<HargaSampah />} />
              <Route path="/carbon-calculator" element={<CarbonCalculator />} />
              <Route path="/riwayat-tukar" element={
                user ? <RiwayatTukar /> : <Navigate to="/auth" replace />
              } />
              
              {/* HAPUS route /dompet karena sudah dihapus */}
              <Route path="/pencapaian" element={
                user ? <Pencapaian /> : <Navigate to="/auth" replace />
              } />
              <Route path="/pengaturan" element={
                user ? <Pengaturan /> : <Navigate to="/auth" replace />
              } />
              <Route 
               path="/profil" 
           element={
           user ? <ProfilPengguna /> : <Navigate to="/auth" replace />
            } 
           />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;