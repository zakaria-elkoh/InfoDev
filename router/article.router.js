const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');

router.get('/blog', articleController.getArticles);

module.exports = router;