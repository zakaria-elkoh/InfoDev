const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");
const { isNotAuthenticated } = require("../middleware/authMiddleware");

router.get("/register", isNotAuthenticated, authController.showRegisterForm);

// Soumettre le formulaire d'inscription
router.post("/register", authController.registerUser);

module.exports = router;