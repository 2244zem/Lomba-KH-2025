import React from 'react';

const HargaSampah = () => {
  const hargaSampah = [
    {
      category: 'Plastik',
      items: [
        { name: 'Plastik PET (Bening)', price: 3000, unit: 'kg', trend: 'up' },
        { name: 'Plastik HDPE', price: 2500, unit: 'kg', trend: 'stable' },
        { name: 'Plastik PP', price: 2000, unit: 'kg', trend: 'up' },
        { name: 'Plastik LDPE', price: 1800, unit: 'kg', trend: 'down' }
      ]
    },
    {
      category: 'Kertas',
      items: [
        { name: 'Karton/Kardus', price: 2000, unit: 'kg', trend: 'stable' },
        { name: 'Kertas HVS', price: 1500, unit: 'kg', trend: 'up' },
        { name: 'Koran/Majalah', price: 1000, unit: 'kg', trend: 'stable' }
      ]
    },
    {
      category: 'Logam',
      items: [
        { name: 'Kaleng Aluminium', price: 8000, unit: 'kg', trend: 'up' },
        { name: 'Kaleng Besi', price: 1500, unit: 'kg', trend: 'stable' },
        { name: 'Tembaga', price: 45000, unit: 'kg', trend: 'up' }
      ]
    },
    {
      category: 'Lainnya',
      items: [
        { name: 'Kaca/Botol', price: 1500, unit: 'kg', trend: 'stable' },
        { name: 'Elektronik', price: 12000, unit: 'kg', trend: 'up' },
        { name: 'Organik (Kompos)', price: 1000, unit: 'kg', trend: 'stable' }
      ]
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💰 Harga Sampah</h1>
          <p className="text-lg text-gray-600">Daftar harga sampah terkini per kg</p>
          <div className="mt-4 text-sm text-gray-500">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {hargaSampah.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                          {getTrendIcon(item.trend)} {item.trend === 'up' ? 'Naik' : item.trend === 'down' ? 'Turun' : 'Stabil'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-600">per {item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Tips Menukar Sampah</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Pilah sampah sesuai jenisnya untuk mendapatkan harga terbaik</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Bersihkan sampah dari kotoran sebelum ditukar</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Kumpulkan dalam jumlah banyak untuk menghemat waktu</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Periksa harga terbaru sebelum menukar</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Gunakan tas yang bisa digunakan kembali</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">Jadwalkan penukaran di jam yang tidak sibuk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HargaSampah;