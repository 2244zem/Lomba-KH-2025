import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- Upload Product Modal Component ---
const UploadProductModal = ({ onClose, onSubmit, uploading }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Fashion',
    stock: '',
    image: '',
    materials: '',
    dimensions: ''
  });

  const categories = ['Fashion', 'Home Decor', 'Art', 'Accessories', 'Furniture', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi dasar
    if (!formData.name || !formData.price || !formData.stock || !formData.image) {
      alert('Harap isi semua field yang wajib!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🎨 Upload Karya Daur Ulang
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full p-1 transition-colors">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Tas dari Plastik Daur Ulang"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="1000"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="1"
                  max="1000"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Produk *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan tentang produk daur ulang Anda, bahan yang digunakan, keunikan, dll."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bahan yang Digunakan
              </label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                placeholder="Contoh: Plastik kresek, Resin daur ulang, Kayu palet"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Gambar Produk *
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={uploading}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {uploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mengupload...
                  </div>
                ) : (
                  'Upload Karya'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- Product Detail Modal Component ---
const ProductDetailModal = ({ product, onClose, formatRupiah }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    alert(`🎉 Terima kasih! Anda akan membeli ${quantity} ${product.name} seharga ${formatRupiah(product.price * quantity)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📦 Detail Produk</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl hover:bg-gray-100 rounded-full p-1 transition-colors">
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={product.image.trim()} 
                  alt={product.name}
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x600/4ade80/white?text=No+Image';
                  }}
                />
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 text-green-800">
                  <div className="text-3xl">♻️</div>
                  <div>
                    <p className="font-bold text-lg">Produk Ramah Lingkungan</p>
                    <p className="text-sm">Dibuat dari bahan daur ulang yang berkualitas tinggi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                    ⭐ {product.rating}
                  </span>
                  <span>•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-4">
                  {formatRupiah(product.price)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">📖 Deskripsi Produk</h3>
                <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">🛍️ Penjual</span>
                  <span className="font-semibold text-green-700">{product.seller_name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">📦 Stok Tersedia</span>
                  <span className="font-semibold text-orange-600">{product.stock} unit</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">🏷️ Kategori</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                {product.materials && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">🔧 Bahan</span>
                    <span className="font-semibold text-right max-w-[200px] text-sm">{product.materials}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border">
                  <label className="text-gray-700 font-medium">Jumlah:</label>
                  <div className="flex items-center space-x-2">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      -
                    </motion.button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                  <span className="text-sm text-gray-500">Max: {product.stock}</span>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    + Keranjang
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuy}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Beli Sekarang
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Mock Data Produk Daur Ulang ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Tas Tote dari Plastik Kresek",
    description: "Tas stylish dan tahan lama dibuat dari ratusan kantong plastik bekas yang diolah kembali.",
    price: 85000,
    category: "Fashion",
    stock: 15,
    rating: 4.7,
    seller_name: "EcoCraft Studio",
    image: "https://placehold.co/400x400/4ade80/white?text=Tas+Plastik",
    materials: "Plastik kresek daur ulang"
  },
  {
    id: 2,
    name: "Lampu Hias dari Botol Kaca",
    description: "Lampu dekoratif unik dari botol kaca bekas dengan sentuhan seni modern.",
    price: 120000,
    category: "Home Decor",
    stock: 8,
    rating: 4.9,
    seller_name: "GreenLight Art",
    image: "https://placehold.co/400x400/3b82f6/white?text=Lampu+Botol",
    materials: "Botol kaca bekas, kabel LED"
  },
  {
    id: 3,
    name: "Patung Mini dari Kaleng Bekas",
    description: "Karya seni 3D dari kaleng minuman bekas yang disusun menjadi bentuk abstrak.",
    price: 250000,
    category: "Art",
    stock: 5,
    rating: 4.8,
    seller_name: "Recycle Artist",
    image: "https://placehold.co/400x400/8b5cf6/white?text=Patung+Kaleng",
    materials: "Kaleng aluminium bekas"
  },
  {
    id: 4,
    name: "Gelang dari Sedotan Kertas",
    description: "Aksesoris ramah lingkungan dari sedotan kertas bekas yang diwarnai alami.",
    price: 35000,
    category: "Accessories",
    stock: 30,
    rating: 4.5,
    seller_name: "EcoChic",
    image: "https://placehold.co/400x400/ec4899/white?text=Gelang+Sedotan",
    materials: "Sedotan kertas daur ulang"
  },
  {
    id: 5,
    name: "Meja Kecil dari Palet Kayu",
    description: "Meja multifungsi dari palet kayu bekas dengan finishing natural.",
    price: 450000,
    category: "Furniture",
    stock: 3,
    rating: 4.6,
    seller_name: "WoodUpcycle",
    image: "https://placehold.co/400x400/14b8a6/white?text=Meja+Palet",
    materials: "Palet kayu bekas"
  }
];

// --- Main Component ---
const MarketplaceKarya = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploading, setUploading] = useState(false);

  const categories = ['All', 'Fashion', 'Home Decor', 'Art', 'Accessories', 'Furniture'];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (newProduct) => {
    setUploading(true);
    
    // Simulasi upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const product = {
      ...newProduct,
      id: Date.now(),
      seller_name: user?.full_name || user?.username || 'User Demo',
      rating: 4.5,
      stock: parseInt(newProduct.stock),
      price: parseInt(newProduct.price)
    };
    
    setProducts([product, ...products]);
    setShowUploadModal(false);
    setUploading(false);
    
    alert('✅ Produk berhasil diupload!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🌱 Marketplace Karya Daur Ulang
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan karya kreatif ramah lingkungan yang dibuat dengan penuh cinta dari bahan daur ulang
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Cari produk daur ulang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute left-4 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-w-[150px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="flex gap-3">
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center space-x-2 shadow-lg"
              >
                <span>+</span>
                <span>Upload Karya</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/auth';
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center space-x-2 shadow-lg"
              >
                <span>🔐</span>
                <span>Login Demo</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-lg border-2 border-dashed border-green-200"
          >
            <div className="text-6xl mb-4 text-green-500">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada produk yang sesuai</h3>
            <p className="text-gray-500">Coba ubah kata pencarian atau pilih kategori lain</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border border-green-50"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image.trim()} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x400/4ade80/white?text=No+Image';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    ♻️ Daur Ulang
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{product.name}</h3>
                    <span className="text-green-600 font-bold ml-2 text-sm">{formatRupiah(product.price)}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-medium text-green-700">By {product.seller_name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐ {product.rating}</span>
                      <span>•</span>
                      <span className="text-orange-500 font-medium">Stok: {product.stock}</span>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md"
                  >
                    Lihat Detail
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showUploadModal && (
            <UploadProductModal
              onClose={() => setShowUploadModal(false)}
              onSubmit={handleAddProduct}
              uploading={uploading}
            />
          )}

          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              formatRupiah={formatRupiah}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarketplaceKarya;