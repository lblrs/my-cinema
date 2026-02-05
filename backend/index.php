<?php 
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../backend/config/Database.php";
require_once __DIR__ . "/../backend/models/Movie.php";
require_once __DIR__ . "/../backend/controllers/MovieController.php";
require_once __DIR__ . "/../backend/models/Room.php";
require_once __DIR__ . "/../backend/controllers/RoomController.php";
require_once __DIR__ . "/../backend/models/Screening.php";
require_once __DIR__ . "/../backend/controllers/ScreeningController.php";


$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// GET /api/movies
if ($uri === '/api/movies' && $method === 'GET') {
    $controller = new MovieController();
    $movie = $controller->getAll();
    $moviesArray = array_map(fn($f) => $f->toArray(), $movie);
    echo json_encode($moviesArray);
}

// GET /api/movies/1
if (preg_match('/^\/api\/movies\/(\d+)$/', $uri, $matches) && $method === 'GET') {
    $id = $matches[1];
    $controller = new MovieController();
    $movie = $controller->getOne($id);

    if ($movie) {
        echo json_encode($movie->toArray());
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Film non trouvé']);
    }
}

// POST /api/movies
if ($uri === '/api/movies' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new MovieController();
    $id = $controller->create($data['title'], $data['description'], $data['duration'], $data['release_year'], $data['genre'], $data['director'], $data['created_at'], $data['updated_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Film créé']);
}




// GET /api/rooms - récupérer toutes les rooms
if ($uri === '/api/rooms' && $method === 'GET') {
    $controller = new RoomController();
    $rooms = $controller->getAll();
    $roomsArray = array_map(fn($s) => $s->toArray(), $rooms);
    echo json_encode($roomsArray);
}

// GET /api/rooms/1 - récupérer une room
if (preg_match('/^\/api\/rooms\/(\d+)$/', $uri, $matches) && $method === 'GET') {
    $id = $matches[1];
    $controller = new RoomController();
    $room = $controller->getOne($id);

    if ($room) {
        echo json_encode($room->toArray());
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Salle non trouvée']);
    }
}

// POST /api/rooms - créer une room
if ($uri === '/api/rooms' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new RoomController();
    $id = $controller->create($data['name'], $data['capacity'], $data['type'], $data['active'], $data['created_at'], $data['updated_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Salle créée']);
}


// GET /api/screenings - récupérer tous les senaces
if ($uri === '/api/screenings' && $method === 'GET') {
    $controller = new ScreeningController();
    $screenings = $controller->getAll();
    $screeningsArray = array_map(fn($f) => $f->toArray(), $screenings);
    echo json_encode($screeningsArray);
}

// GET /api/screenings/1 - récupérer un seane
if (preg_match('/^\/api\/screenings\/(\d+)$/', $uri, $matches) && $method === 'GET') {
    $id = $matches[1];
    $controller = new ScreeningController();
    $screening = $controller->getOne($id);

    if ($screening) {
        echo json_encode($screening->toArray());
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Seance non trouvé']);
    }
}

// POST /api/screenings - créer un screening
if ($uri === '/api/screenings' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new ScreeningController();
    $id = $controller->create($data['id'], $data['movie_id'], $data['room_id'], $data['start_time'], $data['created_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Seance créé']);
}
