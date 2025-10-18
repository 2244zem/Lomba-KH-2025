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

      const result = await authService.login({ email, password });
      
      if (result.success || result.token) {
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

      const result = await authService.register(userData);
      
      if (result.success && result.data?.token) {
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
          message: 'Registrasi berhasil',
          data: result.data
        };
      }

      throw new Error(result.error || 'Registrasi gagal');

    } catch (error) {
      const errorMessage = error.message || 'Terjadi kesalahan saat registrasi';
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

  const value = {
    // State
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateUser,
    clearError,

    // Utilities
    hasRole: (role) => state.user?.role === role,
    
    // Test method
    testServerConnection: () => authService.testConnection()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;