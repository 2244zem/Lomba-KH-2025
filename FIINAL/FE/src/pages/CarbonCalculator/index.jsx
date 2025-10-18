import React, { useState } from 'react';

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    vehicle: '',
    vehicleDistance: '',
    flights: '',
    waste: '',
    food: 'medium'
  });

  const [result, setResult] = useState(null);

  const calculateCarbon = (data) => {
    let total = 0;
    
    // Electricity (kg CO2 per kWh)
    if (data.electricity) total += data.electricity * 0.85;
    
    // Vehicle (kg CO2 per km)
    if (data.vehicle && data.vehicleDistance) {
      const factors = { car: 0.21, motorcycle: 0.11, bus: 0.08 };
      total += data.vehicleDistance * (factors[data.vehicle] || 0);
    }
    
    // Flights (kg CO2 per flight)
    if (data.flights) total += data.flights * 90;
    
    // Waste (kg CO2 per kg)
    if (data.waste) total += data.waste * 0.5;
    
    // Food (kg CO2 based on diet)
    const foodFactors = { low: 2.5, medium: 5, high: 7.5 };
    total += foodFactors[data.food] || 0;
    
    return Math.round(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const carbonFootprint = calculateCarbon(formData);
    setResult(carbonFootprint);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCarbonLevel = (carbon) => {
    if (carbon < 100) return { level: 'Rendah', color: 'text-green-600', bg: 'bg-green-100' };
    if (carbon < 300) return { level: 'Sedang', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Tinggi', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const carbonTips = [
    'Gunakan transportasi umum atau bersepeda',
    'Matikan lampu dan peralatan elektronik saat tidak digunakan',
    'Kurangi konsumsi daging dan produk hewani',
    'Daur ulang dan kompos sampah organik',
    'Gunakan energi terbarukan jika memungkinkan',
    'Pilih produk lokal untuk mengurangi emisi transportasi'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🌍 Kalkulator Karbon</h1>
          <p className="text-lg text-gray-600">Hitung jejak karbon Anda dan lihat dampaknya terhadap lingkungan</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kalkulator Jejak Karbon</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ⚡ Konsumsi Listrik Bulanan (kWh)
                </label>
                <input
                  type="number"
                  name="electricity"
                  value={formData.electricity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Contoh: 150"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🚗 Jenis Kendaraan
                  </label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  >
                    <option value="">Pilih Kendaraan</option>
                    <option value="car">Mobil</option>
                    <option value="motorcycle">Motor</option>
                    <option value="bus">Bus/Transportasi Umum</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📏 Jarak Tempuh Harian (km)
                  </label>
                  <input
                    type="number"
                    name="vehicleDistance"
                    value={formData.vehicleDistance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    placeholder="Contoh: 20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ✈️ Jumlah Penerbangan Tahunan
                </label>
                <input
                  type="number"
                  name="flights"
                  value={formData.flights}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Contoh: 2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🗑️ Sampah yang Dihasilkan per Minggu (kg)
                </label>
                <input
                  type="number"
                  name="waste"
                  value={formData.waste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Contoh: 5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🍽️ Pola Makan
                </label>
                <select
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                >
                  <option value="low">Vegetarian/Rendah Daging</option>
                  <option value="medium">Seimbang</option>
                  <option value="high">Tinggi Daging</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🌱 Hitung Jejak Karbon
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result !== null && (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hasil Perhitungan</h2>
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">🌍</div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {result} kg CO₂
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getCarbonLevel(result).bg} ${getCarbonLevel(result).color}`}>
                    Tingkat: {getCarbonLevel(result).level}
                  </div>
                  <p className="text-gray-600 mt-4">
                    Ini adalah perkiraan jejak karbon bulanan Anda. 
                    Rata-rata global adalah sekitar 400 kg CO₂ per bulan.
                  </p>
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Tips Mengurangi Jejak Karbon</h2>
              <div className="space-y-3">
                {carbonTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-teal-500 text-xl">🌱</span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;