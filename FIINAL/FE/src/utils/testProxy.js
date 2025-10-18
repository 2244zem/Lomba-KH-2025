import authService from '../services/authApi';

export const testProxyConnection = async () => {
  console.group('🔧 Testing Proxy Configuration');
  
  try {
    // Test 1: Basic proxy connection
    console.log('1. Testing proxy connection...');
    const health = await authService.healthCheck();
    console.log('Health check:', health);

    // Test 2: CORS test endpoint
    console.log('2. Testing CORS endpoint...');
    const corsTest = await authService.testConnection();
    console.log('CORS test:', corsTest);

    // Test 3: Direct fetch to verify proxy
    console.log('3. Testing direct proxy call...');
    const directTest = await fetch('/api/test-cors.php');
    console.log('Direct test:', {
      status: directTest.status,
      ok: directTest.ok,
      url: directTest.url
    });

    console.groupEnd();
    return { success: true, health, corsTest };

  } catch (error) {
    console.error('❌ Proxy test failed:', error);
    console.groupEnd();
    return { success: false, error: error.message };
  }
};

// Auto-test in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    testProxyConnection().then(result => {
      if (!result.success) {
        console.log('💡 Tips: Check if XAMPP is running and ecoapp folder exists in htdocs');
      }
    });
  }, 1000);
}