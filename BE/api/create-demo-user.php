<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $host = 'localhost';
    $dbname = 'ecoapp';
    $username = 'root';
    $password = '';
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute(['iqrazemylive@gmail.com']);
    $user_exists = $stmt->fetch();

    if (!$user_exists) {
        // Create user
        $password_hash = password_hash('demo123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("
            INSERT INTO users (username, email, password, full_name, balance, points) 
            VALUES (?, ?, ?, ?, 1000, 50)
        ");
        $stmt->execute([
            'iqrazemylive',
            'iqrazemylive@gmail.com', 
            $password_hash,
            'Iqra Zemylive'
        ]);
        
        $message = "✅ User created: iqrazemylive@gmail.com / demo123";
    } else {
        $message = "✅ User already exists";
    }

    echo json_encode([
        'success' => true,
        'message' => $message,
        'credentials' => [
            'email' => 'iqrazemylive@gmail.com',
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