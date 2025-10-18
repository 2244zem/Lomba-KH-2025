class EcoAuthService {
  constructor() {
    // PASTIKAN SELALU GUNAKAN /api DI AWAL PATH
    this.BASE_URL = '/api'
  }

  async request(url, options = {}) {
    // PASTIKAN URL SELALU DIMULAI DENGAN /api
    const fullUrl = url.startsWith('/api') ? url : `${this.BASE_URL}${url}`
    
    const config = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options
    }

    if (options.body) {
      config.body = JSON.stringify(options.body)
    }

    try {
      console.log(`🌐 API Call: ${config.method} ${fullUrl}`)
      
      const response = await fetch(fullUrl, config)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()

    } catch (error) {
      console.error('❌ API Error:', error)
      
      // Enhanced error message
      if (error.message.includes('Failed to fetch') || error.message.includes('404')) {
        throw new Error(
          'Tidak dapat terhubung ke server. Pastikan:\n\n' +
          '1. ✅ XAMPP/WAMP Apache & MySQL BERJALAN\n' +
          '2. ✅ Folder "ecoapp" ada di "htdocs"\n' +
          '3. 🔧 File PHP ada di: C:\\xampp\\htdocs\\ecoapp\\api\\auth\\login.php\n' +
          '4. 🌐 Test di browser: http://localhost/ecoapp/api/test-cors.php\n' +
          '5. 🔄 Restart XAMPP dan development server'
        )
      }
      
      throw error
    }
  }

  // Token Management
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('eco_token', token)
      console.log('🔐 Token saved')
    }
  }

  getAuthToken() {
    return localStorage.getItem('eco_token')
  }

  clearAuth() {
    localStorage.removeItem('eco_token')
    localStorage.removeItem('eco_user')
    console.log('🗑️ Auth cleared')
  }

  validateToken(token) {
    if (!token) return false
    try {
      const decoded = JSON.parse(atob(token))
      return decoded.exp > Date.now() / 1000
    } catch {
      return false
    }
  }

  // Auth Methods - GUNAKAN PATH RELATIVE TANPA /api
  async login(credentials) {
    const { email, password } = credentials
    
    if (!email || !password) {
      throw new Error('Email dan password harus diisi')
    }

    // Email validation
    if (!this.isValidEmail(email)) {
      throw new Error('Format email tidak valid')
    }

    try {
      // GUNAKAN PATH RELATIVE - proxy akan handle /api
      const response = await this.request('/auth/login.php', {
        method: 'POST',
        body: { email, password }
      })

      // Handle different response structures
      if (response.success) {
        if (response.data?.token) {
          this.setAuthToken(response.data.token)
          localStorage.setItem('eco_user', JSON.stringify(response.data.user))
          console.log('✅ Login successful')
          return response
        } else if (response.token) {
          // Handle legacy response format
          this.setAuthToken(response.token)
          localStorage.setItem('eco_user', JSON.stringify(response.user))
          console.log('✅ Login successful (legacy format)')
          return response
        }
      }

      throw new Error(response.error || 'Login failed')

    } catch (error) {
      console.error('❌ Login error:', error)
      throw error
    }
  }

  async register(userData) {
    const { name, email, password } = userData

    if (!name || !email || !password) {
      throw new Error('Nama, email, dan password harus diisi')
    }

    if (password.length < 6) {
      throw new Error('Password harus minimal 6 karakter')
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Format email tidak valid')
    }

    try {
      const response = await this.request('/auth/register.php', {
        method: 'POST',
        body: userData
      })

      if (response.success && response.data?.token) {
        this.setAuthToken(response.data.token)
        localStorage.setItem('eco_user', JSON.stringify(response.data.user))
        console.log('🎉 Registration successful')
        return response
      }

      throw new Error(response.error || 'Registration failed')

    } catch (error) {
      console.error('❌ Registration error:', error)
      throw error
    }
  }

  logout() {
    this.clearAuth()
    console.log('👋 Logout completed')
  }

  // User Management
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('eco_user')
      if (!userData) return null
      
      const user = JSON.parse(userData)
      
      // Ensure user has required properties
      return {
        id: user.id || user.user_id || Date.now(),
        name: user.name || 'User',
        email: user.email || '',
        balance: user.balance || 0,
        points: user.points || 0,
        role: user.role || 'user',
        ...user
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }

  isAuthenticated() {
    const token = this.getAuthToken()
    const user = this.getCurrentUser()
    return !!(token && user && this.validateToken(token))
  }

  // Utilities
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Test method - GUNAKAN PATH DENGAN /api
  async testConnection() {
    try {
      const response = await this.request('/test-cors.php')
      return {
        success: true,
        data: response,
        message: 'Server connected successfully'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Cannot connect to server'
      }
    }
  }

  // Health check - GUNAKAN PATH DENGAN /api
  async healthCheck() {
    try {
      const response = await this.request('/test-cors.php', {
        method: 'GET'
      })
      return {
        healthy: true,
        data: response
      }
    } catch (error) {
      return {
        healthy: false,
        error: error.message
      }
    }
  }
}

const authService = new EcoAuthService()
export default authService