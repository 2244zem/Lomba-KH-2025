<?php
class Product {
    private $conn;
    private $table_name = "products";
    private $activityLog;

    public $id;
    public $user_id;
    public $title;
    public $description;
    public $price;
    public $category;
    public $image_path;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
        $this->activityLog = new ActivityLog($db);
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, title=:title, description=:description, 
                      price=:price, category=:category, image_path=:image_path";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":image_path", $this->image_path);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            
            // Log activity
            $this->activityLog->logActivity(
                $this->user_id,
                'product_upload',
                'User uploaded new product: ' . $this->title,
                'products',
                $this->id,
                null,
                json_encode([
                    'title' => $this->title,
                    'price' => $this->price,
                    'category' => $this->category
                ])
            );
            
            return true;
        }
        return false;
    }

    public function update() {
        $old_data = $this->getProductById($this->id);
        
        $query = "UPDATE " . $this->table_name . " 
                  SET title=:title, description=:description, price=:price, 
                      category=:category, image_path=:image_path, status=:status 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":image_path", $this->image_path);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);
        
        if($stmt->execute()) {
            // Log activity
            $new_data = [
                'title' => $this->title,
                'description' => $this->description,
                'price' => $this->price,
                'category' => $this->category,
                'status' => $this->status
            ];
            
            $this->activityLog->logActivity(
                $this->user_id,
                'product_update',
                'User updated product: ' . $this->title,
                'products',
                $this->id,
                json_encode($old_data),
                json_encode($new_data)
            );
            
            return true;
        }
        return false;
    }

    private function getProductById($id) {
        $query = "SELECT title, description, price, category, status FROM products WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>