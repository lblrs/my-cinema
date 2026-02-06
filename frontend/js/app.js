document.addEventListener("DOMContentLoaded", function () {

    // FILMS
    function getMovies() {
        fetch('http://localhost:8000/api/movies')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showMovies(data);
            });
    }

    function showMovies(movies) {
        const filmsDiv = document.getElementById("filmsDiv");
        filmsDiv.innerHTML = "";

        movies.forEach(movie => {
            const div = document.createElement('div');

            div.innerHTML =
                `<div class="card" 
                id="movie-${movie.id}"
                data-title="${movie.title}"
                data-description="${movie.description}"
                data-duration="${movie.duration}"
                data-release_year="${movie.release_year}"
                data-genre="${movie.genre}"
                data-director="${movie.director}">

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
                <button id="editMovie-${movie.id}">Modifier</button>
                <button id="deleteMovie-${movie.id}">Supprimer</button>
                </div>`;

            filmsDiv.appendChild(div);
            setupEditMovieButton(movie.id);
            setupDeleteMovieButton(movie.id);
        });
    }

    function setupEditMovieButton(movieId) {
        const editBtn = document.getElementById(`editMovie-${movieId}`);

        editBtn.addEventListener("click", function () {
            const div = document.getElementById(`movie-${movieId}`);

            document.getElementById("title").value = div.dataset.title;
            document.getElementById("description").value = div.dataset.description;
            document.getElementById("duration").value = div.dataset.duration;
            document.getElementById("release_year").value = div.dataset.release_year;
            document.getElementById("genre").value = div.dataset.genre;
            document.getElementById("director").value = div.dataset.director;

            document.getElementById("filmsFormDiv").style.display = "block";

            const submitBtn = document.getElementById("filmsAddBtn");
            submitBtn.textContent = "Enregistrer les modifications";
            submitBtn.dataset.editingId = movieId;
        });
    }

    function addMovie() {
        const filmsAddBtn = document.getElementById("filmsAddBtn");

        filmsAddBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let duration = document.getElementById("duration").value;
            let release_year = document.getElementById("release_year").value;
            let genre = document.getElementById("genre").value;
            let director = document.getElementById("director").value;

            if (!title || !description || !duration || !release_year || !genre || !director) {
                alert("Veuillez remplir tous les champs");
                return;
            }

            const editingId = filmsAddBtn.dataset.editingId;

            const donnees = {
                title: title,
                description: description,
                duration: parseInt(duration),
                release_year: parseInt(release_year),
                genre: genre,
                director: director,
            };

            if (editingId) {
                fetch(`http://localhost:8000/api/movies/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donnees)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getMovies();
                        document.getElementById("filmsFormDiv").style.display = "none";
                        filmsAddBtn.textContent = "Ajouter";
                        delete filmsAddBtn.dataset.editingId;

                        document.getElementById("title").value = "";
                        document.getElementById("description").value = "";
                        document.getElementById("duration").value = "";
                        document.getElementById("release_year").value = "";
                        document.getElementById("genre").value = "";
                        document.getElementById("director").value = "";
                    })
                    .catch(error => console.error('Erreur:', error));
            }
            else {

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
                        document.getElementById("title").value = "";
                        document.getElementById("description").value = "";
                        document.getElementById("duration").value = "";
                        document.getElementById("release_year").value = "";
                        document.getElementById("genre").value = "";
                        document.getElementById("director").value = "";
                    })
                    .catch(error => console.error('Erreur:', error));
            }
        });
    }

        function setupDeleteMovieButton(movieId) {
        const deleteMovieBtn = document.getElementById(`deleteMovie-${movieId}`);

        deleteMovieBtn.addEventListener("click", function () {
            if (confirm("Etes vous sur de supprimer ce film?")) {
                fetch(`http://localhost:8000/api/movies/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getMovies();
                    })
                    .catch(error => console.error('Erreur:', error));
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
        const sallesDiv = document.getElementById("sallesDiv");
        sallesDiv.innerHTML = "";

        rooms.forEach(room => {
            const div = document.createElement('div');

            div.innerHTML =
                `<div class="card" 
                id="room-${room.id}"
                data-name="${room.name}"
                data-capacity="${room.capacity}"
                data-type="${room.type}">

                <h3 class="name">${room.name}</h3>
                <hr>
                <p>Capacité: ${room.capacity}</p>
                <hr>
                <p>Type: ${room.type}</p>
                <hr>
                <button id="editRoom-${room.id}">Modifier</button>
                <button id="deleteRoom-${room.id}">Supprimer</button>
                </div>`;

            sallesDiv.appendChild(div);
            setupEditRoomButton(room.id);
            setupDeleteRoomButton(room.id);
        });
    }

    function setupEditRoomButton(roomId) {
        const editBtn = document.getElementById(`editRoom-${roomId}`);

        editBtn.addEventListener("click", function () {
            const div = document.getElementById(`room-${roomId}`);

            document.getElementById("roomName").value = div.dataset.name;
            document.getElementById("roomCapacity").value = div.dataset.capacity;
            document.getElementById("roomType").value = div.dataset.type;

            document.getElementById("sallesFormDiv").style.display = "block";

            const submitBtn = document.getElementById("roomAddBtn");
            submitBtn.textContent = "Enregistrer les modifications";
            submitBtn.dataset.editingId = roomId;
        });
    }

    function addRoom() {
        const roomAddBtn = document.getElementById("roomAddBtn");

        roomAddBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let name = document.getElementById("roomName").value;
            let capacity = document.getElementById("roomCapacity").value;
            let type = document.getElementById("roomType").value;

            if (!name || !capacity || !type) {
                alert("Veuillez remplir tous les champs");
                return;
            }

            const editingId = roomAddBtn.dataset.editingId;

            const donnees = {
                name: name,
                capacity: parseInt(capacity),
                type: type,
            };

            if (editingId) {
                fetch(`http://localhost:8000/api/rooms/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donnees)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getRooms();
                        document.getElementById("sallesFormDiv").style.display = "none";
                        roomAddBtn.textContent = "Ajouter";
                        delete roomAddBtn.dataset.editingId;

                        document.getElementById("roomName").value = "";
                        document.getElementById("roomCapacity").value = "";
                        document.getElementById("roomType").value = "";
                    })
                    .catch(error => console.error('Erreur:', error));
            }
            else {

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

                        document.getElementById("roomName").value = "";
                        document.getElementById("roomCapacity").value = "";
                        document.getElementById("roomType").value = "";
                    })
                    .catch(error => console.error('Erreur:', error));
            }
        });
    };


    function setupDeleteRoomButton(roomId) {
        const deleteRoomBtn = document.getElementById(`deleteRoom-${roomId}`);

        deleteRoomBtn.addEventListener("click", function () {
            if (confirm("Etes vous sur de supprimer cette salle?")) {
                fetch(`http://localhost:8000/api/rooms/${roomId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        getRooms();
                    })
                    .catch(error => console.error('Erreur:', error));
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
    addMovie();

    getRooms();
    addRoom();

    getSeances();



})