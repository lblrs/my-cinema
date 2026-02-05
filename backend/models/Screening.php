<?php

class Screening {
    private $id;
    private Movie $movie_id;
    private Room $room_id;
    private ?string $start_time;
    private ?string $created_at;

    public function __construct ($id, Movie $movie_id, Room $room_id, $start_time, $created_at)
    {
        $this->id = $id;
        $this->movie_id = $movie_id;
        $this->room_id = $room_id;
        $this->start_time = $start_time;
        $this->created_at = $created_at;
    }

    public function toArray () 
    {
        return [
            "id" => $this->id,
            "movie_id" => $this->movie_id->toArray(),
            "room_id" => $this->room_id->toArray(),
            "start_time" => $this->start_time,
            "created_at" => $this->created_at
        ];
    }
}