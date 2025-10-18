<?php
class User {
    private $conn;
    private $table_name = "users";
    private $activityLog;

    public $id;
    public $username;
    public $email;
    public $password;
    public $full_name;
    public $profile_picture;
    public $phone;
    public $address;

    public function __construct($db) {
        $this->conn = $db;
        $this->activityLog = new ActivityLog($db);
    }

    public function updateProfile() {
        // Ambil data lama sebelum update
        $old_data = $this->getUserById($this->id);
        
        $query = "UPDATE " . $this->table_name . " 
                  SET full_name=:full_name, profile_picture=:profile_picture, 
                      phone=:phone, address=:address 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":profile_picture", $this->profile_picture);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":id", $this->id);
        
        if($stmt->execute()) {
            // Log activity
            $new_data = [
                'full_name' => $this->full_name,
                'profile_picture' => $this->profile_picture,
                'phone' => $this->phone,
                'address' => $this->address
            ];
            
            $this->activityLog->logActivity(
                $this->id,
                'profile_update',
                'User updated profile information',
                'users',
                $this->id,
                json_encode($old_data),
                json_encode($new_data)
            );
            
            return true;
        }
        return false;
    }

    private function getUserById($id) {
        $query = "SELECT full_name, profile_picture, phone, address FROM users WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>