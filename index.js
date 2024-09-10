const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const articleRoutes = require('./router/article.router');
const db = require('./models');
const session = require('express-session');
const flash = require('connect-flash');
const commentRoutes = require('./models/commentaire');

// Définir le répertoire des vues
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());

// Analyser les corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

app.use(articleRoutes);
app.use(commentRoutes);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})

// Définir le répertoire des vues
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");


// // Analyser les corps des requêtes
// app.use(bodyParser.urlencoded({ extended: true }));

// // Définir le répertoire public pour les fichiers statiques
// app.use(express.static(path.join(__dirname, "public")));

// app.use(articleRoutes);


// db.sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
//   });
// });
