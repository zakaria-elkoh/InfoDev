# Authentification - Projet de Blog InfoDev

## Introduction
Ce document décrit l'implémentation de la fonctionnalité d'authentification pour le projet de blog "InfoDev". Ce système permet aux utilisateurs de s'inscrire, de se connecter et de se déconnecter de manière sécurisée, tout en garantissant la protection de leurs données personnelles.

## Table des Matières
- [Fonctionnalités](#fonctionnalités)
  - [Inscription](#1-inscription)
  - [Connexion](#2-connexion)
  - [Déconnexion](#3-déconnexion)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure des Fichiers](#structure-des-fichiers)
  - [Controllers](#controllers)
  - [Middleware](#middleware)
  - [Routes](#routes)
  - [Model](#Modèles)
  - [View](#Vues)
- [Instructions pour Lancer le Projet](#instructions-pour-lancer-le-projet)

## Fonctionnalités

### 1. Inscription
- **Formulaire d'inscription** : Permet aux nouveaux utilisateurs de créer un compte.
- **Validation des données** : Les champs obligatoires incluent le nom d'utilisateur, l'adresse e-mail et le mot de passe. Les validations sont effectuées à l'aide de `express-validator`.
- **Hachage du mot de passe** : Les mots de passe sont hachés avec `bcryptjs` avant d'être stockés dans la base de données pour garantir la sécurité des informations sensibles.

### 2. Connexion
- **Formulaire de connexion** : Permet aux utilisateurs de s'authentifier avec leur e-mail et leur mot de passe.
- **Vérification des informations d'identification** : Les erreurs d'authentification sont gérées, et des messages d'erreur sont affichés à l'utilisateur.
- **Gestion des sessions** : Une session est créée pour l'utilisateur connecté à l'aide de `express-session`.
- **Maintien de la session** : Les utilisateurs restent connectés grâce à un système de sessions persistantes, avec la possibilité de se déconnecter.

### 3. Déconnexion
- **Fonctionnalité de déconnexion** : Permet aux utilisateurs de se déconnecter, ce qui détruit leur session.
- **Redirection après déconnexion** : L'utilisateur est redirigé vers la page de connexion.

## Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript.
- **Express.js** : Framework web pour Node.js.
- **Sequelize** : ORM pour la gestion de la base de données.
- **MySQL** : Système de gestion de base de données relationnelle.
- **Bcryptjs** : Bibliothèque pour le hachage de mots de passe.
- **Express-validator** : Middleware pour la validation des entrées.
- **Express-session** : Middleware pour gérer les sessions des utilisateurs.
- **Flash** : Pour les messages temporaires.

## Structure des Fichiers

### Controllers
Le contrôleur `authController.controller.js` gère l'inscription, la connexion et la déconnexion des utilisateurs.
### Middleware
Les middlewares gèrent l'authentification et la validation des données.
- **isAuthenticated** : Vérifie si l'utilisateur est connecté avant d'accéder à certaines routes.
- **isNotAuthenticated** : Vérifie si l'utilisateur n'est pas connecté pour l'accès aux pages de connexion et d'inscription.
### Routes
Les routes d'authentification sont définies dans: 
- login.route.js 
- register.route.js
## Modèles
Les modèles de données sont définis dans models pour interagir avec la base de données.
- **User.js** : Représente le modèle d'utilisateur. Contient les définitions des champs (username, email, password) et les validations associées.
## Vues (Frontend)
Les vues sont généralement gérées avec un moteur de templates EJS.
- views/login.ejs : Contient le formulaire de connexion.
- views/register.ejs : Contient le formulaire d'inscription.
  
# Instructions pour Lancer le Projet
## 1.Cloner le dépôt:
git clone [https://github.com/votre-utilisateur/votre-repo.git](https://github.com/zakaria-elkoh/InfoDev.git)
## 2.Installer les dépendances:
npm install
## 3.Configurer la base de données:
Créez une base de données MySQL.
Mettez à jour les informations de connexion dans le fichier de configuration.
## 4.Lancer le serveur:
npm start
