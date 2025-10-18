<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $host = 'localhost';
    $dbname = 'ecoapp';
    $username = 'root';
    $password = '';
    
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if not exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    $pdo->exec("USE $dbname");
    
    // Create users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            phone VARCHAR(20),
            address TEXT,
            role ENUM('user', 'admin') DEFAULT 'user',
            balance DECIMAL(10,2) DEFAULT 1000.00,
            points INT DEFAULT 50,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    
    // Check if demo user exists
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE email = 'demo@ecoapp.com'");
    $demo_exists = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    if (!$demo_exists) {
        $demo_password = password_hash('demo123', PASSWORD_DEFAULT);
        $pdo->exec("
            INSERT INTO users (username, email, password, full_name, balance, points) 
            VALUES ('demo_user', 'demo@ecoapp.com', '$demo_password', 'Demo User', 1000, 50)
        ");
    }

    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $users_count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    echo json_encode([
        'success' => true,
        'message' => '✅ Database READY!',
        'database' => $dbname,
        'tables' => $tables,
        'users_count' => $users_count,
        'demo_credentials' => [
            'email' => 'demo@ecoapp.com',
            'password' => 'demo123'
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>