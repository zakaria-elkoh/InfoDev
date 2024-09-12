const express = require("express");
const router = express.Router();
const profileController = require("../controller/profile.controller.js");

router.get("/profile", profileController.getProfile);
router.post("/create-article", profileController.updateProfile);

module.exports = router;
