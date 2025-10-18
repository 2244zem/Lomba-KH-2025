import React, { useState } from 'react';

const BankSampah = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const bankSampah = [
    {
      id: 1,
      name: 'Bank Sampah Hijau Lestari',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat',
      distance: '0.8 km',
      rating: 4.8,
      open: '08:00 - 17:00',
      phone: '+62 812-3456-7890',
      services: ['Plastik', 'Kertas', 'Kaleng', 'Kaca']
    },
    {
      id: 2,
      name: 'Eco Bank Jakarta',
      address: 'Jl. Sudirman Kav. 25, Jakarta Selatan',
      distance: '1.2 km',
      rating: 4.6,
      open: '07:00 - 18:00',
      phone: '+62 813-4567-8901',
      services: ['Plastik', 'Kertas', 'Elektronik', 'Organik']
    },
    {
      id: 3,
      name: 'Bank Sampah Bersih',
      address: 'Jl. Thamrin No. 45, Jakarta Pusat',
      distance: '1.5 km',
      rating: 4.9,
      open: '09:00 - 16:00',
      phone: '+62 814-5678-9012',
      services: ['Plastik', 'Kertas', 'Kaleng', 'Kaca', 'Elektronik']
    },
    {
      id: 4,
      name: 'Green Point Collection',
      address: 'Jl. Gatot Subroto No. 78, Jakarta Selatan',
      distance: '2.1 km',
      rating: 4.7,
      open: '08:30 - 17:30',
      phone: '+62 815-6789-0123',
      services: ['Plastik', 'Kertas', 'Organik']
    }
  ];

  const filteredBanks = bankSampah.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏦 Bank Sampah</h1>
          <p className="text-lg text-gray-600">Temukan bank sampah terdekat di sekitar Anda</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Cari bank sampah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Bank Sampah List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBanks.map(bank => (
            <div key={bank.id} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{bank.name}</h3>
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <span>⭐</span>
                  <span className="font-semibold">{bank.rating}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>📍</span>
                  <span>{bank.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>📏</span>
                  <span>{bank.distance} dari lokasi Anda</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>🕒</span>
                  <span>{bank.open}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>📞</span>
                  <span>{bank.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Layanan:</h4>
                <div className="flex flex-wrap gap-2">
                  {bank.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105">
                  📍 Arahkan
                </button>
                <button className="flex-1 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-3 rounded-2xl font-semibold transition-all duration-300">
                  📞 Hubungi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankSampah;