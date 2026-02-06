<?php
require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../models/Movie.php";
require_once __DIR__ . "/../models/Room.php";

class ScreeningController {
    private $db;

    public function __construct ()
    {
        $database = Database::getInstance();
        $this->db = $database->getConnection();
    }

    public function getAll()
    {
        $query = 'SELECT screenings.*,
        movies.title, movies.description, movies.duration, movies.release_year, movies.genre, movies.director, movies.created_at, movies.updated_at,
        rooms.name, rooms.capacity, rooms.type, rooms.active, rooms.created_at, rooms.updated_at
        FROM screenings
        JOIN movies ON screenings.movie_id = movies.id
        JOIN rooms ON screenings.room_id = rooms.id';

        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $screenings = [];

        foreach ($results as $row) {
            $movie = new Movie 
             (
                $row["movie_id"],
                $row["title"],
                $row["description"],
                $row["duration"],
                $row["release_year"],
                $row["genre"],
                $row["director"],
                $row["created_at"],
                $row["updated_at"]
            );

            $room = new Room 
            (
                $row["room_id"],
                $row["name"],
                $row["capacity"],
                $row["type"],
                $row["active"],
                $row["created_at"],
                $row["updated_at"]
            );

            $screening = new Screening 
            (
                $row['id'],
                $movie,
                $room,
                $row['start_time'],
                $row['created_at']
            );

            $screenings[] = $screening;
        }

        return $screenings;
    }


    public function getOne($id)
    {
        $query = 'SELECT * FROM screenings WHERE id = :id';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            return new Screening($row['id'], $row['movie_id'], $row['room_id'], $row['start_time'], $row['created_at']);
        }

        return null;
    }

    public function create($movie_id, $room_id, $start_time, $created_at)
    {
        $created_at = (new DateTime($created_at))->format('Y-m-d H:i:s');

        $query = 'INSERT INTO screenings (movie_id, room_id, start_time, created_at) VALUES (?,?,?,?)';
        $stmt = $this->db->prepare($query);
        $stmt->execute([$movie_id, $room_id, $start_time, $created_at]);

        return $this->db->lastInsertId();
    }


    public function update($id, $movie_id, $room_id, $start_time)
    {
        $query = 'UPDATE screenings SET movie_id = ?, room_id = ?, start_time = ? WHERE id = ?';
        $stmt = $this->db->prepare($query);
        $stmt->execute([$movie_id, $room_id, $start_time, $id]);

        return $id;
    }


    public function delete($id)
    {
        $query = 'DELETE FROM screenings WHERE id = ?';
        $stmt = $this->db->prepare($query);
        $stmt->execute([$id]);
    }
} 