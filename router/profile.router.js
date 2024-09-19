const express = require("express");
const router = express.Router();
const profileController = require("../controller/profile.controller.js");
// const authMiddleware = require("../middleware/auth"); // Assuming you have authentication middleware

router.get("/profile", profileController.getProfile);
router.get("/profile/edit", profileController.editProfile);
router.post("/profile/update", profileController.updateProfile);

module.exports = router;
