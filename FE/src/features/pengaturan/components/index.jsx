// src/features/pengaturan/components/index.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const Pengaturan = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profil');
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    promoNotifications: false
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserProfile(profileData);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      alert('Gagal memperbarui profil: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">⚙️ Pengaturan</h1>
          <p className="text-lg text-gray-600">
            Kelola akun dan preferensi Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'profil', label: 'Profil Akun', icon: '👤' },
                  { id: 'notifikasi', label: 'Notifikasi', icon: '🔔' },
                  { id: 'keamanan', label: 'Keamanan', icon: '🔒' },
                  { id: 'privacy', label: 'Privasi', icon: '🛡️' },
                  { id: 'bantuan', label: 'Bantuan', icon: '❓' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🚪</span>
                    <span>Keluar</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profil' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Profil Akun</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="+62 ..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        placeholder="Alamat lengkap..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                  >
                    {isLoading ? 'Menyimpan...' : '💾 Simpan Perubahan'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'notifikasi' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🔔 Pengaturan Notifikasi</h2>
                
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <h3 className="font-semibold text-gray-800 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Terima notifikasi via email'}
                          {key === 'pushNotifications' && 'Notifikasi push di browser'}
                          {key === 'transactionAlerts' && 'Alert untuk setiap transaksi'}
                          {key === 'promoNotifications' && 'Promo dan penawaran khusus'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationChange(key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keamanan' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🔒 Keamanan Akun</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <h3 className="font-semibold text-yellow-800 mb-2">💡 Tips Keamanan</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Gunakan kata sandi yang kuat dan unik</li>
                      <li>• Jangan bagikan kode OTP kepada siapapun</li>
                      <li>• Selalu logout dari perangkat bersama</li>
                      <li>• Periksa aktivitas akun secara berkala</li>
                    </ul>
                  </div>

                  <button className="w-full text-left p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Ubah Kata Sandi</h3>
                        <p className="text-sm text-gray-600">Perbarui kata sandi akun Anda</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">Verifikasi 2-Faktor</h3>
                        <p className="text-sm text-gray-600">Tambah lapisan keamanan ekstra</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;