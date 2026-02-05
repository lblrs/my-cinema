document.addEventListener("DOMContentLoaded", function () {

    // SECTIONS //
    
    // PLANNING
    let planningBtn = document.getElementById("planningBtn");
    let planningForm = document.getElementById("planningFormDiv");
    let planningCloseBtn = document.getElementById("planningCloseBtn");


    planningBtn.addEventListener("click", function () {
        planningForm.style.display = "flex";
    });


    planningCloseBtn.addEventListener("click", function () {
        planningForm.style.display = "none";
    })



    // FILMS
    let filmsBtn = document.getElementById("filmsBtn");
    let filmsForm = document.getElementById("filmsFormDiv");
    let filmsCloesBtn = document.getElementById("filmsCloseBtn");


    filmsBtn.addEventListener("click", function () {
        filmsForm.style.display = "flex";
    });


    filmsCloesBtn.addEventListener("click", function () {
        filmsForm.style.display = "none";
    })




    // SALLES
    let sallesBtn = document.getElementById("sallesBtn");
    let sallesForm = document.getElementById("sallesFormDiv");
    let sallesCloseBtn = document.getElementById("sallesCloseBtn");

    sallesBtn.addEventListener("click", function () {
        sallesForm.style.display = "flex";
    });


    sallesCloseBtn.addEventListener("click", function () {
        sallesForm.style.display = "none";
    })


    


    // API //

    // FILMS
    function getMovies() {

        // Demander les films
        fetch('http://localhost:8000/api/movies')
            // Puis convertis en json
            .then(response => response.json())
            // Puis utilise les donnees
            .then(data => {
                console.log(data);
                showMovies(data);
            });

    }

    function showMovies(movies) {

        movies.forEach(movie => {
            const div = document.createElement('div');

            div.innerHTML =
                `<div class="card">
                <h3 class="title">${movie.title}</h3>
                <hr>
                <p>${movie.description}</p>
                <hr>
                <p>Durée: ${movie.duration} min</p>
                <hr>
                <p>Année de sortie: ${movie.release_year}</p>
                <hr>
                <p>Genre: ${movie.genre}</p>
                <hr>
                <p>Réalisateur: ${movie.director}</p>
                <hr>
                <p>Crée le: ${movie.created_at}</p>
                <hr>
                <p>Modifié le: ${movie.updated_at}</p>
                <hr>
                <button>Modifier</button>
                <button>Supprimer</button>
                </div>`;

            document.getElementById("filmsDiv").appendChild(div);
        });

    }


    function addFilm() {
        const filmsAddBtn = document.getElementById("filmsAddBtn");

        filmsAddBtn.addEventListener("click", function (e) {
            e.preventDefault()

            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let duration = document.getElementById("duration").value;
            let release_year = document.getElementById("release_year").value;
            let genre = document.getElementById("genre").value;
            let director = document.getElementById("director").value;


            if (!title || !description || !duration || !release_year || !genre || !director) {
                alert("Veuillez remplir tous les champs");
                return;
            } else {
                const donnees = {
                    title: title,
                    description: description,
                    duration: parseInt(duration),
                    release_year: parseInt(release_year),
                    genre: genre,
                    director: director,
                };

                fetch('http://localhost:8000/api/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donnees)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getMovies();
                    })

            }


        })
    }





    // SALLES
    function getRooms() {
        fetch('http://localhost:8000/api/rooms')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showRooms(data);
            });
    }


    function showRooms(rooms) {
        rooms.forEach(room => {

            const div = document.createElement('div');

            div.innerHTML =
                `<div class="card">
                <h3>${room.name}</h3>
                <hr>
            <p>Capacité: ${room.capacity} Personnes</p>
                <hr>
            <p>Type: ${room.type}</p>
                <hr>
            <p>Active: ${room.active}</p>
                <hr>
            <button>Modifier</button>
            <button>Supprimer</button>
            </div>`;

            document.getElementById("sallesDiv").appendChild(div);
        })
    }


    function addRoom() {
        let roomAddBtn = document.getElementById("roomAddBtn");

        roomAddBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let roomName = document.getElementById("roomName").value;
            let roomCapacity = document.getElementById("roomCapacity").value;
            let roomType = document.getElementById("roomType").value;

            if (!roomName || !roomCapacity || !roomType) {
                alert("Veuillez remplire tous les champs");
                return;
            } else {
                const donnees = {
                    name: roomName,
                    capacity: roomCapacity,
                    type: roomType
                }

                fetch('http://localhost:8000/api/rooms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donnees)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getRooms();
                    })
            }
        })
    }








    // SEANCES
    function getSeances() {
        fetch('http://localhost:8000/api/screenings')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                afficherSeances(data);
            });
    }


    function afficherSeances(screenings) {
        screenings.forEach(screening => {
            const div = document.createElement("div");

            div.innerHTML =
                `<div class="card">
                <h3>${screening.start_time}</h3>
                <hr>
            <p>Film : ${screening.movie_id.title}</p>
                <hr>
            <p>Salle : ${screening.room_id.name}</p>
                <hr>
            <button>Modifier</button>
            <button>Supprimer</button>
            </div>`;

            document.getElementById("planningDiv").appendChild(div);
        })
    }



    getMovies();
    addFilm();

    getRooms();
    addRoom();

    getSeances();



})