const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get('/', articleController.getArticles);
router.get("/profile", isAuthenticated, articleController.getProfilePage);
router.post("/create-article", isAuthenticated, articleController.createArticle);

module.exports = router;