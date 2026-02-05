<?php

class Room {
    private int $id;
    private string $name;
    private int $capacity;
    private string $type;
    private $active = true;
    private string $created_at;
    private string $updated_at;

    public function __construct($id, $name, $capacity, $type, $active, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->name = $name;
        $this->capacity = $capacity;
        $this->type = $type;
        $this->active = $active;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public function toArray()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "capacity" => $this->capacity,
            "type" => $this->type,
            "active" => $this->active,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }


}