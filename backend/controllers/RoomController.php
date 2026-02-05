<?php
require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../models/Room.php";

class RoomController {
    private $db;

    public function __construct()
    {
        $database = Database::getInstance();
        $this->db = $database->getConnection();
    }

    
    public function getAll()
    {
        $query = 'SELECT * FROM rooms';
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $rooms = [];

        foreach ($results as $row) {
            $room = new Room (

                $row["id"],
                $row["name"],
                $row["capacity"],
                $row["type"],
                $row["active"],
                $row["created_at"],
                $row["updated_at"]
            );
             $rooms[] = $room;
        }
        return $rooms;
    }

    public function getOne($id)
    {
        $query = "SELECT * FROM rooms WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return new Room
                (
                $row["id"],
                $row["name"],
                $row["capacity"],
                $row["type"],
                $row["active"],
                $row["created_at"],
                $row["updated_at"]
                );
        }
        return null;
    }

    public function create($name, $capacity, $type, $active, $created_at, $updated_at)
    {
        $created_at = (new DateTime($created_at))->format('Y:m:d H:i:s');
        $updated_at = (new Datetime($updated_at))->format('y:m:d H:i:s');
        $active = true;

        $query = "INSERT INTO rooms (name, capacity, type, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt =$this->db->prepare($query);
        $stmt->execute([$name, $capacity, $type, $active, $created_at, $updated_at]);

        return $this->db->lastInsertId();
    }

}