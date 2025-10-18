<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => '🚀 BE Backend Server is RUNNING!',
    'timestamp' => date('Y-m-d H:i:s'),
    'base_url' => 'http://localhost/BE',
    'endpoints' => [
        'login' => '/api/auth/login.php',
        'register' => '/api/auth/register.php'
    ]
]);
?>