<?php
class WasteReport {
    private $conn;
    private $table_name = "waste_reports";
    private $activityLog;

    public $id;
    public $user_id;
    public $title;
    public $description;
    public $location;
    public $latitude;
    public $longitude;
    public $image_path;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
        $this->activityLog = new ActivityLog($db);
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, title=:title, description=:description, 
                      location=:location, latitude=:latitude, longitude=:longitude, 
                      image_path=:image_path";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":latitude", $this->latitude);
        $stmt->bindParam(":longitude", $this->longitude);
        $stmt->bindParam(":image_path", $this->image_path);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            
            // Log activity
            $this->activityLog->logActivity(
                $this->user_id,
                'waste_report',
                'User reported waste issue: ' . $this->title,
                'waste_reports',
                $this->id,
                null,
                json_encode([
                    'title' => $this->title,
                    'location' => $this->location,
                    'status' => 'reported'
                ])
            );
            
            return true;
        }
        return false;
    }

    public function updateStatus() {
        $old_data = $this->getReportById($this->id);
        
        $query = "UPDATE " . $this->table_name . " 
                  SET status=:status 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);
        
        if($stmt->execute()) {
            // Log activity
            $this->activityLog->logActivity(
                $this->user_id,
                'report_status_update',
                'Waste report status updated to: ' . $this->status,
                'waste_reports',
                $this->id,
                json_encode(['status' => $old_data['status']]),
                json_encode(['status' => $this->status])
            );
            
            return true;
        }
        return false;
    }

    private function getReportById($id) {
        $query = "SELECT status FROM waste_reports WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>