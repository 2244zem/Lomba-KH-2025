// src/features/pencapaian/components/index.jsx
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const Pencapaian = () => {
  const { user } = useAuth();

  const achievements = [
    { id: 1, name: 'Pemula Eco', description: 'Lakukan transaksi pertama', icon: '🌱', progress: 100, completed: true, reward: 100 },
    { id: 2, name: 'Kolektor Plastik', description: 'Kumpulkan 10kg sampah plastik', icon: '🥤', progress: 70, completed: false, reward: 250 },
    { id: 3, name: 'Pahlawan Daur Ulang', description: 'Tukar sampah 5 kali', icon: '♻️', progress: 40, completed: false, reward: 500 },
    { id: 4, name: 'Pelapor Aktif', description: 'Laporkan 3 lokasi sampah', icon: '📝', progress: 33, completed: false, reward: 300 },
    { id: 5, name: 'Eco Warrior', description: 'Dapatkan 1000 poin', icon: '🏆', progress: 25, completed: false, reward: 1000 },
    { id: 6, name: 'Bank Sampah Master', description: 'Kunjungi 5 bank sampah', icon: '🏦', progress: 20, completed: false, reward: 750 },
  ];

  const badges = [
    { id: 1, name: 'Eco Starter', icon: '🟢', earned: true },
    { id: 2, name: 'Plastic Hunter', icon: '🔵', earned: true },
    { id: 3, name: 'Recycle Expert', icon: '🟡', earned: false },
    { id: 4, name: 'Eco Warrior', icon: '🟣', earned: false },
    { id: 5, name: 'Earth Savior', icon: '🟠', earned: false },
    { id: 6, name: 'Eco Legend', icon: '🔴', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏆 Pencapaian</h1>
          <p className="text-lg text-gray-600">
            Raih prestasi dan kumpulkan badge spesial dalam perjalanan Eco Anda
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold text-gray-800">Pencapaian</h3>
            <p className="text-2xl font-bold text-purple-600">2/15</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-lg font-semibold text-gray-800">Total Poin</h3>
            <p className="text-2xl font-bold text-yellow-600">{user?.points || 0}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="text-lg font-semibold text-gray-800">Level</h3>
            <p className="text-2xl font-bold text-green-600">Pemula</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements List */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Pencapaian Tersedia</h2>
            
            <div className="space-y-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className={`p-4 rounded-2xl border-2 ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl ${achievement.completed ? 'text-green-500' : 'text-gray-400'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.completed ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        {achievement.name}
                        {achievement.completed && (
                          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                            Selesai
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            achievement.completed ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {achievement.progress}% selesai
                        </span>
                        <span className="text-sm font-semibold text-yellow-600">
                          +{achievement.reward} poin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Collection */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🛡️ Koleksi Badge</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className={`p-4 rounded-2xl text-center border-2 ${
                  badge.earned 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-50'
                }`}>
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className={`font-semibold ${
                    badge.earned ? 'text-yellow-800' : 'text-gray-400'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {badge.earned ? 'Terkumpul' : 'Kunci'}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Section */}
            <div className="mt-8 p-4 bg-purple-50 rounded-2xl border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3">📊 Progress Level</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Level Saat Ini:</span>
                  <span className="font-semibold">Pemula</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 bg-purple-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>250/1000 poin</span>
                  <span>Level Berikutnya: Eco Warrior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pencapaian;