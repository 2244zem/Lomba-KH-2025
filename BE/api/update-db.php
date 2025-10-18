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

    // ✅ UPDATE TABLE - ADD MISSING COLUMNS
    $alter_queries = [
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS balance DECIMAL(10,2) DEFAULT 1000.00",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS points INT DEFAULT 50",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20) DEFAULT ''",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ];

    $results = [];
    foreach ($alter_queries as $query) {
        try {
            $pdo->exec($query);
            $results[] = "✅ SUCCESS: " . $query;
        } catch (Exception $e) {
            $results[] = "❌ FAILED: " . $query . " - " . $e->getMessage();
        }
    }

    // Check current table structure
    $stmt = $pdo->query("DESCRIBE users");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'message' => 'Database update attempted',
        'results' => $results,
        'table_structure' => $columns
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>