import authApi from '../services/authApi';

export const apiTester = {
  async testConnection() {
    console.group('🔧 API Connection Test');
    
    try {
      // Test 1: Basic fetch
      console.log('1. Testing basic connectivity...');
      const health = await authApi.healthCheck();
      console.log('✅ Health check:', health);

      // Test 2: CORS preflight
      console.log('2. Testing CORS...');
      const corsTest = await fetch('http://localhost/ecoapp/api/auth/login.php', {
        method: 'OPTIONS'
      });
      console.log('✅ CORS test:', {
        status: corsTest.status,
        allowOrigin: corsTest.headers.get('access-control-allow-origin'),
        allowMethods: corsTest.headers.get('access-control-allow-methods')
      });

      // Test 3: File existence
      console.log('3. Testing file existence...');
      const fileTest = await fetch('http://localhost/ecoapp/api/auth/login.php');
      console.log('✅ File test:', fileTest.status);

      console.groupEnd();
      return { success: true, health, corsTest: corsTest.status };

    } catch (error) {
      console.error('❌ Connection test failed:', error);
      console.groupEnd();
      return { success: false, error: error.message };
    }
  },

  async testLogin() {
    console.group('🔐 Login Test');
    
    try {
      const testCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      console.log('Testing with:', testCredentials);
      const result = await authApi.login(testCredentials);
      console.log('✅ Login test result:', result);

      console.groupEnd();
      return result;

    } catch (error) {
      console.error('❌ Login test failed:', error);
      console.groupEnd();
      throw error;
    }
  }
};

// Auto-run connection test saat development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    apiTester.testConnection().catch(console.error);
  }, 1000);
}