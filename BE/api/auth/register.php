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

    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Name, email, and password are required'
        ]);
        exit();
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Password must be at least 6 characters'
        ]);
        exit();
    }

    // Database connection
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();

    // Check if email exists
    $query = "SELECT id FROM users WHERE email = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Email already registered'
        ]);
        exit();
    }

    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $username = strtolower(explode('@', $email)[0]) . '_' . time();

    // Insert user
    $query = "INSERT INTO users (username, email, password, full_name, balance, points) VALUES (?, ?, ?, ?, 1000, 50)";
    $stmt = $db->prepare($query);
    $success = $stmt->execute([$username, $email, $password_hash, $name]);

    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! Please login.',
            'data' => [
                'email' => $email,
                'name' => $name
            ]
        ]);
    } else {
        throw new Exception('Failed to create user');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Registration failed: ' . $e->getMessage()
    ]);
}
?>