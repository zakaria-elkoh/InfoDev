const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');

router.get('/', articleController.getArticles);
router.get('/profile', articleController.getProfilePage);
router.post('/create-article', articleController.createArticle);

module.exports = router;