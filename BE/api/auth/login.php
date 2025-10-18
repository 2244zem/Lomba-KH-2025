<?php
// CORS HEADERS - HARUS DI LINE PALING ATAS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log request
file_put_contents('login_debug.log', date('Y-m-d H:i:s') . " - Request: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        throw new Exception('Invalid JSON input');
    }

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    file_put_contents('login_debug.log', date('Y-m-d H:i:s') . " - Login attempt: " . $email . "\n", FILE_APPEND);

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Email and password are required'
        ]);
        exit();
    }

    // Database connection
    $host = 'localhost';
    $dbname = 'ecoapp';
    $username = 'root';
    $password_db = '';
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password_db);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check user
    $stmt = $pdo->prepare('SELECT id, email, password, name FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email or password'
        ]);
        exit();
    }

    // Verify password
    $passwordValid = password_verify($password, $user['password']) || md5($password) === $user['password'];

    if (!$passwordValid) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email or password'
        ]);
        exit();
    }

    // Generate token
    $tokenData = [
        'id' => $user['id'],
        'email' => $user['email'],
        'name' => $user['name'],
        'iat' => time(),
        'exp' => time() + (24 * 60 * 60)
    ];
    
    $token = base64_encode(json_encode($tokenData));

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'data' => [
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'balance' => 1000,
                'points' => 50
            ]
        ]
    ]);

    file_put_contents('login_debug.log', date('Y-m-d H:i:s') . " - Login success: " . $email . "\n", FILE_APPEND);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
    
    file_put_contents('login_debug.log', date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n", FILE_APPEND);
}
?>