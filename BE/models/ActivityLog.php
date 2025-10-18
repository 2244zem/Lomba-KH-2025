<?php
class ActivityLog {
    private $conn;
    private $table_name = "activity_logs";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function logActivity($user_id, $activity_type, $description, $table_name = null, $record_id = null, $old_values = null, $new_values = null) {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, activity_type=:activity_type, description=:description, 
                      table_name=:table_name, record_id=:record_id, old_values=:old_values, new_values=:new_values";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":activity_type", $activity_type);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":table_name", $table_name);
        $stmt->bindParam(":record_id", $record_id);
        $stmt->bindParam(":old_values", $old_values);
        $stmt->bindParam(":new_values", $new_values);
        
        return $stmt->execute();
    }

    public function getUserActivities($user_id, $limit = 10) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE user_id = :user_id 
                  ORDER BY created_at DESC 
                  LIMIT :limit";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt;
    }
}
?>