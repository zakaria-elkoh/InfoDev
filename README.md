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
