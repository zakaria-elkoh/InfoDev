const bcryptjs = require("bcryptjs");
const { User } = require("../../models");
const { body, validationResult } = require("express-validator");

// show register form
exports.showRegisterForm = (req, res) => {
  res.render("auth/register", {
    title: "register",
    currentPage: "register",
  });
};

// show login form
exports.showLoginForm = (req, res) => {
  res.render("auth/login", {
    title: "login",
    currentPage: "login",
  });
};

// register user form
exports.registerUser = [
  body("username").notEmpty().withMessage("Le nom d’utilisateur est requis"),
  body("email").isEmail().withMessage("L’adresse e-mail doit être valide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Vérifier si l'utilisateur
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Cet e-mail est déjà utilisé." });
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
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
];
