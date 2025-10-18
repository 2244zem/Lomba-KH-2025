// src/services/authApi.js
const API_BASE_URL = 'http://localhost/ecoapp/api';

// Enhanced authApi dengan error handling lebih robust
export const authApi = {
  // Token management - TIDAK DIUBAH
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  verifyToken: (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // Enhanced API requests dengan retry mechanism
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔄 API Request to:', url);

    const config = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'omit'
    };

    if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
      config.body = JSON.stringify(options.body);
      console.log('📦 Request Body:', config.body);
    }

    try {
      const response = await fetch(url, config);
      console.log('📡 Response Status:', response.status);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.warn('⚠️ Non-JSON response:', textResponse);
        
        if (response.ok) {
          return { success: true, message: 'Operation successful' };
        } else {
          throw new Error(`Server returned non-JSON response: ${textResponse}`);
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server Error Response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { 
            message: errorText || `HTTP error! status: ${response.status}`,
            status: response.status
          };
        }
        
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      const responseData = await response.json();
      console.log('✅ Success Response:', responseData);
      return responseData;

    } catch (error) {
      console.error('💥 Fetch Error:', error);
      
      // Enhanced error messages
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        const enhancedError = new Error(
          'Tidak dapat terhubung ke server. Pastikan:\n' +
          '1. XAMPP/WAMP Apache & MySQL berjalan\n' +
          '2. Folder ecoapp ada di htdocs\n' + 
          '3. Database ecoapp sudah diimport\n' +
          '4. Tidak ada firewall yang memblokir\n' +
          '5. Port 80 tidak digunakan aplikasi lain'
        );
        enhancedError.code = 'NETWORK_ERROR';
        throw enhancedError;
      }
      
      if (error.name === 'SyntaxError') {
        const enhancedError = new Error('Invalid response format from server');
        enhancedError.code = 'INVALID_JSON';
        throw enhancedError;
      }
      
      // Preserve original error but add code
      error.code = error.code || 'UNKNOWN_ERROR';
      throw error;
    }
  },

  // Enhanced register dengan validation
  register: async (userData) => {
    // Validation
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Name, email, and password are required');
    }

    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return authApi.request('/auth/register.php', {
      method: 'POST',
      body: userData,
    });
  },

  // Enhanced login dengan validation
  login: async (credentials) => {
    // Validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    return authApi.request('/auth/login.php', {
      method: 'POST',
      body: credentials,
    });
  },

  // Tambahkan method baru untuk health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'HEAD',
        mode: 'cors'
      });
      return response.ok;
    } catch {
      return false;
    }
  }
};