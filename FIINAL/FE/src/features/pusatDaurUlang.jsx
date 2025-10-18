// src/features/pusatDaurUlang.jsx
import React, { useState } from 'react';

const PusatDaurUlang = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Data 10 lokasi daur ulang
  const recyclingLocations = [
    {
      id: 1,
      name: "Eco Recycling Center",
      address: "Jl. Merdeka No. 123, Jakarta Pusat",
      types: ["Plastik", "Kertas", "Kaca"],
      hours: "08:00 - 17:00",
      phone: "(021) 1234-5678",
      rating: 4.8,
      distance: "1.2 km",
      image: "🌱"
    },
    {
      id: 2,
      name: "Green Tech Hub",
      address: "Jl. Sudirman Kav. 45, Jakarta Selatan",
      types: ["Elektronik", "Logam", "Baterai"],
      hours: "09:00 - 18:00",
      phone: "(021) 2345-6789",
      rating: 4.6,
      distance: "2.5 km",
      image: "🔧"
    },
    {
      id: 3,
      name: "Plastic Revolution",
      address: "Jl. Thamrin No. 89, Jakarta Pusat",
      types: ["Plastik PET", "Plastik HDPE", "Plastik PP"],
      hours: "07:30 - 16:30",
      phone: "(021) 3456-7890",
      rating: 4.9,
      distance: "3.1 km",
      image: "🔄"
    },
    {
      id: 4,
      name: "Paper Renewal Station",
      address: "Jl. Gatot Subroto No. 67, Jakarta Selatan",
      types: ["Kertas Koran", "Karton", "Majalah"],
      hours: "08:30 - 17:30",
      phone: "(021) 4567-8901",
      rating: 4.7,
      distance: "4.2 km",
      image: "📄"
    },
    {
      id: 5,
      name: "Metal Recovery Point",
      address: "Jl. Rasuna Said No. 34, Jakarta Selatan",
      types: ["Aluminium", "Besi", "Tembaga"],
      hours: "08:00 - 16:00",
      phone: "(021) 5678-9012",
      rating: 4.5,
      distance: "5.0 km",
      image: "⚙️"
    },
    {
      id: 6,
      name: "Glass Transformation Center",
      address: "Jl. Kuningan No. 56, Jakarta Selatan",
      types: ["Botol Kaca", "Pecahan Kaca", "Kaca Jendela"],
      hours: "09:00 - 17:00",
      phone: "(021) 6789-0123",
      rating: 4.8,
      distance: "1.8 km",
      image: "🍶"
    },
    {
      id: 7,
      name: "Organic Compost Hub",
      address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
      types: ["Sampah Organik", "Dedaunan", "Sisa Makanan"],
      hours: "07:00 - 15:00",
      phone: "(021) 7890-1234",
      rating: 4.9,
      distance: "2.3 km",
      image: "🌿"
    },
    {
      id: 8,
      name: "E-Waste Solutions",
      address: "Jl. Senopati No. 78, Jakarta Selatan",
      types: ["Laptop", "Smartphone", "Baterai Lithium"],
      hours: "10:00 - 19:00",
      phone: "(021) 8901-2345",
      rating: 4.7,
      distance: "3.7 km",
      image: "📱"
    },
    {
      id: 9,
      name: "Textile Renewal Center",
      address: "Jl. Kebayoran Baru No. 23, Jakarta Selatan",
      types: ["Pakaian", "Kain", "Sepatu"],
      hours: "08:00 - 17:00",
      phone: "(021) 9012-3456",
      rating: 4.4,
      distance: "4.5 km",
      image: "👕"
    },
    {
      id: 10,
      name: "Community Recycling Park",
      address: "Jl. Pondok Indah No. 90, Jakarta Selatan",
      types: ["Campuran", "Plastik", "Kertas", "Kaca"],
      hours: "06:00 - 14:00",
      phone: "(021) 0123-4567",
      rating: 4.6,
      distance: "2.9 km",
      image: "🏞️"
    }
  ];

  const filteredLocations = recyclingLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
            <span className="text-3xl">♻️</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-700 bg-clip-text text-transparent mb-2">
            Pusat Daur Ulang
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan lokasi daur ulang terdekat dan berkontribusi untuk lingkungan yang lebih bersih
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari lokasi daur ulang, jenis sampah, atau alamat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Lokasi", value: recyclingLocations.length, color: "green", icon: "📍" },
            { label: "Rating Tertinggi", value: "4.9", color: "blue", icon: "⭐" },
            { label: "Jenis Sampah", value: "8+", color: "purple", icon: "🗑️" },
            { label: "Terdekat", value: "1.2 km", color: "orange", icon: "📏" }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className={`rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900 p-3`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{location.image}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{location.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">• {location.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{location.address}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {location.types.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span>🕒 {location.hours}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📞 {location.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Lokasi tidak ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}

        {/* Location Detail Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{selectedLocation.image}</div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-yellow-300">⭐</span>
                        <span className="font-semibold">{selectedLocation.rating}</span>
                        <span>• {selectedLocation.distance}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white text-opacity-90">{selectedLocation.address}</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Jenis Sampah yang Diterima</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.types.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Jam Operasional</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedLocation.hours}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Kontak</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedLocation.phone}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    📞 Hubungi
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    🗺️ Petunjuk Arah
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PusatDaurUlang;