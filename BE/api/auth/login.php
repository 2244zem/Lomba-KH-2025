<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        throw new Exception('Invalid JSON input');
    }

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Email and password are required'
        ]);
        exit();
    }

    // Database connection
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();

    // ✅ PERBAIKI QUERY - HANYA AMBIL KOLOM YANG ADA
    $query = "SELECT id, email, password, full_name as name, role FROM users WHERE email = ? LIMIT 1";
    $stmt = $db->prepare($query);
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
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email or password'
        ]);
        exit();
    }

    // Remove password from response
    unset($user['password']);

    // ✅ TAMBAHKAN DEFAULT VALUE UNTUK KOLOM YANG DIBUTUHKAN FRONTEND
    $user_response = [
        'id' => $user['id'],
        'email' => $user['email'],
        'name' => $user['name'],
        'role' => $user['role'],
        'balance' => 1000, // Default value
        'points' => 50     // Default value
    ];

    // Generate token
    $token_payload = [
        'user_id' => $user['id'],
        'email' => $user['email'],
        'iat' => time(),
        'exp' => time() + (24 * 60 * 60)
    ];
    
    $token = base64_encode(json_encode($token_payload));

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'data' => [
            'token' => $token,
            'user' => $user_response
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>