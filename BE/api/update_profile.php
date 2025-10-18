<?php
header("Content-Type: application/json");
include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->user_id) && !empty($data->full_name)) {
    $user->id = $data->user_id;
    $user->full_name = $data->full_name;
    $user->phone = $data->phone ?? '';
    $user->address = $data->address ?? '';
    $user->profile_picture = $data->profile_picture ?? '';

    if($user->updateProfile()) {
        echo json_encode(["message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["message" => "Unable to update profile"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>