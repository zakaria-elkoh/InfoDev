const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/login", authController.showLoginForm);

// show login page
router.post("/login", authController.loginUser);

// protected route
// router.get("/dashboard", isAuthenticated, (req, res) => {
//   res.render("dashboard");
// });
 
module.exports = router;
