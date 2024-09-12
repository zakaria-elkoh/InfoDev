const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");

router.get("/register", authController.showRegisterForm);

// Soumettre le formulaire d'inscription
router.post("/register", authController.registerUser);

module.exports = router;