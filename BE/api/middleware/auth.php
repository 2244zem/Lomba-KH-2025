<?php
/**
 * Authentication Middleware
 * Include file ini di routes yang butuh proteksi
 */
require_once __DIR__ . '/../config/jwt.php';

function requireAuth() {
    return authenticateJWT();
}

function optionalAuth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $token = $matches[1];
        return verifyJWT($token);
    }
    
    return null;
}
?>