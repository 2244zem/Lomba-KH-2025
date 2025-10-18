export const debugProxy = async () => {
  console.group('🐛 Debug Proxy Configuration');
  
  const testUrls = [
    '/api/test-cors.php',
    '/api/auth/login.php', 
    'http://localhost/ecoapp/api/test-cors.php',
    'http://localhost/ecoapp/api/auth/login.php'
  ];

  for (const url of testUrls) {
    try {
      console.log(`Testing: ${url}`);
      const response = await fetch(url, { method: 'GET' });
      console.log(`✅ ${url}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`❌ ${url}: ${error.message}`);
    }
  }
  
  console.groupEnd();
};

// Auto-run in development
if (import.meta.env.DEV) {
  setTimeout(debugProxy, 1000);
}