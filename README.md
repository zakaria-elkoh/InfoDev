# Infodev

## Description
Infodev est une application web qui permet aux utilisateurs de s'inscrire, de se connecter, de publier des articles, de commenter des articles, et de gérer leur profil. L'application est développée avec Node.js et Express.js pour le backend, et utilise EJS comme moteur de template pour l'interface utilisateur.

## Fonctionnalités

### 1. Authentification
- Inscription : Enregistrement d'un nouvel utilisateur.
- Connexion : Authentification des utilisateurs enregistrés.
- Déconnexion : Déconnexion des utilisateurs.

### 2. Gestion des articles
- Création d'un article : Les utilisateurs peuvent créer un nouvel article avec un titre, du contenu et la date de création.
- Liste des articles : Affichage de tous les articles publiés.
- Détail d'un article : Affichage détaillé d'un article spécifique.
- Modification d'un article : Les auteurs peuvent modifier leurs propres articles.
- Suppression d'un article : Les auteurs peuvent supprimer leurs propres articles.

### 3. Commentaires
- Ajout de commentaires : Les utilisateurs peuvent ajouter des commentaires sous un article.
- Affichage des commentaires : Affichage de tous les commentaires sous un article.
- Suppression de commentaire : Les utilisateurs peuvent supprimer leurs propres commentaires.

### 4. Profil utilisateur
- Affichage et modification du profil : Les utilisateurs peuvent consulter et modifier leurs informations (nom, email, photo, etc.).
- Liste des articles créés : Affichage de la liste des articles créés par l'utilisateur.

### 5. Interface utilisateur
- Utilisation de EJS comme moteur de templates pour afficher les informations côté serveur.
- Design responsive pour une utilisation fluide sur mobile et ordinateur.

## Spécifications techniques

### Backend
- **Framework** : Node.js avec Express.js.
- **Base de données** : MySQL avec l'ORM Sequelize pour la gestion des données.
- **Routes** : Implémentation des routes REST (GET, POST, PUT, DELETE) pour chaque fonctionnalité.

### Frontend
- **Moteur de templates** : EJS pour générer dynamiquement les pages HTML.
- **Design** : Utilisation de CSS pour un design épuré et intuitif. Possibilité d'intégrer un framework CSS comme Bootstrap ou TailwindCSS pour faciliter le design.

### Sécurité
- Protection contre les injections SQL avec Sequelize.
- Hachage des mots de passe avec `bcrypt` avant leur stockage en base de données.
- Validation et sanitation des entrées utilisateurs avec `express-validator` pour éviter les attaques XSS.

## Installation

### Prérequis
- Node.js
- MySQL

### Étapes d'installation
1. Cloner le projet :
   ```bash
   git clone https://github.com/zakaria-elkoh/infodev.git

## Packages

Voici une description des principaux packages utilisés dans ce projet :

- **bcryptjs** : 
  - Utilisé pour hasher les mots de passe pour l'authentification des utilisateurs.
  - Assure que les mots de passe sont stockés de manière sécurisée et non en texte clair.

- **body-parser** : 
  - Middleware pour analyser les corps des requêtes entrantes, en particulier les soumissions de formulaires et le JSON.
  - Facilite l'accès aux données soumises via des formulaires ou des requêtes AJAX.

- **connect-flash** : 
  - Middleware pour transmettre des messages temporaires entre les requêtes (ex : messages de succès ou d'erreur).
  - Permet d'afficher des messages flash après une redirection ou une soumission de formulaire.

- **cookie-parser** : 
  - Middleware pour analyser les cookies attachés aux requêtes des clients.
  - Nécessaire pour la gestion des sessions et l'authentification des utilisateurs.

- **dotenv** : 
  - Charge les variables d'environnement à partir d'un fichier `.env` dans `process.env`.
  - Permet de garder les informations sensibles (comme les identifiants de base de données) hors du code.

- **ejs** : 
  - Moteur de templates utilisé pour générer du HTML avec des données dynamiques.
  - Permet l'utilisation de la logique JavaScript dans vos fichiers HTML pour rendre du contenu dynamique.

- **express** : 
  - Framework web utilisé pour créer le backend de l'application.
  - Fournit des outils pour le routage, le middleware, et d'autres utilités pour créer le serveur.

- **express-flash** : 
  - Utilisé pour afficher des messages flash dans Express.
  - Fonctionne en conjonction avec `connect-flash` pour afficher des notifications aux utilisateurs.

- **express-session** : 
  - Middleware pour gérer les sessions utilisateur.
  - Stocke les données de session sur le serveur et gère les états de connexion/déconnexion des utilisateurs.

- **express-validator** : 
  - Middleware pour valider et assainir les données des requêtes entrantes.
  - Assure que les données soumises par les utilisateurs (ex : via des formulaires) sont valides et sécurisées.

- **flash** : 
  - Outil simple pour définir et récupérer des messages flash.
  - Souvent utilisé avec Express pour transmettre des messages entre les redirections.

- **multer** : 
  - Middleware pour gérer les uploads de fichiers, en particulier les formulaires multipart.
  - Utilisé pour télécharger des images pour les articles et les stocker sur le serveur.

- **mysql2** : 
  - Driver de base de données MySQL pour Node.js.
  - Utilisé pour se connecter et interagir avec la base de données MySQL.

- **nodemon** : 
  - Utilitaire qui redémarre automatiquement le serveur Node.js lorsque des modifications de fichiers sont détectées.
  - Utilisé pendant le développement pour accélérer le processus de test et d'exécution de l'application.

- **sequelize** : 
  - ORM (Object-Relational Mapping) basé sur des promesses pour interagir avec la base de données MySQL.
  - Fournit une couche d'abstraction pour les requêtes de base de données et la gestion du schéma.

- **sequelize-cli** : 
  - Interface en ligne de commande pour Sequelize.
  - Utilisé pour exécuter des migrations, générer des modèles, et gérer le schéma de la base de données.


### Base de données

Le projet utilise l'ORM **Sequelize** pour les interactions avec la base de données. Vous pouvez personnaliser les modèles dans le répertoire `models` et ajuster la configuration de la base de données dans `config/config.json` pour l'adapter à votre configuration locale.

### Style

Le projet utilise **HTML** et **CSS** standard, ainsi que **Tailwind CSS** pour un style rapide et flexible. Vous pouvez modifier les styles en éditant les classes existantes dans les vues EJS.

### Middleware

- **Multer** est utilisé pour les uploads d'images. Vous pouvez ajuster les limites de taille de fichier et les types de fichiers autorisés dans la configuration du middleware.
- **express-validator** est utilisé pour valider les données entrantes. Vous pouvez modifier les règles de validation dans les méthodes des contrôleurs.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request avec des améliorations ou de nouvelles fonctionnalités.

### Étapes pour Contribuer

1. Forker le dépôt.
2. Créer une nouvelle branche :
    ```bash
    git checkout -b feature/nom-de-votre-fonctionnalité
    ```
3. Valider vos modifications :
    ```bash
    git commit -m 'Ajout d'une fonctionnalité'
    ```
4. Pousser vers la branche :
    ```bash
    git push origin feature/nom-de-votre-fonctionnalité
    ```
5. Ouvrir une pull request.
