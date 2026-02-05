<?php

class Database {
    private static $instance = null;
    private $connection;
    private $host = "localhost";
    private $db_name = "my_cinema";
    private $user = "dawid";
    private $password = "pizza123";

    private function __construct ()
    {
        try {
            $dns = "mysql:host=" . $this->host . ";dbname=" . $this->db_name;
            $this->connection = new PDO($dns, $this->user, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }catch (PDOException $e) {
            echo "Eurreur de connexion: " . $e->getMessage();
        }
    }
    
    
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database;
        }    
        
        return self::$instance;
    }


    public function getConnection()
    {
        return $this->connection;
    }


}