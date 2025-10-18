// src/features/aiAssistant/index.jsx
import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌱 **Halo! Saya Eco AI Assistant**\n\nSaya adalah asisten kecerdasan buatan khusus untuk pengelolaan sampah, daur ulang, dan keberlanjutan lingkungan. Saya bisa membantu Anda dengan:\n\n• 📊 **Analisis sampah** pribadi\n• ♻️ **Solusi daur ulang** terperinci\n• 💰 **Nilai ekonomi** sampah Anda\n• 🌿 **Tips ramah lingkungan**\n• 🏆 **Challenge eco-living**\n\nApa yang bisa saya bantu hari ini?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    location: 'Indonesia',
    language: 'Bahasa Indonesia',
    expertise: 'pemula'
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI Knowledge Base
  const knowledgeBase = {
    wasteClassification: {
      organik: {
        items: ['sisa makanan', 'sayuran', 'buah', 'daun', 'kayu', 'ranting', 'bunga', 'kulit telur', 'ampas kopi', 'teh celup'],
        treatment: 'kompos atau biogas',
        value: 'Rp 0 (bisa jadi kompos bernilai)',
        tips: 'Pisahkan yang basah dan kering, buat kompos rumah tangga'
      },
      anorganik: {
        plastik: {
          pet: ['botol minuman', 'kemasan minyak'],
          hdpe: ['botol deterjen', 'botol sampo', 'galon'],
          pp: ['tutup botol', 'kemasan yogurt', 'sedotan'],
          ps: ['styrofoam', 'kotak makanan'],
          treatment: 'cuci bersih, keringkan, pilah jenis',
          value: 'Rp 2.000 - 8.000/kg'
        },
        kertas: {
          items: ['koran', 'kardus', 'buku', 'karton', 'kemasan kertas'],
          treatment: 'keringkan, pilah dari sampah basah',
          value: 'Rp 1.500 - 5.000/kg'
        },
        logam: {
          items: ['kaleng aluminium', 'kaleng baja', 'panci', 'peralatan dapur'],
          treatment: 'bersihkan, gepengkan',
          value: 'Rp 8.000 - 20.000/kg'
        },
        kaca: {
          items: ['botol', 'gelas', 'jendela', 'kaca mobil'],
          treatment: 'hati-hati, pisahkan warna',
          value: 'Rp 500 - 2.000/kg'
        }
      },
      b3: {
        items: ['baterai', 'lampu', 'elektronik', 'obat kadaluarsa', 'cat', 'minyak goreng bekas'],
        treatment: 'drop point khusus, jangan dicampur',
        value: 'perlu penanganan khusus'
      }
    },
    
    recyclingTechniques: {
      plastik: {
        pet: 'Bisa dibuat: benang daur ulang, kemasan baru, kain',
        hdpe: 'Bisa dibuat: pipa, furnitur, botol baru',
        pp: 'Bisa dibuat: alat tulis, komponen otomotif',
        creative: 'Kerajinan: pot tanaman, tas, dompet'
      },
      kertas: {
        daur_ulang: 'Pulp baru, kertas daur ulang, karton',
        kreatif: 'Origami, dekorasi, briket bahan bakar',
        kompos: 'Bisa dikompos jika tanpa tinta kimia'
      },
      organik: {
        kompos: 'Metode takakura, komposter, lubang biopori',
        biogas: 'Untuk skala besar, butuh biodigester',
        pakan_ternak: 'Sisa sayuran tertentu untuk pakan'
      }
    },
    
    environmentalTips: {
      reduce: [
        'Bawa tas belanja sendiri',
        'Gunakan tumbler dan wadah makan',
        'Belanja bulk untuk kurangi kemasan',
        'Pilih produk isi ulang',
        'Hindari produk sekali pakai'
      ],
      reuse: [
        'Botol kaca untuk wadah penyimpanan',
        'Kardus untuk organisasi atau kerajinan',
        'Pakaian bekas untuk lap atau donasi',
        'Kaleng untuk pot tanaman',
        'Koran untuk bungkus atau briket'
      ],
      lifestyle: [
        'Kompos sampah dapur mandiri',
        'Berkebun sayuran organik',
        'Transportasi ramah lingkungan',
        'Energi terbarukan di rumah',
        'Produk lokal dan musiman'
      ]
    },
    
    economicBenefits: {
      savings: 'Pengurangan biaya sampah hingga 40%',
      income: 'Pendapatan dari bank sampah Rp 50.000 - 500.000/bulan',
      business: 'Peluang usaha: kompos, kerajinan daur ulang, jasa pengolahan',
      environmental: 'Pengurangan emisi karbon dan polusi'
    }
  };

  const analyzeWasteInput = (message) => {
    const wasteItems = [];
    const quantities = {};
    
    // Simple NLP for waste analysis
    const words = message.toLowerCase().split(' ');
    words.forEach((word, index) => {
      // Check for quantities
      if (/^\d+$/.test(word) && words[index + 1] && words[index + 1].includes('kg')) {
        quantities[words[index + 2] || words[index - 1]] = parseInt(word);
      }
      
      // Check for waste items
      Object.keys(knowledgeBase.wasteClassification).forEach(category => {
        if (category === 'organik' && knowledgeBase.wasteClassification[category].items.some(item => word.includes(item))) {
          wasteItems.push({ category, type: 'organik', item: word });
        } else if (category === 'anorganik') {
          Object.keys(knowledgeBase.wasteClassification[category]).forEach(subType => {
            if (subType !== 'treatment' && subType !== 'value') {
              if (knowledgeBase.wasteClassification[category][subType].items?.some(item => word.includes(item))) {
                wasteItems.push({ category, type: subType, item: word });
              }
            }
          });
        }
      });
    });
    
    return { wasteItems, quantities };
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const { wasteItems, quantities } = analyzeWasteInput(message);
    
    // Personal Waste Analysis
    if (wasteItems.length > 0 || lowerMessage.includes('sampah saya') || lowerMessage.includes('punya sampah')) {
      let analysis = "**📊 Analisis Sampah Anda:**\n\n";
      
      wasteItems.forEach((item, index) => {
        const quantity = quantities[item.item] || 'beberapa';
        analysis += `${index + 1}. **${item.item}** (${quantity}): \n`;
        
        if (item.category === 'organik') {
          analysis += `   🍂 Kategori: Organik\n`;
          analysis += `   💡 Treatment: ${knowledgeBase.wasteClassification.organik.treatment}\n`;
          analysis += `   💰 Nilai: ${knowledgeBase.wasteClassification.organik.value}\n\n`;
        } else if (item.type in knowledgeBase.wasteClassification.anorganik) {
          const wasteData = knowledgeBase.wasteClassification.anorganik[item.type];
          analysis += `   🫙 Kategori: ${item.type.toUpperCase()}\n`;
          analysis += `   💡 Treatment: ${wasteData.treatment || 'Daur ulang'}\n`;
          analysis += `   💰 Nilai: ${wasteData.value || 'Rp 1.000-5.000/kg'}\n\n`;
        }
      });
      
      if (wasteItems.length === 0) {
        analysis += "Saya mendeteksi Anda membahas sampah. Bisakan Anda sebutkan jenis sampah spesifik yang ingin Anda kelola?\n\n";
      }
      
      analysis += "**🎯 Rekomendasi:**\n";
      analysis += "• Pisahkan berdasarkan kategori\n• Cuci sampah anorganik\n• Hubungi bank sampah terdekat\n• Pertimbangkan kompos untuk organik";
      
      return analysis;
    }
    
    // Enhanced Question Handling
    if (lowerMessage.includes('pilah') || lowerMessage.includes('kategori') || lowerMessage.includes('jenis')) {
      return `**📋 Panduan Pemilahan Sampah Lengkap:**\n\n` +
        `🍂 **ORGANIK** (${knowledgeBase.wasteClassification.organik.items.slice(0, 3).join(', ')}...)\n` +
        `   💰 ${knowledgeBase.wasteClassification.organik.value}\n` +
        `   🔧 ${knowledgeBase.wasteClassification.organik.treatment}\n\n` +
        
        `🫙 **ANORGANIK**:\n` +
        `   • Plastik: ${knowledgeBase.wasteClassification.anorganik.plastik.value}\n` +
        `   • Kertas: ${knowledgeBase.wasteClassification.anorganik.kertas.value}\n` +
        `   • Logam: ${knowledgeBase.wasteClassification.anorganik.logam.value}\n` +
        `   • Kaca: ${knowledgeBase.wasteClassification.anorganik.kaca.value}\n\n` +
        
        `⚠️ **B3**: ${knowledgeBase.wasteClassification.b3.items.slice(0, 3).join(', ')}...\n` +
        `   🔧 ${knowledgeBase.wasteClassification.b3.treatment}\n\n` +
        
        `💡 **Tips**: Gunakan 3 tempat sampah terpisah untuk hasil optimal!`;
    }
    
    if (lowerMessage.includes('daur ulang') || lowerMessage.includes('recycle')) {
      const material = lowerMessage.includes('plastik') ? 'plastik' : 
                     lowerMessage.includes('kertas') ? 'kertas' : 
                     lowerMessage.includes('organik') ? 'organik' : 'umum';
      
      if (material === 'plastik') {
        return `**♻️ Daur Ulang Plastik Detail:**\n\n` +
          `PET: ${knowledgeBase.recyclingTechniques.plastik.pet}\n` +
          `HDPE: ${knowledgeBase.recyclingTechniques.plastik.hdpe}\n` +
          `PP: ${knowledgeBase.recyclingTechniques.plastik.pp}\n\n` +
          `🎨 **Kreatif**: ${knowledgeBase.recyclingTechniques.plastik.creative}\n\n` +
          `💰 **Nilai Ekonomi**: ${knowledgeBase.wasteClassification.anorganik.plastik.value}`;
      }
      
      return `**♻️ Panduan Daur Ulang Komprehensif:**\n\n` +
        `Setiap material memiliki potensi daur ulang yang berbeda. Teknologi terbaru memungkinkan daur ulang hingga 95% untuk beberapa material.\n\n` +
        `🌍 **Fakta**: Daur ulang 1 ton plastik menghemat 5.774 Kwh energi!\n\n` +
        `Tanyakan spesifik: "cara daur ulang [plastik/kertas/logam]"`;
    }
    
    if (lowerMessage.includes('kompos') || lowerMessage.includes('organik')) {
      return `**🍂 Teknik Pengomposan Modern:**\n\n` +
        `1. **Komposter Takakura**: Praktis, tidak bau, cocok apartemen\n` +
        `2. **Biopori**: Mengatasi genangan, menyuburkan tanah\n` +
        `3. **Vermicompost**: Menggunakan cacing, hasil premium\n` +
        `4. **Kompos Aerob**: Skala besar, butuh pengadukan\n\n` +
        
        `📊 **Rasio**: 2 bagian hijau : 1 bagian coklat\n` +
        `⏱️ **Waktu**: 2-8 minggu tergantung metode\n` +
        `💰 **Nilai**: Kompos organik Rp 5.000-15.000/kg\n\n` +
        
        `🚫 **Hindari**: Daging, susu, minyak, kertas berlapis plastik`;
    }
    
    if (lowerMessage.includes('uang') || lowerMessage.includes('uang') || lowerMessage.includes('jual')) {
      return `**💰 Potensi Ekonomi Sampah Anda:**\n\n` +
        `📈 **Pendapatan Bulanan**:\n` +
        `• Keluarga 4 orang: Rp 50.000 - 200.000\n` +
        `• Komunitas: Rp 500.000 - 2.000.000\n` +
        `• Usaha: Rp 1.000.000 - 10.000.000+\n\n` +
        
        `🏪 **Nilai Pasar**:\n` +
        `• Plastik PET: Rp 3.000-6.000/kg\n` +
        `• Kardus: Rp 2.000-4.000/kg\n` +
        `• Aluminium: Rp 12.000-18.000/kg\n` +
        `• Kompos: Rp 5.000-15.000/kg\n\n` +
        
        `💼 **Peluang Usaha**: Jasa pengolahan, kerajinan daur ulang, edukasi lingkungan`;
    }
    
    if (lowerMessage.includes('tips') || lowerMessage.includes('cara') || lowerMessage.includes('kurangi')) {
      return `**🌿 10 Tips Eco-Living Revolusioner:**\n\n` +
        knowledgeBase.environmentalTips.reduce.slice(0, 5).map(tip => `✅ ${tip}`).join('\n') + '\n\n' +
        knowledgeBase.environmentalTips.reuse.slice(0, 3).map(tip => `🔄 ${tip}`).join('\n') + '\n\n' +
        `**📊 Dampak**: Pengurangan sampah hingga 80% dan penghematan Rp 300.000/bulan!`;
    }
    
    // Advanced contextual responses
    if (lowerMessage.includes('apa') && lowerMessage.includes('itu')) {
      const topic = lowerMessage.replace(/apa itu|adalah|\?/g, '').trim();
      return `**🤔 ${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\n` +
        `Berdasarkan basis pengetahuan saya tentang ${topic} dalam konteks lingkungan:\n\n` +
        `📚 **Definisi**: Konsep pengelolaan material bekas untuk mengurangi dampak lingkungan\n` +
        `🎯 **Tujuan**: Konservasi sumber daya dan energi\n` +
        `💡 **Aplikasi**: Terintegrasi dalam ekonomi sirkular modern\n\n` +
        `Ingin penjelasan lebih detail tentang aspek tertentu?`;
    }
    
    // Default intelligent response
    return `**🧠 Eco AI Analysis:**\n\n` +
      `Saya memahami Anda bertanya tentang "${message}". Sebagai AI spesialis lingkungan, saya mendeteksi beberapa poin penting:\n\n` +
      `📈 **Relevansi**: Topik terkait pengelolaan sampah dan keberlanjutan\n` +
      `🎯 **Solusi**: Tersedia multiple approach berdasarkan kondisi lokal\n` +
      `💡 **Innovasi**: Teknologi terbaru bisa meningkatkan efisiensi 300%\n\n` +
      `**💬 Untuk jawaban lebih akurat, bisa Anda:**\n` +
      `• Sebutkan jenis sampah spesifik\n` +
      `• Tentukan lokasi/kondisi Anda\n` +
      `• Jelaskan tujuan pengelolaan\n\n` +
      `Saya siap memberikan solusi custom! 🌟`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing with enhanced delay for realism
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'analysis'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Variable delay for realism
  };

  const suggestedQuestions = [
    "Saya punya sampah plastik dan kardus, apa yang harus dilakukan?",
    "Bagaimana cara memulai kompos di apartemen?",
    "Berapa harga sampah elektronik di bank sampah?",
    "Tips mengurangi sampah plastik sehari-hari?",
    "Apa perbedaan sampah organik dan anorganik?",
    "Cara daur ulang kreatif dari botol plastik?",
    "Berapa penghasilan dari bank sampah komunitas?",
    "Apa itu ekonomi sirkular dalam pengelolaan sampah?"
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { icon: '📊', label: 'Analisis Sampah', question: 'Analisis sampah rumah tangga saya' },
    { icon: '💰', label: 'Nilai Ekonomi', question: 'Berapa nilai ekonomi sampah plastik?' },
    { icon: '♻️', label: 'Daur Ulang', question: 'Cara daur ulang sampah elektronik?' },
    { icon: '🌿', label: 'Tips Harian', question: 'Tips mengurangi sampah plastik sehari-hari' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      {/* Enhanced Header with Stats */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-lg border border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-5xl">🧠</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Eco AI Assistant Pro
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            AI Cerdas dengan Analisis Mendalam untuk Solusi Pengelolaan Sampah Terintegrasi
          </p>
          
          {/* Enhanced Stats Bar */}
          <div className="flex justify-center mt-8 space-x-8">
            {[
              { value: 'AI-Powered', label: 'Analisis Cerdas' },
              { value: 'Real-Time', label: 'Data Terkini' },
              { value: '100%', label: 'Gratis' },
              { value: '24/7', label: 'Tersedia' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-emerald-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden backdrop-blur-lg">
          {/* Enhanced Chat Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-lg">
                  <span className="text-3xl text-white">🌍</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-1">Eco AI Pro</h3>
                  <p className="text-emerald-100 text-lg">Spesialis Analisis Lingkungan & Daur Ulang</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-lg border border-white/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-emerald-100 font-semibold">Online • AI Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="border-b border-emerald-200 p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex flex-wrap gap-3 justify-center">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action.question)}
                  className="bg-white hover:bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm transition-all duration-200 border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-md hover:scale-105 font-medium flex items-center space-x-2"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Chat Messages Area */}
          <div className="h-[500px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-emerald-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-3xl p-6 backdrop-blur-sm border-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white border-blue-500 rounded-br-xl shadow-2xl'
                      : 'bg-white text-gray-800 border-emerald-200 rounded-bl-xl shadow-lg'
                  } transform hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {message.text.split('**').map((part, index) => 
                      index % 2 === 1 ? (
                        <strong key={index} className={message.sender === 'user' ? 'text-white' : 'text-emerald-700'}>
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                  <div className={`text-xs mt-3 font-medium flex items-center space-x-2 ${
                    message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === 'ai' && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600">🤖 AI Analysis</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-emerald-200 rounded-3xl rounded-bl-xl p-6 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-4 text-emerald-700">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <div>
                      <span className="font-semibold">Eco AI sedang menganalisis...</span>
                      <div className="text-xs text-gray-500">Memproses data lingkungan terbaru</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Section */}
          <div className="border-t border-emerald-200 p-6 bg-white/95 backdrop-blur-lg">
            {/* Suggested Questions */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <p className="text-sm font-semibold text-gray-700">Pertanyaan Populer:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-3 rounded-xl text-sm transition-all duration-200 border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-md hover:scale-105 font-medium text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tanya tentang analisis sampah, daur ulang, nilai ekonomi, atau tips lingkungan..."
                  className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 text-lg shadow-lg"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  💭
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:hover:scale-100 flex items-center space-x-3 min-w-[120px] justify-center"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    <span className="text-lg">Analisis</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: '🧠',
              title: 'AI Analysis',
              description: 'Analisis cerdas sampah dengan machine learning'
            },
            {
              icon: '💰',
              title: 'Nilai Ekonomi',
              description: 'Perhitungan potensi pendapatan dari sampah'
            },
            {
              icon: '♻️',
              title: 'Solusi Daur Ulang',
              description: 'Teknik daur ulang modern dan kreatif'
            },
            {
              icon: '🌍',
              title: 'Data Real-time',
              description: 'Informasi pasar dan regulasi terkini'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center border-2 border-emerald-200 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">{feature.icon}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Info Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center mt-12 text-white shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              🚀 Transformasi Pengelolaan Sampah dengan AI
            </h3>
            <p className="text-emerald-100 text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Eco AI Assistant Pro menghadirkan revolusi dalam pengelolaan sampah dengan analisis mendalam, data real-time, dan solusi terpersonalisasi
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <span className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/30 font-medium hover:bg-white/30 transition-all duration-200">📈 Analisis Cerdas</span>
              <span className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/30 font-medium hover:bg-white/30 transition-all duration-200">💰 Kalkulasi Ekonomi</span>
              <span className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/30 font-medium hover:bg-white/30 transition-all duration-200">♻️ Solusi Custom</span>
              <span className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/30 font-medium hover:bg-white/30 transition-all duration-200">🌍 Data Real-time</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-500 text-sm">
            🧠 Powered by Advanced AI • 💰 Economic Analysis • ♻️ Circular Economy • 🌍 Sustainable Future
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;