const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const articleRoutes = require("./router/article.router");
const registerPath = require("./router/register.router");
const loginPath = require("./router/login.router");
const db = require("./models");

// Définir le répertoire des vues
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Analyser les corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Utiliser le routeur pour les utilisateurs

// app.get('/blog', (req, res) => {
//   res.render('blog');
// })

// app.post("/users", async (req, res) => {
//   try {
//     const user = await User.create({
//       username: "newuser",
//       email: "newuser@example.com",
//       password: "securepassword",
//     });

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

app.use(articleRoutes);
app.use(registerPath);
app.use(loginPath);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
