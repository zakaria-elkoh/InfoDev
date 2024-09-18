const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');
const { isAuthenticated } = require("../middleware/authMiddleware");
const { upload } = require('../middleware/article.middlware');

router.get('/', articleController.getArticles);
router.get("/profile", isAuthenticated, articleController.getProfilePage);
router.post("/create-article", isAuthenticated, articleController.createArticle);
router.post("/update/article", isAuthenticated, upload, articleController.updateArticle);
router.delete("/delete/article", isAuthenticated, articleController.deleteArticle);

module.exports = router;