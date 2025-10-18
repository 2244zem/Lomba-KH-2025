<?php
// test-cors.php - FIX CORS ISSUE
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Log untuk debugging
error_log("✅ CORS Test accessed from: " . ($_SERVER['HTTP_ORIGIN'] ?? 'unknown'));

echo json_encode([
    'success' => true,
    'message' => '✅ CORS Test SUCCESSFUL! Backend is running.',
    'timestamp' => date('Y-m-d H:i:s'),
    'backend' => 'BE',
    'cors_configured' => true,
    'allowed_origin' => 'http://localhost:5173'
]);
?>