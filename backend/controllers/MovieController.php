<?php
require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../models/Movie.php";

class MovieController {
    private $db;

    public function __construct()
    {
        $database = Database::getInstance();
        $this->db = $database->getConnection();
    }

    public function getAll()
    {
        $query = 'SELECT * FROM movies';
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $movies = [];

        foreach ($results as $row) {
            $movie = new Movie 
            (
                $row["id"],
                $row["title"],
                $row["description"],
                $row["duration"],
                $row["release_year"],
                $row["genre"],
                $row["director"],
                $row["created_at"],
                $row["updated_at"]
            );
             $movies[] = $movie;
        }
        return $movies;
    }


    public function getOne($id)
    {
        $query = "SELECT * FROM movies WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return new Movie 
                (
                $row["id"],
                $row["title"],
                $row["description"],
                $row["duration"],
                $row["release_year"],
                $row["genre"],
                $row["director"],
                $row["created_at"],
                $row["updated_at"]
                );
        }
        return null;
    }


    public function create($title, $description, $duration, $release_year, $genre, $director, $created_at, $updated_at)
    {
        $created_at = (new DateTime($created_at))->format('Y-m-d H:i:s');
        $updated_at = (new DateTime($updated_at))->format('Y-m-d H:i:s');

        $query = "INSERT INTO movies (title, description, duration, release_year, genre, director, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt =$this->db->prepare($query);
        $stmt->execute([$title, $description, $duration, $release_year, $genre, $director, $created_at, $updated_at]);

        return $this->db->lastInsertId();
    }

}