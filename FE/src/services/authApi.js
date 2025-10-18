class EcoAuthService {
  constructor() {
    // ✅ PASTIKAN PATH INI BENAR
    this.BASE_URL = 'http://localhost/BE/api';
    this.timeout = 15000;
  }

  async request(endpoint, options = {}) {
    // Pastikan endpoint dimulai dengan slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${this.BASE_URL}${path}`;
    
    console.log(`🌐 API Call: ${options.method || 'POST'} ${fullUrl}`);
    
    const config = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for CORS with credentials
      ...options
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(fullUrl, config);
      
      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);
      return data;

    } catch (error) {
      console.error('❌ API Error:', error);
      
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        throw new Error(
          'Tidak dapat terhubung ke server. Pastikan:\n\n' +
          '1. ✅ XAMPP Apache & MySQL BERJALAN\n' + 
          '2. ✅ Test manual: http://localhost/BE/api/test-cors.php\n' +
          '3. 🔧 Backend path: C:\\xampp\\htdocs\\BE\\\n' +
          '4. 🔄 Restart XAMPP dan browser'
        );
      }
      
      throw error;
    }
  }

  // Test connection - FIX METHOD
  async testConnection() {
    try {
      console.log('🔍 Testing server connection...');
      const response = await this.request('/test-cors.php', {
        method: 'GET' // ✅ GUNAKAN GET, BUKAN POST
      });
      
      return {
        success: true,
        message: '✅ Server connected successfully',
        data: response
      };
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return {
        success: false,
        error: error.message,
        message: '❌ Cannot connect to server'
      };
    }
  }

  async login(credentials) {
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new Error('Email dan password harus diisi');
    }

    try {
      // Test connection first
      const testResult = await this.testConnection();
      if (!testResult.success) {
        throw new Error(testResult.error);
      }

      console.log('🔐 Attempting login for:', email);
      
      const response = await this.request('/auth/login.php', {
        method: 'POST',
        body: { email, password }
      });

      if (response.success && response.data?.token) {
        // Save token and user data
        localStorage.setItem('eco_token', response.data.token);
        localStorage.setItem('eco_user', JSON.stringify(response.data.user));
        
        console.log('✅ Login successful for:', email);
        return response;
      }

      throw new Error(response.error || 'Login failed');

    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  async register(userData) {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      throw new Error('Nama, email, dan password harus diisi');
    }

    try {
      // Test connection first
      const testResult = await this.testConnection();
      if (!testResult.success) {
        throw new Error(testResult.error);
      }

      console.log('📝 Attempting registration for:', email);
      
      const response = await this.request('/auth/register.php', {
        method: 'POST',
        body: userData
      });

      if (response.success) {
        console.log('🎉 Registration successful for:', email);
        return response;
      }

      throw new Error(response.error || 'Registration failed');

    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  }

  // Other methods remain the same...
  getAuthToken() {
    return localStorage.getItem('eco_token');
  }

  getCurrentUser() {
    try {
      const userData = localStorage.getItem('eco_user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated() {
    const token = this.getAuthToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  logout() {
    localStorage.removeItem('eco_token');
    localStorage.removeItem('eco_user');
    console.log('👋 Logout completed');
  }
}

const authService = new EcoAuthService();
export default authService;