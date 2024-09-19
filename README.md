# Commentaire CRUD - InfoDev

## Introduction
Ce document décrit l'implémentation de la fonctionnalité CRUD (Créer, Lire, Mettre à jour, Supprimer) pour la gestion des commentaires dans ce projet. Ce système permet aux utilisateurs d'ajouter, de modifier, de supprimer et de visualiser des commentaires via une interface conviviale utilisant Express.js, Sequelize et EJS.

## Table des Matières
- [Fonctionnalités](#fonctionnalités)
  - [Ajouter un Commentaire](#1-ajouter-un-commentaire)
  - [Modifier un Commentaire](#2-modifier-un-commentaire)
  - [Supprimer un Commentaire](#3-supprimer-un-commentaire)
  - [Visualiser un Commentaire](#4-visualiser-un-commentaire)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure des Fichiers](#structure-des-fichiers)
  - [Controllers](#controllers)
  - [Middleware](#middleware)
  - [Routes](#routes)
  - [Modèles](#modèles)
  - [Vues](#vues)

## Fonctionnalités

### 1. Ajouter un Commentaire
- **Formulaire d'ajout** : Permet aux utilisateurs d'ajouter un nouveau commentaire via un formulaire.
- **Validation des données** : Les données d'entrée sont validées à l'aide de `express-validator`.
- **Enregistrement dans la base de données** : Les nouveaux commentaires sont sauvegardés dans la base de données via un modèle Sequelize.

### 2. Modifier un Commentaire
- **Formulaire de modification** : Permet aux utilisateurs de modifier un commentaire existant.
- **Vérification de l'existence** : Vérifie si le commentaire à modifier existe avant de le mettre à jour.

### 3. Supprimer un Commentaire
- **Suppression de commentaire** : Les utilisateurs peuvent supprimer des commentaires indésirables.
- **Confirmation de suppression** : Une confirmation est demandée avant de supprimer un commentaire pour éviter les suppressions accidentelles.

### 4. Visualiser un Commentaire
- **Détails du commentaire** : Permet de visualiser les commentaires liés à un article spécifique via une vue dynamique EJS. Lors de la consultation d'un article, tous les commentaires associés à cet article sont affichés. Seuls les utilisateurs ayant créé ces commentaires peuvent les modifier ou les supprimer.
- **Affichage des commentaires** : Les commentaires sont listés en bas de la page de détails de l'article (`detailsPage.ejs`), avec des options pour modifier ou supprimer chaque commentaire s'il appartient à l'utilisateur connecté.


## Technologies Utilisées

- **Node.js** : Environnement d'exécution pour JavaScript côté serveur.
- **Express.js** : Framework pour créer des applications web rapides et modulaires.
- **Sequelize** : ORM pour interagir avec la base de données MySQL.
- **Express-validator** : Middleware pour valider les données des formulaires.
- **EJS** : Moteur de template pour générer des pages HTML dynamiques.
- **MySQL** : SGBD relationnel pour stocker les commentaires.
- **Express-session** : Pour gérer les sessions utilisateurs.

## Structure des Fichiers

### Controllers
Les contrôleurs gèrent la logique métier du projet.
- **comment.controller.js** : Gère les opérations CRUD (ajouter, lire, modifier, supprimer).


### Routes
Les routes définissent les points d'accès pour chaque opération CRUD.
- **comment.router.js** : Définit les routes pour ajouter, modifier, supprimer et visualiser les commentaires.

### Modèles
Les modèles représentent la structure des données dans la base de données.
- **Comment.js** : Modèle Sequelize représentant un commentaire, avec ses champs (texte, utilisateur, date, etc.).

### Vues (Frontend)
Les vues sont gérées avec EJS pour afficher les données dynamiquement.
- **views/detailsPage.ejs** : Affiche les détails d'un article spécifique ainsi que les commentaires associés. Les utilisateurs peuvent voir les commentaires en bas de l'article et, si l'utilisateur est l'auteur d'un commentaire, il a la possibilité de le modifier ou de le supprimer directement depuis cette page.


