// src/features/profilPengguna/index.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilPengguna = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profil');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Debug: Cek apakah component terload
  console.log('🔍 ProfilPengguna component loaded');
  console.log('👤 User data:', user);
  console.log('🔄 Update profile function:', updateProfile);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      console.log('💾 Saving profile:', formData);
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Gagal memperbarui profil. Silakan coba lagi.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }
    
    setIsVerifyingEmail(true);
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (verificationCode === '123456') {
      alert('Password berhasil diubah!');
      setIsChangingPassword(false);
      setIsVerifyingEmail(false);
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setVerificationCode('');
    } else {
      alert('Kode verifikasi salah!');
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const getRandomColor = (str) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500'
    ];
    const index = str ? str.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const userColor = user ? getRandomColor(user.name) : 'from-gray-500 to-gray-600';

  const stats = [
    { icon: '📝', label: 'Laporan Sampah', value: '12', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: '♻️', label: 'Didaur Ulang', value: '8', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: '⭐', label: 'Poin', value: user?.points || '0', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { icon: '💰', label: 'Transaksi', value: '5', color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: '🌱', label: 'Karbon Dikurangi', value: '2.5kg', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { icon: '🏆', label: 'Pencapaian', value: '3', color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const activities = [
    { icon: '📝', action: 'Melaporkan sampah', location: 'Jl. Merdeka No. 123', time: '2 jam lalu', points: '+10' },
    { icon: '♻️', action: 'Menukar sampah', location: 'Bank Sampah Hijau', time: '1 hari lalu', points: '+25' },
    { icon: '🛍️', action: 'Pembelian marketplace', location: 'EcoStore', time: '2 hari lalu', points: '-50' },
    { icon: '🌱', action: 'Menyelesaikan challenge', location: 'Challenge Harian', time: '3 hari lalu', points: '+30' }
  ];

  // Jika user belum login, tampilkan pesan
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 pt-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Akses Ditolak</h2>
          <p className="text-gray-600 mb-6">Anda harus login terlebih dahulu untuk mengakses halaman profil.</p>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Profil */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <div className={`w-32 h-32 bg-gradient-to-br ${userColor} rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl`}>
                  {getInitials(user?.name)}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-4 border-white rounded-full"></div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-2">{user?.name || 'Pengguna'}</h1>
                <p className="text-green-100 text-lg mb-4">{user?.email || 'email@example.com'}</p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <span className="text-green-100">Member sejak</span>
                    <span className="text-white font-semibold ml-2">Jan 2024</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <span className="text-green-100">Level</span>
                    <span className="text-yellow-300 font-semibold ml-2">Eco Warrior</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <span className="text-green-100">Saldo</span>
                    <span className="text-yellow-300 font-semibold ml-2">
                      Rp {user?.balance?.toLocaleString('id-ID') || '0'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                      address: user?.address || '',
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ✏️ Edit Profil
                </button>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🔒 Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-2 mb-8 border border-white/20">
          <div className="flex space-x-2">
            {[
              { id: 'profil', label: '📊 Profil' },
              { id: 'aktivitas', label: '📈 Aktivitas' },
              { id: 'pencapaian', label: '🏆 Pencapaian' },
              { id: 'pengaturan', label: '⚙️ Pengaturan' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Statistik Anda</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'profil' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">👤 Informasi Profil</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Nama Lengkap</label>
                      <p className="text-lg font-semibold text-gray-800">{user?.name || 'Belum diatur'}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                      <p className="text-lg font-semibold text-gray-800">{user?.email || 'Belum diatur'}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Nomor Telepon</label>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.phone || '+62 812-3456-7890'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Alamat</label>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.address || 'Jl. Merdeka No. 123, Jakarta Pusat'}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Bergabung Pada</label>
                      <p className="text-lg font-semibold text-gray-800">15 Januari 2024</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        ✅ Aktif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'aktivitas' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">📈 Aktivitas Terbaru</h3>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.location}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        activity.points.startsWith('+') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.points} poin
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pencapaian' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 Pencapaian Anda</h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-gray-600 text-lg">Fitur pencapaian sedang dalam pengembangan...</p>
                </div>
              </div>
            )}

            {activeTab === 'pengaturan' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Pengaturan Akun</h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔧</div>
                  <p className="text-gray-600 text-lg">Fitur pengaturan sedang dalam pengembangan...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">✏️ Edit Profil</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
                      placeholder="Jl. Merdeka No. 123, Jakarta Pusat"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    💾 Simpan Perubahan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                  >
                    ❌ Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ubah Password */}
      {isChangingPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-8">
              {!isVerifyingEmail ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">🔒 Ubah Password</h2>
                    <button
                      onClick={() => setIsChangingPassword(false)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password Saat Ini</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password Baru</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Password Baru</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        🔐 Verifikasi Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChangingPassword(false)}
                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                      >
                        ❌ Batal
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">📧 Verifikasi Email</h2>
                    <button
                      onClick={() => {
                        setIsVerifyingEmail(false);
                        setIsChangingPassword(false);
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <form onSubmit={handleVerifyEmail} className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📧</div>
                      <p className="text-gray-600 mb-4">
                        Kami telah mengirim kode verifikasi ke email Anda. 
                        Masukkan kode 6 digit yang Anda terima.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kode Verifikasi</label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-center text-2xl font-mono"
                        maxLength={6}
                        placeholder="123456"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Demo: Gunakan kode <strong>123456</strong>
                      </p>
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        ✅ Verifikasi
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVerifyingEmail(false)}
                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                      >
                        ↶ Kembali
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPengguna;