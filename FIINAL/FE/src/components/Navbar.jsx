import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isExchangeDropdownOpen, setIsExchangeDropdownOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userDropdownRef = useRef(null);
  const exchangeDropdownRef = useRef(null);
  const featuresDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Exchange items
  const exchangeItems = [
    { 
      path: '/tukar-sampah', 
      label: 'Tukar Sampah', 
      description: 'Tukar sampah dengan poin',
      badge: 'Hot'
    },
    { 
      path: '/penjemputan', 
      label: 'Jemput Sampah', 
      description: 'Jadwal penjemputan sampah' 
    },
    { 
      path: '/bank-sampah', 
      label: 'Bank Sampah', 
      description: 'Lokasi bank sampah terdekat',
      badge: 'New'
    },
    { 
      path: '/harga-sampah', 
      label: 'Harga Sampah', 
      description: 'Daftar harga sampah terkini' 
    },
    { 
      path: '/carbon-calculator', 
      label: 'Kalkulator Karbon', 
      description: 'Hitung jejak karbon Anda', 
      highlight: true 
    },
    { 
      path: '/riwayat-tukar', 
      label: 'Riwayat Tukar', 
      description: 'Riwayat transaksi Anda' 
    },
  ];

  // Advanced Features
  const advancedFeatures = [
    { 
      path: '/waste-tracking', 
      label: 'Lacak Sampah', 
      description: 'QR Code & real-time tracking',
      icon: '📱',
      badge: 'New'
    },
    { 
      path: '/smart-pricing', 
      label: 'Smart Pricing', 
      description: 'Harga dinamis & lelang',
      icon: '💰'
    },
    { 
      path: '/gamification', 
      label: 'Eco Games', 
      description: 'Kuis & tantangan seru',
      icon: '🎮'
    },
  ];

  // Main navigation
  const mainMenuItems = [
    { 
      path: '/', 
      label: 'Peta Sampah',
    },
    { 
      path: '/ai-assistant', 
      label: 'AI Assistant',
    },
    { 
      path: '/pusat-daur-ulang', 
      label: 'Daur Ulang',
    },
    { 
      path: '/bisnis-lingkungan', 
      label: 'Bisnis',
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (exchangeDropdownRef.current && !exchangeDropdownRef.current.contains(event.target)) {
        setIsExchangeDropdownOpen(false);
      }
      if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target)) {
        setIsFeaturesDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-mobile-menu-button]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserDropdownOpen(false);
    setIsExchangeDropdownOpen(false);
    setIsFeaturesDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsExchangeDropdownOpen(false);
    setIsFeaturesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleExchangeDropdown = () => {
    setIsExchangeDropdownOpen(!isExchangeDropdownOpen);
    setIsUserDropdownOpen(false);
    setIsFeaturesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleFeaturesDropdown = () => {
    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen);
    setIsUserDropdownOpen(false);
    setIsExchangeDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeAllDropdowns();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    closeAllDropdowns();
    navigate('/auth');
  };

  const closeAllDropdowns = () => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsExchangeDropdownOpen(false);
    setIsFeaturesDropdownOpen(false);
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (str) => {
    const colors = [
      'bg-green-500',
      'bg-blue-500', 
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    const index = str ? str.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const userColor = user ? getRandomColor(user.name) : 'bg-gray-500';
  const isExchangeActive = exchangeItems.some(item => location.pathname === item.path);
  const isFeaturesActive = advancedFeatures.some(item => location.pathname === item.path);

  const formatBalance = (balance) => {
    if (balance === undefined || balance === null) return '0';
    return new Intl.NumberFormat('id-ID').format(balance);
  };

  // Dark Mode Toggle
  const DarkModeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
        scrolled 
          ? isDarkMode 
            ? 'text-yellow-300 hover:bg-gray-800' 
            : 'text-orange-500 hover:bg-gray-100'
          : isDarkMode
          ? 'text-yellow-300 hover:bg-gray-800'
          : 'text-yellow-200 hover:bg-white/10'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )}
    </button>
  );

  // Simple User Menu
  const UserMenu = () => (
    <div className="flex items-center space-x-2">
      <DarkModeToggle />

      <Link
        to="/profil"
        onClick={closeAllDropdowns}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          scrolled 
            ? isDarkMode
              ? 'text-gray-300 hover:text-green-400'
              : 'text-gray-700 hover:text-green-600'
            : 'text-white hover:text-green-100'
        }`}
      >
        Profil
      </Link>

      <div className="relative" ref={userDropdownRef}>
        <button
          onClick={toggleUserDropdown}
          className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
            scrolled 
              ? isDarkMode
                ? 'hover:bg-gray-800'
                : 'hover:bg-gray-100'
              : 'hover:bg-white/10'
          } ${isUserDropdownOpen ? (scrolled ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : 'bg-white/10') : ''}`}
        >
          <div className="text-right">
            <div className={`text-sm font-medium max-w-32 truncate ${
              scrolled 
                ? isDarkMode ? 'text-white' : 'text-gray-700'
                : 'text-white'
            }`}>
              {user?.name || 'User'}
            </div>
            <div className={`text-xs ${
              scrolled 
                ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
                : 'text-green-100'
            }`}>
              {formatBalance(user?.points || 0)} pts
            </div>
          </div>
          
          <div className="relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
              <div className={`w-full h-full rounded-full flex items-center justify-center ${userColor}`}>
                {getInitials(user?.name || 'User')}
              </div>
            </div>
          </div>
        </button>

        {isUserDropdownOpen && (
          <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border overflow-hidden z-50 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-2">
              <button
                onClick={() => {
                  navigate('/pengaturan');
                  closeAllDropdowns();
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pengaturan
              </button>
              <button
                onClick={handleLogout}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isDarkMode ? 'text-red-400 hover:bg-red-900/50' : 'text-red-600 hover:bg-red-50'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Mobile User Actions
  const MobileUserActions = () => (
    <div className={`border-t pt-4 mt-4 ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      {user ? (
        <div className="space-y-2">
          <Link
            to="/profil"
            onClick={closeAllDropdowns}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              scrolled
                ? isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
                : isDarkMode
                ? 'text-white hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Profil Saya
          </Link>
          <Link
            to="/pengaturan"
            onClick={closeAllDropdowns}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              scrolled
                ? isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
                : isDarkMode
                ? 'text-white hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              scrolled
                ? isDarkMode
                  ? 'text-red-400 hover:bg-red-900/50'
                  : 'text-red-600 hover:bg-red-50'
                : isDarkMode
                ? 'text-red-300 hover:bg-red-900/50'
                : 'text-red-200 hover:bg-red-500/10'
            }`}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
            scrolled
              ? isDarkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
              : isDarkMode
              ? 'bg-white hover:bg-gray-200 text-gray-900'
              : 'bg-white hover:bg-gray-100 text-green-600'
          }`}
        >
          Login / Daftar
        </button>
      )}
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        : isDarkMode ? 'bg-gray-900' : 'bg-green-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={closeAllDropdowns}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`w-6 h-6 rounded-md transform group-hover:rotate-12 transition-transform duration-300 ${
                isDarkMode ? 'bg-green-500' : 'bg-green-500'
              }`}></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight ${
                scrolled 
                  ? isDarkMode ? 'text-white' : 'text-gray-900'
                  : 'text-white'
              } text-xl`}>
                EcoRevive
              </span>
              {!scrolled && (
                <span className={`text-xs font-light tracking-wide ${
                  isDarkMode ? 'text-gray-300' : 'text-green-100'
                }`}>
                  Sustainable Future
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? scrolled
                      ? isDarkMode
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-600'
                      : 'bg-white/10 text-white'
                    : scrolled
                    ? isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-green-600'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Exchange Dropdown */}
            <div className="relative" ref={exchangeDropdownRef}>
              <button
                onClick={toggleExchangeDropdown}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 ${
                  isExchangeActive
                    ? scrolled
                      ? isDarkMode
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-600'
                      : 'bg-white/10 text-white'
                    : scrolled
                    ? isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-green-600'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                <span>Tukar Sampah</span>
                <span className={`text-xs transition-transform duration-200 ${
                  isExchangeDropdownOpen ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {isExchangeDropdownOpen && (
                <div className={`absolute left-0 top-full mt-2 w-64 rounded-lg shadow-lg border overflow-hidden z-50 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className={`p-4 border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <div className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Layanan Sampah
                    </div>
                    <div className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Kelola sampah dengan mudah
                    </div>
                  </div>

                  <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                    {exchangeItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeAllDropdowns}
                        className={`block px-3 py-3 rounded-md transition-colors duration-200 ${
                          location.pathname === item.path
                            ? isDarkMode
                              ? 'bg-green-900/50 text-green-300'
                              : 'bg-green-50 text-green-700'
                            : isDarkMode
                            ? 'text-gray-200 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${item.highlight ? 'border-l-2 border-l-blue-500' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.badge === 'Hot' 
                                ? isDarkMode
                                  ? 'bg-orange-900/50 text-orange-300'
                                  : 'bg-orange-100 text-orange-700'
                                : isDarkMode
                                ? 'bg-blue-900/50 text-blue-300'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className={`text-xs mt-1 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Features Dropdown */}
            <div className="relative" ref={featuresDropdownRef}>
              <button
                onClick={toggleFeaturesDropdown}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 ${
                  isFeaturesActive
                    ? scrolled
                      ? isDarkMode
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-600'
                      : 'bg-white/10 text-white'
                    : scrolled
                    ? isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-purple-600'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                <span>Fitur Canggih</span>
                <span className={`text-xs transition-transform duration-200 ${
                  isFeaturesDropdownOpen ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {isFeaturesDropdownOpen && (
                <div className={`absolute left-0 top-full mt-2 w-80 rounded-lg shadow-lg border overflow-hidden z-50 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className={`p-4 border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <div className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Teknologi Modern
                    </div>
                    <div className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Fitur canggih untuk pengalaman terbaik
                    </div>
                  </div>

                  <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                    {advancedFeatures.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeAllDropdowns}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors duration-200 ${
                          location.pathname === item.path
                            ? isDarkMode
                              ? 'bg-purple-900/50 text-purple-300'
                              : 'bg-purple-50 text-purple-700'
                            : isDarkMode
                            ? 'text-gray-200 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isDarkMode
                                  ? 'bg-green-900/50 text-green-300'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Marketplace Button */}
            <Link
              to="/marketplace"
              className="ml-2"
              onClick={closeAllDropdowns}
            >
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                scrolled 
                  ? isDarkMode
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                  : isDarkMode
                  ? 'bg-white hover:bg-gray-200 text-gray-900'
                  : 'bg-white hover:bg-gray-100 text-green-600'
              }`}>
                <span>🛍️</span>
                <span>Marketplace</span>
              </div>
            </Link>
          </div>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <DarkModeToggle />
                <button
                  onClick={handleLogin}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    scrolled 
                      ? isDarkMode
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                      : isDarkMode
                      ? 'bg-white hover:bg-gray-200 text-gray-900'
                      : 'bg-white hover:bg-gray-100 text-green-600'
                  }`}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DarkModeToggle />

            {user && (
              <button
                onClick={toggleUserDropdown}
                className="relative"
                ref={userDropdownRef}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${userColor}`}>
                    {getInitials(user?.name || 'User')}
                  </div>
                </div>
              </button>
            )}
            
            <button 
              onClick={toggleMobileMenu}
              data-mobile-menu-button
              className={`p-2 rounded-lg transition-colors duration-200 ${
                scrolled 
                  ? isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <span className="text-xl">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className={`lg:hidden rounded-lg mb-4 overflow-hidden ${
              scrolled 
                ? isDarkMode
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
                : isDarkMode
                ? 'bg-gray-800'
                : 'bg-green-700'
            }`}
          >
            <div className="py-4 space-y-1">
              {/* User Info Section */}
              {user && (
                <div className={`px-4 py-3 mx-2 mb-2 rounded-lg ${
                  scrolled 
                    ? isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    : isDarkMode ? 'bg-gray-700' : 'bg-green-600'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${userColor}`}>
                      {getInitials(user?.name || 'User')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${
                        scrolled 
                          ? isDarkMode ? 'text-white' : 'text-gray-900'
                          : 'text-white'
                      } truncate`}>
                        {user?.name || 'User'}
                      </div>
                      <div className={`text-sm ${
                        scrolled 
                          ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          : isDarkMode ? 'text-gray-300' : 'text-green-100'
                      } truncate`}>
                        {user?.email || ''}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              {mainMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeAllDropdowns}
                  className={`block px-4 py-3 mx-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? scrolled
                        ? isDarkMode
                          ? 'bg-green-600 text-white'
                          : 'bg-green-50 text-green-700'
                        : 'bg-white/10 text-white'
                      : scrolled
                      ? isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Marketplace Link */}
              <Link
                to="/marketplace"
                onClick={closeAllDropdowns}
                className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-colors duration-200 ${
                  scrolled
                    ? isDarkMode
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-yellow-400 text-gray-900'
                    : isDarkMode
                    ? 'bg-white text-gray-900'
                    : 'bg-white text-green-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>🛍️</span>
                  <span>Marketplace</span>
                </div>
              </Link>

              {/* Exchange Section in Mobile */}
              <div className={`border-t pt-3 mt-3 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className={`px-4 py-2 text-sm font-medium mb-2 ${
                  scrolled 
                    ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    : isDarkMode ? 'text-gray-300' : 'text-green-100'
                }`}>
                  Layanan Sampah
                </div>
                {exchangeItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeAllDropdowns}
                    className={`block px-4 py-3 mx-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? scrolled
                          ? isDarkMode
                            ? 'bg-green-600 text-white'
                            : 'bg-green-50 text-green-700'
                          : 'bg-white/10 text-white'
                        : scrolled
                        ? isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:bg-white/10'
                    } ${item.highlight ? 'border-l-2 border-l-blue-500' : ''}`}
                  >
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-xs mt-1 ${
                        scrolled 
                          ? isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          : isDarkMode ? 'text-gray-400' : 'text-green-200'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Advanced Features Section in Mobile */}
              <div className={`border-t pt-3 mt-3 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className={`px-4 py-2 text-sm font-medium mb-2 ${
                  scrolled 
                    ? isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    : isDarkMode ? 'text-gray-300' : 'text-green-100'
                }`}>
                  Fitur Canggih
                </div>
                {advancedFeatures.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeAllDropdowns}
                    className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? scrolled
                          ? isDarkMode
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-50 text-purple-700'
                          : 'bg-white/10 text-white'
                        : scrolled
                        ? isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-xs mt-1 ${
                        scrolled 
                          ? isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          : isDarkMode ? 'text-gray-400' : 'text-green-200'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile User Actions */}
              <MobileUserActions />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;