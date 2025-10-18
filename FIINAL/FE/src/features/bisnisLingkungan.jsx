// src/features/bisnisLingkungan.jsx
import React, { useState, useEffect } from 'react';

const BisnisLingkungan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('bisnis');
  const [loading, setLoading] = useState(false);
  const [selectedBisnis, setSelectedBisnis] = useState(null);
  const [selectedArtikel, setSelectedArtikel] = useState(null);

  const ideBisnis = [
    {
      id: 1,
      judul: 'Jasa Kompos Organik',
      deskripsi: 'Mengumpulkan sampah organik dari rumah tangga atau restoran, lalu mengolahnya menjadi kompos berkualitas tinggi untuk dijual secara online.',
      deskripsiLengkap: 'Bisnis jasa kompos organik memanfaatkan limbah dapur dan sampah organik lainnya untuk diolah menjadi pupuk kompos yang bernilai ekonomi. Dengan sistem pengumpulan door-to-door dan kemitraan dengan restoran, bisnis ini tidak hanya menguntungkan tetapi juga membantu mengurangi timbunan sampah organik di TPA.',
      icon: '🌱',
      kategori: 'organik',
      modal: 'Rendah',
      potensi: 'Tinggi',
      warna: 'from-emerald-500 to-green-500',
      targetPasar: 'Petani urban, pecinta tanaman, restoran',
      estimasiPendapatan: 'Rp 5-15 juta/bulan',
      langkahAwal: [
        'Pelajari teknik pengomposan yang baik',
        'Siapkan tempat pengolahan sampah organik',
        'Jalin kemitraan dengan restoran dan kafe',
        'Buat branding dan kemasan yang menarik'
      ]
    },
    {
      id: 2,
      judul: 'Platform Jual Beli Barang Bekas',
      deskripsi: 'Membangun marketplace khusus untuk barang bekas (seperti Thrift). Fokus pada kategori fashion, elektronik, atau furnitur.',
      deskripsiLengkap: 'Platform digital yang menghubungkan penjual dan pembeli barang bekas berkualitas. Fokus pada sustainable fashion dan circular economy dengan sistem rating dan verifikasi produk untuk memastikan kualitas transaksi.',
      icon: '♻️',
      kategori: 'digital',
      modal: 'Sedang',
      potensi: 'Sangat Tinggi',
      warna: 'from-blue-500 to-cyan-500',
      targetPasar: 'Generasi Z, milenial, pecinta thrift',
      estimasiPendapatan: 'Rp 10-50 juta/bulan',
      langkahAwal: [
        'Riset platform marketplace yang sudah ada',
        'Kembangkan website/app mobile',
        'Buat sistem verifikasi seller',
        'Lakukan marketing digital'
      ]
    },
    {
      id: 3,
      judul: 'Konsultan Lingkungan Digital',
      deskripsi: 'Menawarkan jasa konsultasi online untuk UMKM atau rumah tangga yang ingin mengurangi jejak karbon dan menerapkan gaya hidup berkelanjutan.',
      deskripsiLengkap: 'Memberikan layanan konsultasi melalui platform digital untuk membantu bisnis dan individu menerapkan praktik ramah lingkungan. Mulai dari audit sampah hingga implementasi zero-waste lifestyle.',
      icon: '🌍',
      kategori: 'jasa',
      modal: 'Rendah',
      potensi: 'Tinggi',
      warna: 'from-purple-500 to-pink-500',
      targetPasar: 'UMKM, perusahaan startup, keluarga',
      estimasiPendapatan: 'Rp 8-20 juta/bulan',
      langkahAwal: [
        'Dapatkan sertifikasi lingkungan',
        'Buat portfolio case study',
        'Kembangkan website profesional',
        'Network dengan komunitas hijau'
      ]
    },
    {
      id: 4,
      judul: 'Edukasi & Workshop Online',
      deskripsi: 'Membuat kursus online atau webinar tentang cara mengelola sampah, membuat kerajinan tangan dari barang bekas (upcycling), atau pertanian urban.',
      deskripsiLengkap: 'Platform edukasi digital yang menyediakan kursus dan workshop tentang pengelolaan sampah, upcycling, dan gaya hidup berkelanjutan. Materi disajikan dalam format video, ebook, dan sesi live mentoring.',
      icon: '🎓',
      kategori: 'edukasi',
      modal: 'Rendah',
      potensi: 'Sedang',
      warna: 'from-orange-500 to-red-500',
      targetPasar: 'Pelajar, ibu rumah tangga, komunitas',
      estimasiPendapatan: 'Rp 3-10 juta/bulan',
      langkahAwal: [
        'Identifikasi topik yang diminati',
        'Rekam konten video berkualitas',
        'Buat platform kursus online',
        'Promosi melalui media sosial'
      ]
    },
    {
      id: 5,
      judul: 'Aplikasi Pengelolaan Sampah',
      deskripsi: 'Mengembangkan aplikasi yang memetakan lokasi bank sampah, memberikan informasi cara pemilahan, dan memberikan reward bagi pengguna yang aktif.',
      deskripsiLengkap: 'Aplikasi mobile yang membantu masyarakat dalam mengelola sampah dengan benar. Fitur termasuk pemetaan bank sampah, jadwal pickup, tutorial pemilahan, dan sistem reward untuk partisipasi aktif.',
      icon: '📱',
      kategori: 'digital',
      modal: 'Tinggi',
      potensi: 'Sangat Tinggi',
      warna: 'from-indigo-500 to-purple-500',
      targetPasar: 'Masyarakat urban, apartemen, perkantoran',
      estimasiPendapatan: 'Rp 20-100 juta/bulan',
      langkahAwal: [
        'Riset kebutuhan pengguna',
        'Kembangkan MVP aplikasi',
        'Jalin kerjasama dengan bank sampah',
        'Cari investor atau funding'
      ]
    },
    {
      id: 6,
      judul: 'Dropshipping Produk Ramah Lingkungan',
      deskripsi: 'Menjual produk-produk ramah lingkungan (seperti sedotan stainless, botol minum reusable, tas belanja kain) tanpa perlu stok barang.',
      deskripsiLengkap: 'Bisnis e-commerce yang fokus pada produk-produk ramah lingkungan dengan sistem dropshipping. Tidak perlu inventory, cukup fokus pada marketing dan customer service.',
      icon: '🛍️',
      kategori: 'retail',
      modal: 'Rendah',
      potensi: 'Tinggi',
      warna: 'from-teal-500 to-blue-500',
      targetPasar: 'Konsumen sadar lingkungan, usia 18-35',
      estimasiPendapatan: 'Rp 5-25 juta/bulan',
      langkahAwal: [
        'Cari supplier produk ramah lingkungan',
        'Buat website toko online',
        'Optimasi SEO dan social media',
        'Buat content marketing'
      ]
    },
  ];

  const artikelSampah = [
    {
      id: 1,
      judul: '5 Cara Mengurangi Sampah Plastik di Rumah Tangga',
      deskripsi: 'Panduan praktis untuk mengurangi penggunaan plastik sekali pakai dalam kehidupan sehari-hari.',
      deskripsiLengkap: `Plastik sekali pakai menjadi masalah utama pencemaran lingkungan. Berikut 5 cara efektif mengurangi sampah plastik di rumah:

1. **Bawa Tas Belanja Sendiri**
   - Selalu siapkan tas kain saat berbelanja
   - Tolak kantong plastik dari toko
   - Simpan tas lipat di tas sehari-hari

2. **Gunakan Botol Minum Reusable**
   - Bawa tumblr atau botol minum sendiri
   - Hindari membeli air minum dalam kemasan plastik
   - Manfaatkan refill station yang tersedia

3. **Pilih Kemasan Alternatif**
   - Beli produk dengan kemasan kaca atau kertas
   - Pilih sabun dan shampoo batang
   - Gunakan wadah stainless untuk makanan

4. **Kurangi Food Packaging**
   - Belanja di pasar tradisional
   - Bawa wadah sendiri untuk takeaway
   - Pilih produk tanpa kemasan berlebihan

5. **Daur Ulang dengan Benar**
   - Pisahkan sampah plastik yang bisa didaur ulang
   - Cuci bersih sebelum dibuang ke bank sampah
   - Kenali kode daur ulang plastik

Dengan konsistensi, satu keluarga bisa mengurangi sampah plastik hingga 50% dalam 3 bulan.`,
      penulis: 'Green Living Expert',
      tanggal: '15 Jan 2024',
      baca: '5 min',
      kategori: 'tips',
      gambar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'
    },
    {
      id: 2,
      judul: 'Inovasi Teknologi Pengolahan Sampah Terbaru 2024',
      deskripsi: 'Teknologi terkini dalam mengelola sampah menjadi energi dan produk bernilai ekonomi.',
      deskripsiLengkap: `Tahun 2024 menghadirkan berbagai inovasi teknologi dalam pengolahan sampah yang lebih efisien dan ramah lingkungan:

**1. Pyrolysis Canggih**
   - Mengubah sampah plastik menjadi bahan bakar minyak
   - Emisi lebih rendah dibanding incinerator
   - Dapat memproses berbagai jenis plastik

**2. Smart Waste Bin**
   - Sensor IoT untuk monitoring tingkat pengisian
   - Kompresi otomatis untuk optimasi ruang
   - Notifikasi real-time ke petugas kebersihan

**3. Bioreaktor Modern**
   - Pengomposan aerobik dengan kontrol suhu otomatis
   - Hasil kompos lebih cepat dan berkualitas
   - Sistem pengolahan limbah cair terintegrasi

**4. AI Waste Sorting**
   - Kecerdasan buatan untuk pemilahan sampah otomatis
   - Akurasi identifikasi material hingga 95%
   - Meningkatkan efisiensi daur ulang

**5. Waste-to-Energy 2.0**
   - Teknologi gasifikasi yang lebih efisien
   - Konversi sampah menjadi listrik dan panas
   - Emisi karbon lebih rendah

Teknologi ini tidak hanya menyelesaikan masalah sampah tetapi juga menciptakan nilai ekonomi baru.`,
      penulis: 'Tech Environment',
      tanggal: '12 Jan 2024',
      baca: '8 min',
      kategori: 'teknologi',
      gambar: 'https://images.unsplash.com/photo-1562077980-9f6aac364438?w=400'
    },
    {
      id: 3,
      judul: 'Sukses Berbisnis dari Sampah: Kisah Inspiratif',
      deskripsi: 'Cerita sukses pengusaha yang membangun empire bisnis dari pengolahan sampah.',
      deskripsiLengkap: `**Kisah Inspiratif: Dari Sampah Menjadi Rupiah**

**Ahmad, Founder Kompos Organik Nusantara**
Awalnya hanya iseng membuat kompos dari sampah dapur, kini Ahmad memiliki usaha pengolahan sampah organik yang melayani 50 restoran dan menghasilkan omzet Rp 200 juta per bulan.

**Perjalanan Sukses:**
- 2018: Mulai dari halaman rumah dengan 5 ember kompos
- 2019: Dapat kontrak pertama dengan restoran hotel
- 2020: Ekspansi ke pengolahan sampah pasar tradisional
- 2021: Buka pabrik pengolahan skala menengah
- 2022: Ekspor kompos premium ke Jepang
- 2023: Omzet stabil di atas Rp 200 juta/bulan

**Kunci Sukses Ahmad:**
1. Konsistensi dan ketekunan
2. Inovasi terus menerus dalam produk
3. Jaringan kemitraan yang kuat
4. Komitmen pada kualitas
5. Pemasaran yang efektif

"Jangan pernah meremehkan sampah. Di balik tumpukan sampah, ada peluang emas yang menunggu untuk digali," kata Ahmad.`,
      penulis: 'Business Green',
      tanggal: '10 Jan 2024',
      baca: '6 min',
      kategori: 'inspirasi',
      gambar: 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400'
    },
    {
      id: 4,
      judul: 'Memahami Konsep Circular Economy untuk Pemula',
      deskripsi: 'Penjelasan sederhana tentang ekonomi sirkular dan manfaatnya bagi lingkungan.',
      deskripsiLengkap: `**Circular Economy: Masa Depan yang Berkelanjutan**

Ekonomi sirkular adalah sistem ekonomi yang dirancang untuk menghilangkan sampah dan terus menggunakan sumber daya. Berbeda dengan ekonomi linear (ambil-pakai-buang), ekonomi sirkular menciptakan loop tertutup.

**Prinsip Dasar Circular Economy:**

1. **Design Out Waste**
   - Produk dirancang untuk mudah diperbaiki
   - Material dipilih untuk bisa didaur ulang
   - Kemasan minimalis dan reusable

2. **Keep Products in Use**
   - Perbaikan dan refurbishment
   - Sharing economy dan rental
   - Second-hand marketplace

3. **Regenerate Natural Systems**
   - Penggunaan material biodegradable
   - Restorasi ekosistem
   - Energi terbarukan

**Contoh Penerapan:**
- Fashion: Brand yang menerima kembali pakaian lama untuk didaur ulang
- Elektronik: Program trade-in dan refurbishment
- Packaging: Sistem deposit untuk kemasan reusable

**Manfaat Circular Economy:**
- Mengurangi eksploitasi sumber daya alam
- Menciptakan lapangan kerja baru
- Mengurangi polusi dan sampah
- Meningkatkan ketahanan ekonomi

Dengan menerapkan circular economy, kita menciptakan sistem yang lebih berkelanjutan untuk generasi mendatang.`,
      penulis: 'Eco Consultant',
      tanggal: '8 Jan 2024',
      baca: '7 min',
      kategori: 'edukasi',
      gambar: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b974?w=400'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua', count: ideBisnis.length },
    { id: 'digital', label: 'Digital', count: ideBisnis.filter(b => b.kategori === 'digital').length },
    { id: 'organik', label: 'Organik', count: ideBisnis.filter(b => b.kategori === 'organik').length },
    { id: 'jasa', label: 'Jasa', count: ideBisnis.filter(b => b.kategori === 'jasa').length },
    { id: 'edukasi', label: 'Edukasi', count: ideBisnis.filter(b => b.kategori === 'edukasi').length },
    { id: 'retail', label: 'Retail', count: ideBisnis.filter(b => b.kategori === 'retail').length }
  ];

  const filteredBisnis = ideBisnis.filter(bisnis => {
    const matchesSearch = bisnis.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bisnis.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bisnis.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArtikel = artikelSampah.filter(artikel =>
    artikel.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artikel.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const simulateSearch = () => {
    if (searchTerm) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    simulateSearch();
  }, [searchTerm]);

  // Modal Components
  const BisnisDetailModal = () => {
    if (!selectedBisnis) return null;

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setSelectedBisnis(null)}
        />
        
        <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className={`h-3 bg-gradient-to-r ${selectedBisnis.warna}`}></div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{selectedBisnis.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedBisnis.judul}</h2>
                  <div className="flex space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedBisnis.modal === 'Rendah' ? 'bg-green-100 text-green-800' :
                      selectedBisnis.modal === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Modal: {selectedBisnis.modal}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedBisnis.potensi === 'Tinggi' ? 'bg-blue-100 text-blue-800' :
                      selectedBisnis.potensi === 'Sangat Tinggi' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      Potensi: {selectedBisnis.potensi}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBisnis(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">📖 Deskripsi Lengkap</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedBisnis.deskripsiLengkap}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 Target Pasar</h3>
                  <p className="text-gray-600">{selectedBisnis.targetPasar}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">💰 Estimasi Pendapatan</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                    {selectedBisnis.estimasiPendapatan}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">🚀 Langkah Memulai</h3>
                <div className="space-y-3">
                  {selectedBisnis.langkahAwal.map((langkah, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{langkah}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  💼 Mulai Bisnis Ini
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                  📞 Konsultasi Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ArtikelDetailModal = () => {
    if (!selectedArtikel) return null;

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setSelectedArtikel(null)}
        />
        
        <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <img
            src={selectedArtikel.gambar}
            alt={selectedArtikel.judul}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedArtikel.judul}</h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>✍️ {selectedArtikel.penulis}</span>
                  <span>📅 {selectedArtikel.tanggal}</span>
                  <span>⏱️ {selectedArtikel.baca} baca</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedArtikel(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArtikel.deskripsiLengkap}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  📚 Simpan Artikel
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
                  🔗 Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-3xl shadow-2xl mb-6">
              <span className="text-4xl">💼</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Bisnis Ramah Lingkungan
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Temukan peluang bisnis yang tidak hanya menguntungkan, tetapi juga berkontribusi positif bagi kelestarian lingkungan
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-2 mb-8 border border-white/20">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('bisnis')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'bisnis'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              💡 Ide Bisnis
            </button>
            <button
              onClick={() => setActiveTab('artikel')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'artikel'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              📚 Artikel Sampah
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder={`Cari ${activeTab === 'bisnis' ? 'ide bisnis...' : 'artikel tentang sampah...'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Category Filter - Only for Bisnis Tab */}
        {activeTab === 'bisnis' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Kategori:</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Mencari {activeTab === 'bisnis' ? 'ide bisnis' : 'artikel'}...</p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {activeTab === 'bisnis' ? (
              filteredBisnis.length > 0 ? (
                filteredBisnis.map(bisnis => (
                  <div
                    key={bisnis.id}
                    onClick={() => setSelectedBisnis(bisnis)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                  >
                    <div className={`h-2 bg-gradient-to-r ${bisnis.warna}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{bisnis.icon}</div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            bisnis.modal === 'Rendah' ? 'bg-green-100 text-green-800' :
                            bisnis.modal === 'Sedang' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Modal: {bisnis.modal}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            bisnis.potensi === 'Tinggi' ? 'bg-blue-100 text-blue-800' :
                            bisnis.potensi === 'Sangat Tinggi' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            Potensi: {bisnis.potensi}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{bisnis.judul}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{bisnis.deskripsi}</p>
                      <div className="flex justify-between items-center">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          Pelajari Detail
                        </button>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          {bisnis.kategori}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada ide bisnis yang ditemukan</h3>
                  <p className="text-gray-600">Coba gunakan kata kunci yang berbeda atau pilih kategori lain</p>
                </div>
              )
            ) : (
              filteredArtikel.length > 0 ? (
                filteredArtikel.map(artikel => (
                  <div
                    key={artikel.id}
                    onClick={() => setSelectedArtikel(artikel)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                  >
                    <img
                      src={artikel.gambar}
                      alt={artikel.judul}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{artikel.tanggal}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          {artikel.baca} baca
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {artikel.judul}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {artikel.deskripsi}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Oleh: {artikel.penulis}</span>
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          Baca Artikel
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada artikel yang ditemukan</h3>
                  <p className="text-gray-600">Coba gunakan kata kunci yang berbeda</p>
                </div>
              )
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                {ideBisnis.length}+
              </div>
              <p className="text-gray-600">Ide Bisnis Tersedia</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent mb-2">
                {artikelSampah.length}+
              </div>
              <p className="text-gray-600">Artikel Edukatif</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-600">Ramah Lingkungan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BisnisDetailModal />
      <ArtikelDetailModal />
    </div>
  );
};

export default BisnisLingkungan;