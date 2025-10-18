// src/pages/RiwayatTukar/index.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, MapPin, Clock, Filter, Download, Search } from 'lucide-react';

const RiwayatTukar = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulasi data dari API/localStorage
  useEffect(() => {
    const loadRiwayat = () => {
      setLoading(true);
      // Simulasi loading data
      setTimeout(() => {
        const sampleData = [
          {
            id: 1,
            date: '2024-01-15T10:30:00',
            items: [
              { name: 'Plastik PET', quantity: 2, price: 3000, total: 6000, icon: '🧴' },
              { name: 'Kertas', quantity: 3, price: 2000, total: 6000, icon: '📄' }
            ],
            total: 12000,
            status: 'completed',
            location: 'Bank Sampah Hijau Lestari',
            address: 'Jl. Merdeka No. 123, Jakarta Pusat',
            transactionCode: 'TX-001'
          },
          {
            id: 2,
            date: '2024-01-10T14:20:00',
            items: [
              { name: 'Kaleng Aluminium', quantity: 1, price: 8000, total: 8000, icon: '🥫' }
            ],
            total: 8000,
            status: 'completed',
            location: 'Eco Bank Jakarta',
            address: 'Jl. Sudirman Kav. 25, Jakarta Selatan',
            transactionCode: 'TX-002'
          },
          {
            id: 3,
            date: '2024-01-08T09:15:00',
            items: [
              { name: 'Elektronik', quantity: 2, price: 12000, total: 24000, icon: '📱' },
              { name: 'Kaca', quantity: 1, price: 1500, total: 1500, icon: '🍶' }
            ],
            total: 25500,
            status: 'completed',
            location: 'Bank Sampah Bersih',
            address: 'Jl. Thamrin No. 45, Jakarta Pusat',
            transactionCode: 'TX-003'
          },
          {
            id: 4,
            date: '2024-01-05T16:45:00',
            items: [
              { name: 'Plastik PP', quantity: 5, price: 2000, total: 10000, icon: '🛍️' }
            ],
            total: 10000,
            status: 'pending',
            location: 'Green Point Collection',
            address: 'Jl. Gatot Subroto No. 78, Jakarta Selatan',
            transactionCode: 'TX-004'
          },
          {
            id: 5,
            date: '2024-01-03T11:20:00',
            items: [
              { name: 'Kardus', quantity: 4, price: 1500, total: 6000, icon: '📦' },
              { name: 'Botol Kaca', quantity: 2, price: 1000, total: 2000, icon: '🍶' }
            ],
            total: 8000,
            status: 'completed',
            location: 'Bank Sampah Hijau Lestari',
            address: 'Jl. Merdeka No. 123, Jakarta Pusat',
            transactionCode: 'TX-005'
          }
        ];
        setRiwayat(sampleData);
        setLoading(false);
      }, 1000);
    };

    loadRiwayat();
  }, []);

  const filteredRiwayat = riwayat.filter(transaksi => {
    const matchesFilter = filter === 'all' || transaksi.status === filter;
    const matchesSearch = transaksi.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaksi.transactionCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': 
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-800',
          icon: '✅'
        };
      case 'pending': 
        return { 
          bg: 'bg-yellow-100', 
          text: 'text-yellow-800',
          icon: '⏳'
        };
      case 'cancelled': 
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-800',
          icon: '❌'
        };
      default: 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800',
          icon: '❓'
        };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'pending': return 'Menunggu';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const totalPoin = riwayat
    .filter(t => t.status === 'completed')
    .reduce((sum, transaksi) => sum + transaksi.total, 0);

  const totalTransaksi = riwayat.length;
  const transaksiSelesai = riwayat.filter(t => t.status === 'completed').length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelTransaction = (transactionId) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan transaksi ini?')) {
      setRiwayat(prev => prev.map(t => 
        t.id === transactionId ? { ...t, status: 'cancelled' } : t
      ));
    }
  };

  const handleExportData = () => {
    // Simulasi export data
    alert('Fitur export data akan segera tersedia!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat riwayat transaksi...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 Riwayat Tukar Sampah</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pantau semua transaksi penukaran sampah Anda dan lihat kontribusi Anda terhadap lingkungan
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalTransaksi}</div>
            <div className="text-gray-600 text-sm">Total Transaksi</div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalPoin.toLocaleString('id-ID')}</div>
            <div className="text-gray-600 text-sm">Total Poin</div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{(totalPoin / 1000).toFixed(1)}kg</div>
            <div className="text-gray-600 text-sm">Karbon Dikurangi</div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{transaksiSelesai}</div>
            <div className="text-gray-600 text-sm">Transaksi Selesai</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari transaksi atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              {[
                { value: 'all', label: 'Semua', count: riwayat.length },
                { value: 'completed', label: 'Selesai', count: riwayat.filter(t => t.status === 'completed').length },
                { value: 'pending', label: 'Menunggu', count: riwayat.filter(t => t.status === 'pending').length },
              ].map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    filter === filterOption.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{filterOption.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    filter === filterOption.value ? 'bg-white text-purple-600' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filterOption.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-3 border border-purple-500 text-purple-600 hover:bg-purple-50 rounded-2xl font-semibold transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-6">
          {filteredRiwayat.map(transaksi => {
            const status = getStatusColor(transaksi.status);
            return (
              <div key={transaksi.id} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        Transaksi #{transaksi.transactionCode}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${status.bg} ${status.text}`}>
                        <span>{status.icon}</span>
                        <span>{getStatusText(transaksi.status)}</span>
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(transaksi.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{transaksi.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right mt-4 lg:mt-0">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {transaksi.total.toLocaleString('id-ID')} poin
                    </div>
                    <div className="text-sm text-gray-500">
                      Rp {transaksi.total.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                    <span>📦</span>
                    <span>Detail Sampah</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {transaksi.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{item.icon}</div>
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} kg × Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            Rp {item.total.toLocaleString('id-ID')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.total} poin
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {transaksi.status === 'pending' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleCancelTransaction(transaksi.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>❌</span>
                        <span>Batalkan Transaksi</span>
                      </button>
                      <button className="flex-1 border border-purple-500 text-purple-600 hover:bg-purple-50 py-3 rounded-2xl font-semibold transition-all duration-300">
                        📞 Hubungi Lokasi
                      </button>
                    </div>
                  </div>
                )}

                {transaksi.status === 'completed' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Transaksi berhasil diselesaikan
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                        💰 Tukar Poin
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRiwayat.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchTerm ? 'Transaksi tidak ditemukan' : 'Belum ada transaksi'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {searchTerm 
                ? 'Coba gunakan kata kunci lain atau hapus pencarian'
                : 'Mulai tukar sampah Anda dan lihat riwayat transaksi di sini'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => window.location.href = '/tukar-sampah'}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🔄 Mulai Tukar Sampah
              </button>
            )}
          </div>
        )}

        {/* Pagination (placeholder) */}
        {filteredRiwayat.length > 0 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button className="px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
              ← Sebelumnya
            </button>
            <span className="text-gray-600">Halaman 1 dari 1</span>
            <button className="px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
              Selanjutnya →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatTukar;