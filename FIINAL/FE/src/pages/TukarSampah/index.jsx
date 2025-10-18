// src/pages/TukarSampah/index.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus, Wallet, Award, Truck, Scale, Calendar } from 'lucide-react';

const TukarSampah = () => {
  const { user, addToBalance, updateUserProfile } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('tukar');
  const [pickupSchedule, setPickupSchedule] = useState({
    date: '',
    time: '',
    address: '',
    notes: ''
  });

  const sampahItems = [
    { 
      id: 1, 
      name: 'Plastik PET', 
      price: 3000, 
      unit: 'kg', 
      icon: '🥤',
      category: 'plastik',
      color: 'from-blue-500 to-cyan-500',
      points: 30,
      description: 'Botol plastik, kemasan minuman'
    },
    { 
      id: 2, 
      name: 'Kertas & Kardus', 
      price: 2000, 
      unit: 'kg', 
      icon: '📦',
      category: 'kertas',
      color: 'from-amber-500 to-orange-500',
      points: 20,
      description: 'Koran, kardus, buku, kertas campur'
    },
    { 
      id: 3, 
      name: 'Kaleng Aluminium', 
      price: 8000, 
      unit: 'kg', 
      icon: '🥫',
      category: 'logam',
      color: 'from-gray-500 to-gray-700',
      points: 80,
      description: 'Kaleng minuman, kemasan aluminium'
    },
    { 
      id: 4, 
      name: 'Kaca & Botol', 
      price: 1500, 
      unit: 'kg', 
      icon: '🍶',
      category: 'kaca',
      color: 'from-emerald-500 to-teal-500',
      points: 15,
      description: 'Botol kaca, pecahan kaca'
    },
    { 
      id: 5, 
      name: 'Elektronik', 
      price: 12000, 
      unit: 'kg', 
      icon: '📱',
      category: 'elektronik',
      color: 'from-purple-500 to-pink-500',
      points: 120,
      description: 'HP rusak, kabel, charger, baterai'
    },
    { 
      id: 6, 
      name: 'Sampah Organik', 
      price: 1000, 
      unit: 'kg', 
      icon: '🍂',
      category: 'organik',
      color: 'from-green-500 to-emerald-500',
      points: 10,
      description: 'Sisa makanan, daun, ranting'
    },
    { 
      id: 7, 
      name: 'Besi & Logam', 
      price: 5000, 
      unit: 'kg', 
      icon: '🔩',
      category: 'logam',
      color: 'from-yellow-600 to-orange-600',
      points: 50,
      description: 'Besi tua, peralatan logam'
    },
    { 
      id: 8, 
      name: 'Tekstil', 
      price: 2500, 
      unit: 'kg', 
      icon: '👕',
      category: 'tekstil',
      color: 'from-red-500 to-pink-500',
      points: 25,
      description: 'Pakaian bekas, kain perca'
    }
  ];

  // Load transaction history from localStorage
  useEffect(() => {
    if (user?.id) {
      const savedHistory = localStorage.getItem(`wasteTransactionHistory_${user.id}`);
      if (savedHistory) {
        try {
          setTransactionHistory(JSON.parse(savedHistory));
        } catch (error) {
          console.error('Error loading transaction history:', error);
        }
      }
    }
  }, [user]);

  const addToCart = (item) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const calculateTotals = () => {
    const totalMoney = selectedItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    const totalPoints = selectedItems.reduce((total, item) => 
      total + (item.points * item.quantity), 0
    );
    const totalWeight = selectedItems.reduce((total, item) => 
      total + item.quantity, 0
    );
    return { totalMoney, totalPoints, totalWeight };
  };

  const { totalMoney, totalPoints, totalWeight } = calculateTotals();

  const handleTukarSampah = async () => {
    if (selectedItems.length === 0) {
      alert('❌ Pilih sampah yang ingin ditukar terlebih dahulu!');
      return;
    }

    if (!user) {
      alert('🔐 Silakan login terlebih dahulu untuk menukar sampah.');
      return;
    }

    const confirmation = window.confirm(
      `Apakah Anda yakin ingin menukar sampah?\n\nTotal Berat: ${totalWeight} kg\nTotal Uang: Rp ${totalMoney.toLocaleString('id-ID')}\nTotal Poin: ${totalPoints.toLocaleString('id-ID')} poin`
    );

    if (!confirmation) return;

    setIsProcessing(true);

    try {
      // Simulasi proses ke server
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update balance user
      await addToBalance(totalMoney);

      // Update user points
      const newPoints = (user.points || 0) + totalPoints;
      await updateUserProfile({ points: newPoints });

      // Buat record transaksi
      const transaction = {
        id: `WT-${Date.now()}`,
        timestamp: new Date().toISOString(),
        totalMoney,
        totalPoints,
        totalWeight,
        items: selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
          subtotalMoney: item.price * item.quantity,
          subtotalPoints: item.points * item.quantity
        })),
        status: 'completed',
        type: 'tukar_sampah'
      };

      // Update transaction history
      const newHistory = [transaction, ...transactionHistory];
      if (newHistory.length > 20) newHistory.splice(20);
      
      setTransactionHistory(newHistory);
      localStorage.setItem(`wasteTransactionHistory_${user.id}`, JSON.stringify(newHistory));

      // Tampilkan modal sukses
      setLastTransaction(transaction);
      setShowSuccessModal(true);

      // Reset keranjang
      setSelectedItems([]);

    } catch (error) {
      console.error('Error dalam penukaran sampah:', error);
      alert('❌ Gagal menukar sampah. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleJemputSampah = async () => {
    if (!pickupSchedule.date || !pickupSchedule.time || !pickupSchedule.address) {
      alert('❌ Harap isi semua data penjemputan!');
      return;
    }

    if (!user) {
      alert('🔐 Silakan login terlebih dahulu untuk menjadwalkan penjemputan.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulasi proses ke server
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Buat record penjemputan
      const pickupRecord = {
        id: `PJ-${Date.now()}`,
        timestamp: new Date().toISOString(),
        scheduledDate: pickupSchedule.date,
        scheduledTime: pickupSchedule.time,
        address: pickupSchedule.address,
        notes: pickupSchedule.notes,
        status: 'scheduled',
        type: 'penjemputan'
      };

      // Update transaction history
      const newHistory = [pickupRecord, ...transactionHistory];
      if (newHistory.length > 20) newHistory.splice(20);
      
      setTransactionHistory(newHistory);
      localStorage.setItem(`wasteTransactionHistory_${user.id}`, JSON.stringify(newHistory));

      // Tampilkan modal sukses
      setLastTransaction(pickupRecord);
      setShowSuccessModal(true);

      // Reset form
      setPickupSchedule({
        date: '',
        time: '',
        address: '',
        notes: ''
      });

    } catch (error) {
      console.error('Error dalam penjadwalan penjemputan:', error);
      alert('❌ Gagal menjadwalkan penjemputan. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0 
    }).format(angka);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryItems = (category) => {
    return sampahItems.filter(item => item.category === category);
  };

  const categories = [...new Set(sampahItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔄 Tukar & Jemput Sampah</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tukarkan sampah menjadi uang dan poin, atau jadwalkan penjemputan sampah di lokasi Anda!
          </p>
        </div>

        {/* User Balance Card */}
        {user && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Saldo Anda</h3>
                  <p className="text-2xl font-bold">
                    {formatRupiah(user.balance || 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm opacity-90">Total Poin</p>
                  <p className="text-xl font-bold flex items-center space-x-1">
                    <Award className="w-5 h-5" />
                    <span>{user.points || 0}</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl shadow-xl p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('tukar')}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'tukar'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Scale className="w-5 h-5" />
                <span>Tukar Sampah</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('jemput')}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'jemput'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Jemput Sampah</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Konten Berdasarkan Tab */}
          <div className="lg:col-span-2">
            {activeTab === 'tukar' ? (
              /* Tab Tukar Sampah */
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Pilih Jenis Sampah</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Scale className="w-4 h-4" />
                    <span>Harga per kilogram</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  {categories.map(category => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 capitalize border-b pb-2">
                        {category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {getCategoryItems(category).map(item => (
                          <div 
                            key={item.id} 
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                                {item.icon}
                              </div>
                              <button
                                onClick={() => addToCart(item)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                              >
                                Tambah
                              </button>
                            </div>
                            
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-green-600 font-semibold">
                                  {formatRupiah(item.price)} / {item.unit}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center space-x-1">
                                  <Award className="w-4 h-4 text-yellow-500" />
                                  <span>{item.points} poin/{item.unit}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Tab Jemput Sampah */
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Jadwalkan Penjemputan</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Gratis penjemputan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tanggal Penjemputan
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={pickupSchedule.date}
                        onChange={(e) => setPickupSchedule({...pickupSchedule, date: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Waktu Penjemputan
                      </label>
                      <select
                        value={pickupSchedule.time}
                        onChange={(e) => setPickupSchedule({...pickupSchedule, time: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Pilih Waktu</option>
                        <option value="08:00-10:00">08:00 - 10:00</option>
                        <option value="10:00-12:00">10:00 - 12:00</option>
                        <option value="13:00-15:00">13:00 - 15:00</option>
                        <option value="15:00-17:00">15:00 - 17:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat Lengkap Penjemputan
                    </label>
                    <textarea
                      value={pickupSchedule.address}
                      onChange={(e) => setPickupSchedule({...pickupSchedule, address: e.target.value})}
                      rows="3"
                      placeholder="Masukkan alamat lengkap untuk penjemputan..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catatan untuk Petugas (Opsional)
                    </label>
                    <textarea
                      value={pickupSchedule.notes}
                      onChange={(e) => setPickupSchedule({...pickupSchedule, notes: e.target.value})}
                      rows="2"
                      placeholder="Contoh: Sampah sudah dipilah, lokasi di belakang rumah..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">
                        💡
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Tips Penjemputan</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Pastikan sampah sudah dipilah sesuai jenis</li>
                          <li>• Sampah dalam kondisi kering dan bersih</li>
                          <li>• Siapkan di tempat yang mudah dijangkau</li>
                          <li>• Petugas akan menghubungi 1 jam sebelum penjemputan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Keranjang & Riwayat */}
          <div className="space-y-6">
            {/* Keranjang */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6" />
                <span>
                  {activeTab === 'tukar' ? 'Keranjang Tukar' : 'Detail Penjemputan'}
                </span>
              </h2>
              
              {activeTab === 'tukar' ? (
                /* Keranjang Tukar Sampah */
                selectedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500 font-medium">Keranjang masih kosong</p>
                    <p className="text-sm text-gray-400 mt-2">Pilih sampah untuk mulai menukar</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {selectedItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{item.icon}</div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span>{formatRupiah(item.price)}/{item.unit}</span>
                                <span className="flex items-center space-x-1">
                                  <Award className="w-3 h-3 text-yellow-500" />
                                  <span>{item.points} poin</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-semibold w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors ml-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Section */}
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Berat:</span>
                        <span className="text-lg font-bold text-blue-600">
                          {totalWeight} kg
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Uang:</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatRupiah(totalMoney)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Poin:</span>
                        <span className="text-lg font-bold text-yellow-600 flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{totalPoints.toLocaleString('id-ID')} poin</span>
                        </span>
                      </div>
                      
                      <button 
                        onClick={handleTukarSampah}
                        disabled={isProcessing || !user}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed mt-4"
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Memproses...</span>
                          </div>
                        ) : (
                          '💰 Tukar Sekarang'
                        )}
                      </button>
                    </div>
                  </>
                )
              ) : (
                /* Detail Penjemputan */
                <div className="space-y-4">
                  {pickupSchedule.date && (
                    <div className="bg-blue-50 rounded-2xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-800">Jadwal Terpilih</p>
                          <p className="text-sm text-blue-600">
                            {new Date(pickupSchedule.date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-blue-600">{pickupSchedule.time}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Keuntungan Penjemputan</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Gratis biaya penjemputan</li>
                      <li>• Sampah ditimbang di lokasi</li>
                      <li>• Pembayaran langsung via transfer</li>
                      <li>• Dapat poin tambahan</li>
                    </ul>
                  </div>

                  <button 
                    onClick={handleJemputSampah}
                    disabled={isProcessing || !user || !pickupSchedule.date || !pickupSchedule.time || !pickupSchedule.address}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      '🚚 Jadwalkan Penjemputan'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Riwayat Transaksi */}
            {transactionHistory.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Riwayat Terbaru</span>
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {transactionHistory.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`font-bold text-sm ${
                          transaction.type === 'tukar_sampah' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {transaction.type === 'tukar_sampah' ? '🔄 Tukar' : '🚚 Jemput'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(transaction.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        {transaction.type === 'tukar_sampah' ? (
                          <>
                            <span>{transaction.totalWeight} kg</span>
                            <span className="flex items-center space-x-1">
                              <Award className="w-3 h-3 text-yellow-500" />
                              <span>+{transaction.totalPoints} poin</span>
                            </span>
                          </>
                        ) : (
                          <span className="text-blue-600">Menunggu penjemputan</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && lastTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-scaleIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {lastTransaction.type === 'tukar_sampah' ? 'Penukaran Berhasil!' : 'Penjemputan Dijadwalkan!'}
            </h3>
            
            {lastTransaction.type === 'tukar_sampah' ? (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Uang:</span>
                  <span className="text-xl font-bold text-green-600">
                    {formatRupiah(lastTransaction.totalMoney)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Poin:</span>
                  <span className="text-xl font-bold text-yellow-600">
                    +{lastTransaction.totalPoints} poin
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Berat:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {lastTransaction.totalWeight} kg
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {new Date(lastTransaction.scheduledDate).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Waktu:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {lastTransaction.scheduledTime}
                  </span>
                </div>
                <div className="text-sm text-gray-600 text-left bg-blue-50 p-3 rounded-xl">
                  <p className="font-semibold mb-1">Petugas akan menghubungi Anda 1 jam sebelum penjemputan.</p>
                  <p>Pastikan sampah sudah dipilah dan siap dijemput.</p>
                </div>
              </div>
            )}

            {lastTransaction.type === 'tukar_sampah' && user && (
              <div className="bg-green-50 rounded-2xl p-4 mb-6">
                <p className="text-green-800 text-sm">
                  Saldo Anda sekarang: <span className="font-bold">{formatRupiah(user.balance || 0)}</span>
                </p>
                <p className="text-green-800 text-sm">
                  Total Poin: <span className="font-bold">{user.points || 0} poin</span>
                </p>
              </div>
            )}

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors duration-300 shadow-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Login Warning */}
      {!user && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-2xl shadow-2xl max-w-sm animate-bounce">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔐</span>
            <div>
              <p className="font-semibold">Login Diperlukan</p>
              <p className="text-sm opacity-90">Silakan login untuk menggunakan layanan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TukarSampah;