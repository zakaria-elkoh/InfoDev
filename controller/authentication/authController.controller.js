const bcryptjs = require("bcryptjs");
const { User } = require("../../models");
const { body, validationResult } = require("express-validator");
const session = require("express-session");

// Affiche le formulaire d'inscription
exports.showRegisterForm = (req, res) => {
  res.render("auth/register", {
    title: "register",
    currentPage: "register",
  });
};

// affichage login form
exports.showLoginForm = (req, res) => {
  res.render("auth/login", {
    title: "login",
    currentPage: "login",
  });
};

// Contrôleur pour la création d'un utilisateur
exports.registerUser = [
  body("username")
    .notEmpty()
    .withMessage("Le nom d’utilisateur est requis")
    .trim()
    .escape(),

  body("email")
    .isEmail()
    .withMessage("L’adresse e-mail doit être valide")
    .trim()
    .escape(),
  
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères")
    .trim()
    .escape(),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(
        errors
          .array()
          .map((err) => err.msg)
          .join("<br>")
      );
    }

    const { username, email, password } = req.body;

    try {
      // Vérifier si l'utilisateur
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send("Cet e-mail est déjà utilisé.");

      }

      // Hacher le mot de passe
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Créer un nouvel utilisateur
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        image: "default.png",
      });

      return res.redirect("/login");
    } catch (error) {
      console.error("Erreur lors de l’enregistrement de l’utilisateur:", error);
      return res.status(500).send("Erreur serveur");
    }
  },
];

// controleur pour login
exports.loginUser = [
  body("email")
    .isEmail()
    .withMessage("L’adresse e-mail doit être valide")
    .trim()
    .escape(),
  
  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .trim()
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(
        errors
          .array()
          .map((err) => err.msg)
          .join("<br>")
      );
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .send("Adresse e-mail ou mot de passe incorrect.");
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send("Adresse e-mail ou mot de passe incorrect.");
      }

      // Créer une session pour l'utilisateur
      session.userId = user.id;
      req.userId = session.userId;

      return res.redirect("/");
    } catch (error) {
      console.error("Erreur lors de la connexion de l’utilisateur:", error);
      res.status(500).send("Erreur serveur");
    }
  },
];

