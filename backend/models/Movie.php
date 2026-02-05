<?php

class Movie {
    private int $id;
    private string $title;
    private string $description;
    private int $duration;
    private int $release_year;
    private string $genre;
    private string $director;
    private string $created_at;
    private string $updated_at;


    public function __construct($id, $title, $description, $duration, $release_year, $genre, $director, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->duration = $duration;
        $this->release_year = $release_year;
        $this->genre = $genre;
        $this->director = $director;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public function toArray()
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "duration" => $this->duration,
            "release_year" => $this->release_year,
            "genre" => $this->genre,
            "director" => $this->director,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }
}