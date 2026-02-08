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





// FILMS

// GET
if ($uri === '/api/movies' && $method === 'GET') {
    $controller = new MovieController();
    $movie = $controller->getAll();
    $moviesArray = array_map(fn($f) => $f->toArray(), $movie);
    echo json_encode($moviesArray);
}

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

// POST
if ($uri === '/api/movies' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new MovieController();
    $id = $controller->create($data['title'], $data['description'], $data['duration'], $data['release_year'], $data['genre'], $data['director'], $data['created_at'], $data['updated_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Film créé']);
}


// PUT 
if (preg_match('/^\/api\/movies\/(\d+)$/', $uri, $matches) && $method === 'PUT') {
    $id = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new MovieController();
    $id = $controller->update($id, $data['title'], $data['description'], $data['duration'], $data['release_year'], $data['genre'], $data['director'], $data['updated_at']);

    http_response_code(200);
    echo json_encode(['id' => $id, 'message' => 'Film modifié']);
}

// DELETE
if (preg_match('/^\/api\/movies\/(\d+)$/', $uri, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    $controller = new MovieController();
    $controller->delete($id);

    http_response_code(200);
    echo json_encode(['message' => 'Film supprimé']);
}










// SALLES

// GET
if ($uri === '/api/rooms' && $method === 'GET') {
    $controller = new RoomController();
    $rooms = $controller->getAll();
    $roomsArray = array_map(fn($s) => $s->toArray(), $rooms);
    echo json_encode($roomsArray);
}

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

// POST
if ($uri === '/api/rooms' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new RoomController();
    $id = $controller->create($data['name'], $data['capacity'], $data['type'], $data['active'], $data['created_at'], $data['updated_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Salle créée']);
}


// PUT
if (preg_match('/^\/api\/rooms\/(\d+)$/', $uri, $matches) && $method === 'PUT') {
    $id = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new RoomController();
    $id = $controller->update($id, $data['name'], $data['capacity'], $data['type'], $data['active'], $data['updated_at']);

    http_response_code(200);
    echo json_encode(['id' => $id, 'message' => 'Salle modifié']);
}

// DELETE
if (preg_match('/^\/api\/rooms\/(\d+)$/', $uri, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    $controller = new RoomController();
    $controller->delete($id);

    http_response_code(200);
    echo json_encode(['message' => 'Salle supprimée']);
}









// SEANCES

// GET
if ($uri === '/api/screenings' && $method === 'GET') {
    $controller = new ScreeningController();
    $screenings = $controller->getAll();
    $screeningsArray = array_map(fn($f) => $f->toArray(), $screenings);
    echo json_encode($screeningsArray);
}

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

// POST
if ($uri === '/api/screenings' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $controller = new ScreeningController();
    $id = $controller->create($data['movie_id'], $data['room_id'], $data['start_time'], $data['created_at']);

    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Séance créée']);
}

// DELETE 
if (preg_match('/^\/api\/screenings\/(\d+)$/', $uri, $matches) && $method === 'DELETE') {
    $id = $matches[1];
    $controller = new ScreeningController();
    $controller->delete($id);

    http_response_code(200);
    echo json_encode(['message' => 'Séance supprimée']);
}
