document.addEventListener("DOMContentLoaded", function () {

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
        // ✅ AJOUTE CES LIGNES :
        const filmsDiv = document.getElementById("filmsDiv");
        filmsDiv.innerHTML = "";  // Vide le contenu

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

            // Ajoute l'événement modifier
            setupEditButton(movie.id);
        });
    }

    function setupEditButton(movieId) {
        const editBtn = document.getElementById(`editMovie-${movieId}`);

        editBtn.addEventListener("click", function () {
            const div = document.getElementById(`movie-${movieId}`);

            // Remplir les inputs
            document.getElementById("title").value = div.dataset.title;
            document.getElementById("description").value = div.dataset.description;
            document.getElementById("duration").value = div.dataset.duration;
            document.getElementById("release_year").value = div.dataset.release_year;
            document.getElementById("genre").value = div.dataset.genre;
            document.getElementById("director").value = div.dataset.director;

            // Afficher le formulaire (à adapter selon ton HTML)
            document.getElementById("filmsFormDiv").style.display = "block";

            // Changer l'action du bouton submit
            const submitBtn = document.getElementById("filmsAddBtn");
            submitBtn.textContent = "Enregistrer les modifications";
            submitBtn.dataset.editingId = movieId;
        });
    }

    function addFilm() {
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

            // Si on modifie (editingId existe), envoyer un PUT
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
                        // Réinitialiser le formulaire
                        document.getElementById("title").value = "";
                        document.getElementById("description").value = "";
                        document.getElementById("duration").value = "";
                        document.getElementById("release_year").value = "";
                        document.getElementById("genre").value = "";
                        document.getElementById("director").value = "";
                    })
                    .catch(error => console.error('Erreur:', error));
            }
            // Sinon, c'est une création, envoyer un POST
            else {
                donnees.created_at = formatDateToMySQL(new Date());

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
                        getFilms();
                    })
                    .catch(error => console.error('Erreur:', error));
            }
        });
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