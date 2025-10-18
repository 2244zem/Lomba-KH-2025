<?php
/**
 * JWT Configuration and Utilities
 * Unified JWT handling untuk seluruh aplikasi
 */

// Simple JWT implementation untuk menghindari dependency
if (!function_exists('generateJWT')) {
    function generateJWT($payload) {
        $secret = 'ecoapp-secret-key-' . date('Y-m-d') . '-change-in-production';
        
        // Header
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        
        // Add standard claims
        $payload['iss'] = 'ecoapp';
        $payload['iat'] = time();
        $payload['exp'] = time() + (24 * 60 * 60); // 24 hours
        
        $payload = json_encode($payload);
        
        // Encode
        $base64UrlHeader = base64UrlEncode($header);
        $base64UrlPayload = base64UrlEncode($payload);
        
        // Signature
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = base64UrlEncode($signature);
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }
}

if (!function_exists('verifyJWT')) {
    function verifyJWT($jwt) {
        $secret = 'ecoapp-secret-key-' . date('Y-m-d') . '-change-in-production';
        
        try {
            $parts = explode('.', $jwt);
            if (count($parts) != 3) {
                return false;
            }
            
            list($header, $payload, $signature) = $parts;
            
            // Verify signature
            $validSignature = hash_hmac('sha256', $header . "." . $payload, $secret, true);
            $validSignature = base64UrlEncode($validSignature);
            
            if ($signature !== $validSignature) {
                return false;
            }
            
            // Decode payload
            $payload = base64UrlDecode($payload);
            $data = json_decode($payload, true);
            
            // Check expiration
            if (isset($data['exp']) && $data['exp'] < time()) {
                return false;
            }
            
            return $data;
            
        } catch (Exception $e) {
            return false;
        }
    }
}

if (!function_exists('base64UrlEncode')) {
    function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}

if (!function_exists('base64UrlDecode')) {
    function base64UrlDecode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}

// Middleware function untuk protected routes
if (!function_exists('authenticateJWT')) {
    function authenticateJWT() {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = $matches[1];
            $userData = verifyJWT($token);
            
            if ($userData) {
                return $userData;
            }
        }
        
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'error' => 'Token tidak valid atau expired',
            'code' => 'INVALID_TOKEN'
        ]);
        exit();
    }
}
?>