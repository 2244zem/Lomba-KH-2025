<?php
require_once 'config/config.php';
require_once 'config/database.php';
require_once 'middleware/auth.php';

// Set headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: " . FRONTEND_URL);
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple routing
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch (true) {
        case preg_match('/\/api\/auth\/login/', $request) && $method === 'POST':
            require 'auth/login.php';
            break;
            
        case preg_match('/\/api\/auth\/register/', $request) && $method === 'POST':
            require 'auth/register.php';
            break;
            
        case preg_match('/\/api\/marketplace\/products/', $request) && $method === 'GET':
            require 'marketplace/products.php';
            break;
            
        case preg_match('/\/api\/marketplace\/upload/', $request) && $method === 'POST':
            require 'marketplace/upload_product.php';
            break;
            
        case preg_match('/\/api\/user\/profile/', $request) && $method === 'PUT':
            require 'middleware/update_profile.php';
            break;
            
        case $request === '/api/health':
            echo json_encode([
                'status' => 'success',
                'message' => APP_NAME . ' API is running',
                'environment' => APP_ENV,
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Endpoint not found'
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => APP_DEBUG ? $e->getMessage() : 'Internal server error'
    ]);
}
?>DB_HOST=your-production-db-host