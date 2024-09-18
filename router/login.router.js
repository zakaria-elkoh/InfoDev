const express = require("express");
const router = express.Router();
const authController = require("../controller/authentication/authController.controller");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/login", authController.showLoginForm);

// show login page
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
