# MyCinema

Application web de gestion de cinéma permettant au gérant d'administrer les films, salles et séances.

---

## Description

MyCinema propose une interface d'administration complète pour gérer un cinéma :
* **Films** - Ajout, modification et suppression de films avec leurs informations (titre, description, durée, année, genre, réalisateur)
* **Salles** - Gestion des salles de projection (nom, capacité, type)
* **Séances** - Planification des séances en associant un film, une salle et un horaire

---

## Fonctionnement

Le backend est organisé en trois couches :
* **Models** - Classes PHP représentant les entités (Film, Salle, Séance) avec leurs propriétés et méthodes
* **Controllers** - Logique métier gérant les opérations CRUD via PDO et requêtes préparées
* **index.php** - Routeur API qui traite les requêtes HTTP et retourne du JSON

Le frontend communique avec l'API via `fetch()` pour :
* Récupérer et afficher les données dynamiquement
* Soumettre les formulaires d'ajout/modification
* Supprimer des éléments après confirmation

---

## Liens 
GitHub : https://github.com/lblrs/my-cinema
