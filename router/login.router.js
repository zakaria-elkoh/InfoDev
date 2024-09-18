const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");
const { isAuthenticated, isNotAuthenticated } = require("../middleware/authMiddleware");

// show login page
router.get("/login", isNotAuthenticated, authController.showLoginForm);

router.post("/login", authController.loginUser);

router.get("/logout", authController.logoutUser);

// protected route
// Pass userId to the view
router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", {
    title: "Profile Page",
    userId: req.session.userId,
  });
});

module.exports = router;
