// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isExchangeDropdownOpen, setIsExchangeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userDropdownRef = useRef(null);
  const exchangeDropdownRef = useRef(null);
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

  // Main navigation
  const mainMenuItems = [
    { 
      path: '/', 
      label: 'Peta Sampah',
      notification: location.pathname === '/' ? 'active' : null
    },
    { 
      path: '/ai-assistant', 
      label: 'AI Assistant',
      notification: location.pathname === '/ai-assistant' ? 'active' : null
    },
    { 
      path: '/pusat-daur-ulang', 
      label: 'Daur Ulang',
      notification: location.pathname === '/pusat-daur-ulang' ? 'active' : null
    },
    { 
      path: '/bisnis-lingkungan', 
      label: 'Bisnis',
      notification: location.pathname === '/bisnis-lingkungan' ? 'active' : null
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
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsExchangeDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleExchangeDropdown = () => {
    setIsExchangeDropdownOpen(!isExchangeDropdownOpen);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
      setIsMobileMenuOpen(false);
      setIsExchangeDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    navigate('/auth');
  };

  const closeAllDropdowns = () => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsExchangeDropdownOpen(false);
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

  const formatBalance = (balance) => {
    if (balance === undefined || balance === null) return '0';
    return new Intl.NumberFormat('id-ID').format(balance);
  };

  // Simple User Menu
  const UserMenu = () => (
    <div className="flex items-center space-x-4">
      {/* Profil Link - langsung navigasi tanpa dropdown */}
      <Link
        to="/profil"
        onClick={closeAllDropdowns}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          scrolled 
            ? 'text-gray-700 hover:text-green-600' 
            : 'text-white hover:text-green-100'
        }`}
      >
        Profil
      </Link>

      {/* User info dengan dropdown sederhana */}
      <div className="relative" ref={userDropdownRef}>
        <button
          onClick={toggleUserDropdown}
          className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
            scrolled 
              ? 'hover:bg-gray-100' 
              : 'hover:bg-white/10'
          } ${isUserDropdownOpen ? (scrolled ? 'bg-gray-100' : 'bg-white/10') : ''}`}
        >
          <div className="text-right">
            <div className={`text-sm font-medium max-w-32 truncate ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}>
              {user.name}
            </div>
            <div className={`text-xs ${
              scrolled ? 'text-gray-500' : 'text-green-100'
            }`}>
              {formatBalance(user.points)} pts
            </div>
          </div>
          
          <div className="relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
              <div className={`w-full h-full rounded-full flex items-center justify-center ${userColor}`}>
                {getInitials(user.name)}
              </div>
            </div>
          </div>
        </button>

        {/* Simple dropdown menu */}
        {isUserDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            <div className="p-2">
              <button
                onClick={() => {
                  navigate('/pengaturan');
                  closeAllDropdowns();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Pengaturan
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
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
    <div className="border-t border-gray-200 pt-4 mt-4">
      {user ? (
        <div className="space-y-2">
          <Link
            to="/profil"
            onClick={closeAllDropdowns}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
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
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              scrolled
                ? 'text-red-600 hover:bg-red-50'
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
              ? 'bg-green-500 hover:bg-green-600 text-white'
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
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
        : 'bg-green-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Simple & Modern */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={closeAllDropdowns}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-md transform group-hover:rotate-12 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight ${
                scrolled ? 'text-xl text-gray-900' : 'text-xl text-white'
              }`}>
                EcoRevive
              </span>
              {!scrolled && (
                <span className="text-green-100 text-xs font-light tracking-wide">
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
                      ? 'text-green-600 bg-green-50'
                      : 'text-white bg-white/10'
                    : scrolled
                    ? 'text-gray-600 hover:text-green-600'
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
                      ? 'text-green-600 bg-green-50'
                      : 'text-white bg-white/10'
                    : scrolled
                    ? 'text-gray-600 hover:text-green-600'
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
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="font-semibold text-gray-900">
                      Layanan Sampah
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
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
                            ? 'bg-green-50 text-green-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${item.highlight ? 'border-l-2 border-l-blue-500' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.badge === 'Hot' 
                                ? 'bg-orange-100 text-orange-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.description}
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
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
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
              <button
                onClick={handleLogin}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  scrolled 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-green-600'
                }`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {user && (
              <button
                onClick={toggleUserDropdown}
                className="relative"
                ref={userDropdownRef}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${userColor}`}>
                    {getInitials(user.name)}
                  </div>
                </div>
              </button>
            )}
            
            <button 
              onClick={toggleMobileMenu}
              data-mobile-menu-button
              className={`p-2 rounded-lg transition-colors duration-200 ${
                scrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
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
                ? 'bg-white border border-gray-200' 
                : 'bg-green-700'
            }`}
          >
            <div className="py-4 space-y-1">
              {/* User Info Section */}
              {user && (
                <div className={`px-4 py-3 mx-2 mb-2 rounded-lg ${
                  scrolled ? 'bg-gray-50' : 'bg-green-600'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${userColor}`}>
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${scrolled ? 'text-gray-900' : 'text-white'} truncate`}>
                        {user.name}
                      </div>
                      <div className={`text-sm ${scrolled ? 'text-gray-600' : 'text-green-100'} truncate`}>
                        {user.email}
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
                        ? 'bg-green-50 text-green-700'
                        : 'bg-white/10 text-white'
                      : scrolled
                      ? 'text-gray-700 hover:bg-gray-50'
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
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white text-green-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>🛍️</span>
                  <span>Marketplace</span>
                </div>
              </Link>

              {/* Exchange Section in Mobile */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className={`px-4 py-2 text-sm font-medium mb-2 ${
                  scrolled ? 'text-gray-500' : 'text-green-100'
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
                          ? 'bg-green-50 text-green-700'
                          : 'bg-white/10 text-white'
                        : scrolled
                        ? 'text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:bg-white/10'
                    } ${item.highlight ? 'border-l-2 border-l-blue-500' : ''}`}
                  >
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-xs mt-1 ${
                        scrolled ? 'text-gray-500' : 'text-green-200'
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