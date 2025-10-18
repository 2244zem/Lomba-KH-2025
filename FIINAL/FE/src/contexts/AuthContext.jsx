import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // JANGAN TEST SERVER DI INIT - biarkan user login dulu
      const user = authService.getCurrentUser();
      const isAuthenticated = authService.isAuthenticated();

      if (isAuthenticated && user) {
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false
        }));
      } else {
        // Clear invalid auth data
        if (user && !isAuthenticated) {
          authService.clearAuth();
        }
        setState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false
        }));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      authService.clearAuth();
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Gagal memuat data autentikasi',
        isAuthenticated: false
      }));
    }
  };

  const login = async (email, password) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null 
      }));

      console.log('🔐 Attempting login for:', email);

      // Test server connection first
      try {
        const testResult = await authService.testConnection();
        console.log('📡 Connection test result:', testResult);
        
        if (!testResult.success) {
          throw new Error(testResult.error || 'Server tidak merespons');
        }
      } catch (testError) {
        console.error('❌ Server test failed:', testError);
        throw new Error(`Tidak dapat terhubung ke server: ${testError.message}`);
      }

      const result = await authService.login({ email, password });
      
      if (result.success || result.data?.token) {
        const user = authService.getCurrentUser();
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));
        
        return {
          success: true,
          message: 'Login berhasil',
          data: result.data || result
        };
      }

      throw new Error(result.error || 'Login gagal');

    } catch (error) {
      const errorMessage = error.message || 'Terjadi kesalahan saat login';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null 
      }));

      console.log('📝 Attempting registration for:', userData.email);

      // Test server connection first
      const testResult = await authService.testConnection();
      if (!testResult.success) {
        throw new Error(testResult.error || 'Server tidak merespons');
      }

      const result = await authService.register(userData);
      
      if (result.success || result.message?.includes('berhasil')) {
        // For registration, try to login automatically
        try {
          await login(userData.email, userData.password);
          return {
            success: true,
            message: 'Registrasi berhasil',
            data: result.data || result
          };
        } catch (loginError) {
          // Registration success but auto-login failed
          return {
            success: true,
            message: 'Registrasi berhasil. Silakan login manual.',
            data: result.data || result
          };
        }
      }

      throw new Error(result.error || result.message || 'Registrasi gagal');

    } catch (error) {
      const errorMessage = error.message || 'Terjadi kesalahan saat registrasi';
      console.error('Registration error:', errorMessage);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear even if there's an error
      localStorage.clear();
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      });
    }
  };

  const updateUser = (updates) => {
    setState(prev => {
      if (!prev.user) return prev;
      
      const updatedUser = { 
        ...prev.user, 
        ...updates 
      };
      
      // Update localStorage
      localStorage.setItem('eco_user', JSON.stringify(updatedUser));
      
      return { 
        ...prev, 
        user: updatedUser 
      };
    });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const testServerConnection = async () => {
    try {
      const result = await authService.testConnection();
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Tidak dapat terhubung ke server'
      };
    }
  };

  const value = {
    // State
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,

    login,
    register,
    logout,
    updateUser,
    clearError,

    hasRole: (role) => state.user?.role === role,

    testServerConnection
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;