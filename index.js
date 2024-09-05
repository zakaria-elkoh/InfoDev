const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Définir le répertoire des vues
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Analyser les corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Utiliser le routeur pour les utilisateurs

app.get('/blog', (req, res) => {
  res.render('blog');
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000 with path:`);
});