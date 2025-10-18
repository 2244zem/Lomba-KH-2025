<?php
class Config {
    public static function get($key, $default = null) {
        $value = getenv($key);
        return $value !== false ? $value : $default;
    }

    public static function load() {
        // Load .env file in development
        if (file_exists(__DIR__ . '/../.env')) {
            $lines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;
                
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);
                
                if (!array_key_exists($name, $_ENV)) {
                    putenv(sprintf('%s=%s', $name, $value));
                    $_ENV[$name] = $value;
                }
            }
        }
    }
}

// Load configuration
Config::load();

// Database configuration
define('DB_HOST', Config::get('DB_HOST', 'localhost'));
define('DB_NAME', Config::get('DB_NAME', 'ecoapp'));
define('DB_USER', Config::get('DB_USER', 'root'));
define('DB_PASSWORD', Config::get('DB_PASSWORD', ''));
define('DB_PORT', Config::get('DB_PORT', '3306'));

// JWT Configuration
define('JWT_SECRET', Config::get('JWT_SECRET', 'default_jwt_secret_change_in_production'));
define('JWT_EXPIRES_IN', Config::get('JWT_EXPIRES_IN', '7d'));

// App Configuration
define('APP_NAME', Config::get('APP_NAME', 'EcoApp'));
define('APP_ENV', Config::get('APP_ENV', 'production'));
define('APP_DEBUG', Config::get('APP_DEBUG', 'false') === 'true');
define('APP_URL', Config::get('APP_URL', 'http://localhost:8000'));

// Frontend URL for CORS
define('FRONTEND_URL', Config::get('FRONTEND_URL', 'http://localhost:3000'));

// File Upload
define('UPLOAD_MAX_SIZE', Config::get('UPLOAD_MAX_SIZE', 10485760)); // 10MB
define('ALLOWED_FILE_TYPES', explode(',', Config::get('ALLOWED_FILE_TYPES', 'image/jpeg,image/png,image/gif')));
?>