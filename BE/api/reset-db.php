<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

try {
    $host = 'localhost';
    $dbname = 'ecoapp';
    $username = 'root';
    $password = '';
    
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Drop and recreate database
    $pdo->exec("DROP DATABASE IF EXISTS $dbname");
    $pdo->exec("CREATE DATABASE $dbname");
    $pdo->exec("USE $dbname");
    
    // Create complete users table
    $pdo->exec("
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            phone VARCHAR(20) DEFAULT '',
            address TEXT,
            role ENUM('user', 'admin') DEFAULT 'user',
            balance DECIMAL(10,2) DEFAULT 1000.00,
            points INT DEFAULT 50,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    
    // Add demo users
    $demo_password = password_hash('demo123', PASSWORD_DEFAULT);
    $pdo->exec("
        INSERT INTO users (username, email, password, full_name) 
        VALUES 
        ('demo_user', 'demo@ecoapp.com', '$demo_password', 'Demo User'),
        ('iqra_user', 'iqrazemylive@gmail.com', '$demo_password', 'Iqra Zemylive')
    ");

    echo json_encode([
        'success' => true,
        'message' => '✅ Database reset complete!',
        'users_created' => [
            'demo@ecoapp.com / demo123',
            'iqrazemylive@gmail.com / demo123'
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>