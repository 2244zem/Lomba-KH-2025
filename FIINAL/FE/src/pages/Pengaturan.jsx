import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Pengaturan = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    locationAccess: false,
    darkMode: false,
    language: 'id'
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Kembali</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pengaturan</h1>
          <p className="text-gray-600">Kelola preferensi dan pengaturan akun Anda</p>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Akun</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                 onClick={() => navigate('/profil')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Edit Profil</div>
                  <div className="text-sm text-gray-600">Ubah informasi profil Anda</div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                  🔒
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Keamanan</div>
                  <div className="text-sm text-gray-600">Ubah kata sandi dan pengaturan keamanan</div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  💳
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Pembayaran</div>
                  <div className="text-sm text-gray-600">Kelola metode pembayaran</div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Notifikasi</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                  🔔
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Push Notifications</div>
                  <div className="text-sm text-gray-600">Terima notifikasi tentang aktivitas</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.notifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.notifications ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  📧
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Email Updates</div>
                  <div className="text-sm text-gray-600">Terima update melalui email</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('emailUpdates')}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.emailUpdates ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.emailUpdates ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Privasi</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Akses Lokasi</div>
                  <div className="text-sm text-gray-600">Izinkan aplikasi mengakses lokasi</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('locationAccess')}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.locationAccess ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.locationAccess ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Aplikasi</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                  🌙
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Dark Mode</div>
                  <div className="text-sm text-gray-600">Ubah tema aplikasi</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.darkMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                  🌐
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Bahasa</div>
                  <div className="text-sm text-gray-600">Indonesia</div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-red-200">
          <h3 className="text-2xl font-bold text-red-600 mb-6">Zona Bahaya</h3>
          
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-red-200 transition-colors">
                  🚪
                </div>
                <div className="text-left">
                  <div className="font-semibold text-red-600">Logout</div>
                  <div className="text-sm text-red-500">Keluar dari akun Anda</div>
                </div>
              </div>
              <span className="text-red-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-red-200 transition-colors">
                  ⚠️
                </div>
                <div className="text-left">
                  <div className="font-semibold text-red-600">Hapus Akun</div>
                  <div className="text-sm text-red-500">Hapus akun secara permanen</div>
                </div>
              </div>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
