import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authApi.getToken();
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          try {
            // Verify token with backend
            const isValid = await authApi.verifyToken(token);
            if (isValid) {
              const parsedUser = JSON.parse(userData);
              // Ensure user has required properties
              const validatedUser = {
                ...parsedUser,
                id: parsedUser.id || parsedUser.user_id || Date.now(),
                name: parsedUser.name || 'User',
                email: parsedUser.email || '',
                balance: parsedUser.balance || 0,
                points: parsedUser.points || 0
              };
              
              setUser(validatedUser);
              localStorage.setItem('user', JSON.stringify(validatedUser));
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('user');
              authApi.removeToken();
            }
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            localStorage.removeItem('user');
            authApi.removeToken();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authApi.login({ email, password });
      
      if (response.token) {
        authApi.setToken(response.token);
        
        // Ensure user data has all required properties
        const userWithDefaults = {
          id: response.user?.id || response.user?.user_id || Date.now(),
          name: response.user?.name || 'User',
          email: response.user?.email || email,
          balance: response.user?.balance || 0,
          points: response.user?.points || 0,
          ...response.user
        };
        
        localStorage.setItem('user', JSON.stringify(userWithDefaults));
        setUser(userWithDefaults);
        
        return response;
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authApi.register({ name, email, password });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authApi.removeToken();
      localStorage.removeItem('user');
      localStorage.removeItem('wasteTransactionHistory');
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear even if there's an error
      localStorage.clear();
      setUser(null);
    }
  };

  const updateUserBalance = async (newBalance) => {
    if (!user) {
      throw new Error('User not logged in');
    }

    if (typeof newBalance !== 'number' || newBalance < 0) {
      throw new Error('Invalid balance amount');
    }

    try {
      // Update balance in backend (you can add API call here if needed)
      // await axios.put(`${API_BASE_URL}/user/balance`, { balance: newBalance });
      
      const updatedUser = {
        ...user,
        balance: newBalance
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Update balance error:', error);
      throw new Error('Failed to update balance');
    }
  };

  const addToBalance = async (amount) => {
    if (!user) {
      throw new Error('User not logged in');
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const newBalance = (user.balance || 0) + amount;
    return await updateUserBalance(newBalance);
  };

  const deductFromBalance = async (amount) => {
    if (!user) {
      throw new Error('User not logged in');
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const currentBalance = user.balance || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = currentBalance - amount;
    return await updateUserBalance(newBalance);
  };

  const updateUserProfile = async (userData) => {
    if (!user) {
      throw new Error('User not logged in');
    }

    try {
      // You can uncomment this if you want to sync with backend
      // const response = await authApi.updateProfile(userData);
      
      const updatedUser = {
        ...user,
        ...userData
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Failed to update profile');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserBalance,
    addToBalance,
    deductFromBalance,
    updateUserProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
