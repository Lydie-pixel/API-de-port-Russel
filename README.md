# API Port de Russel

Application web de gestion d’un port de plaisance permettant de gérer les catways, les réservations et les utilisateurs.
Ce projet a été réalisé dans le cadre d’un devoir de développement web back-end.

## Fonctionnalités :

- Authentification sécurisée (JWT + Cookies)
- Gestion des utilisateurs (Admin / Utilisateur)
- Gestion des catways (CRUD + tri automatique)
- Gestion des réservations (CRUD + chevauchement + tri par date)
- Tableau de bord dynamique via API
- Profil utilisateur (changement de mot de passe)
- API REST sécurisée
- Routes protégées
- Validation des données
- Mots de passe hashés

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT (jsonwebtoken)
- Bcrypt
- Swagger
- JSDoc

## Installation

### Prérequis

Avant d’installer le projet, vous devez avoir :

- Node.js (v18+ recommandé)
- MongoDB (local ou Atlas)
- npm

### Installation

1. Cloner le projet :

    git clone <url-du-repo>
    cd API-de-port-Russel

2. Installer les dépendances :
    npm install

3. Créer un fichier .env :

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=3000

4. Lancer l’application :

    npm start
    
### Lancement

L’application sera accessible à l’adresse :
    http://localhost:3000 

## Comptes et accès

Administrateur:

- Créé directement en base de données
- Accès complet à la gestion des utilisateurs

Utilisateur:

- Inscription via l’interface
- Accès limité à son profil

## Routes principales

Méthode	Route	Description
GET	/	Page d’accueil
GET	/login	Connexion
GET	/dashboard	Tableau de bord
GET	/catways	Gestion catways
GET	/reservations	Gestion réservations
GET	/users	Gestion utilisateurs (admin)
GET	/profile	Profil utilisateur

## API

L’application expose une API REST sécurisée.

- Catways
Méthode	Route	Description
GET	/catways/api	Liste des catways
GET	/catways/api/:id	Détail
POST	/catways/api	Création
PUT	/catways/api/:id	Modification
DELETE	/catways/api/:id	Suppression

- Réservations
Méthode	Route	Description
GET	/reservations/api	Liste
POST	/reservations/api	Création
PUT	/reservations/api/:id	Modification
DELETE	/reservations/api/:id	Suppression

- Utilisateurs
Méthode	Route	Description
GET	/users/api	Liste
POST	/users/api	Création
PUT	/users/api/:id	Modification
DELETE	/users/api/:id	Suppression

## Documentation API (Swagger)

La documentation Swagger est accessible à :
    http://localhost:3000/api-docs
Elle décrit l’ensemble des endpoints disponibles.

## Documentation du code (JSDoc)

La documentation du code est générée via JSDoc.
Commande :

    npx jsdoc -c jsdoc.json

Les fichiers générés se trouvent dans le dossier /docs.

## Sécurité

- Authentification JWT
- Cookies HTTPOnly
- Middleware d’authentification
- Middleware admin
- Hash des mots de passe (bcrypt)
- Protection des routes
- Validation des entrées

## Auteure

Projet réalisé par Lydie
Dans le cadre d’une formation en développement web.