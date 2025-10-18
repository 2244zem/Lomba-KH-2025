// src/components/Error404.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

const Error404 = () => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 p-12">
            {/* Main Content */}
            <div className="text-center mb-12">
              {/* Animated Number 404 */}
              <motion.div
                className="relative inline-block mb-8"
                animate={floatingAnimation}
              >
                <div className="text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  404
                </div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold text-gray-800 dark:text-white mb-6"
                variants={itemVariants}
              >
                Halaman Hilang di Alam Semesta
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Sepertinya halaman yang Anda cari telah tersesat dalam perjalanan daur ulang. 
                Mari kita bantu mengembalikannya ke siklus yang benar! 🌍
              </motion.p>
            </div>

            {/* Animated Elements */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-6xl shadow-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🔍
                </motion.div>
                
                {/* Floating particles */}
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    className={`absolute w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm ${
                      item === 1 ? 'top-0 -left-4' :
                      item === 2 ? 'top-0 -right-4' :
                      item === 3 ? 'bottom-0 -left-4' :
                      'bottom-0 -right-4'
                    }`}
                    animate={{
                      y: [0, -30, 0],
                      x: item % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      delay: item * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {item === 1 ? '♻️' : item === 2 ? '🌱' : item === 3 ? '💚' : '🌍'}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <Link to="/">
                <motion.button
                  className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center space-x-3 min-w-[200px] justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Kembali ke Beranda</span>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => window.history.back()}
                className="group border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 min-w-[200px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Kembali Sebelumnya</span>
              </motion.button>

              <motion.button
                onClick={() => window.location.reload()}
                className="group border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 min-w-[200px] justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Refresh Halaman</span>
              </motion.button>
            </motion.div>

            {/* Additional Help Section */}
            <motion.div
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 text-center">
                🚀 Butuh Bantuan Lainnya?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-2xl mb-2">🗺️</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cek navigasi untuk halaman yang tersedia</p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-2xl mb-2">🔍</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Gunakan fitur pencarian kami</p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-2xl mb-2">💬</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Hubungi tim support kami</p>
                </div>
              </div>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                💡 Fun Fact: Setiap tahun, 8 juta ton sampah plastik 'tersesat' di lautan. 
                Mari bantu kurangi dengan daur ulang yang benar!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full ${
                i % 4 === 0 ? 'bg-green-400' :
                i % 4 === 1 ? 'bg-emerald-400' :
                i % 4 === 2 ? 'bg-yellow-400' : 'bg-orange-400'
              } opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Error404;