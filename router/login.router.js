const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");

router.get("/login", authController.showLoginForm);

// Soumettre le formulaire de connexion
router.post("/login", authController.loginUser);

module.exports = router;
