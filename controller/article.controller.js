const { body, validationResult } = require('express-validator');
const { Article, User } = require('../models');
const multer = require('multer');
const path = require('path');
const { upload } = require('../middleware/article.middlware');
const { json } = require('body-parser');
const { Json } = require('sequelize/lib/utils');

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        res.render('layout/layout', {
            articles,
            title: 'home',
            currentPage: 'home',
            currentView: '../homePage'
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getProfilePage = (req, res) => {
    res.render('layout/layout', {
        title: 'profile',
        currentPage: 'profile',
        currentView: '../profilePage',
        errors: []
    });
}

exports.createArticle = [
    upload,
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('The Content is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('layout/layout', {
                title: 'profile',
                currentPage: 'profile',
                currentView: '../profilePage',
                errors: errors.array()[0].msg,
            })
        }
        const { title, content } = req.body;

        let img = null;
        if(req.file){
            img = `/uploads/articles/${req.file.filename}`;
        }
        try {
            const response = await Article.create({
                title,
                content,
                image: img,
                userId: 1
            });
            res.redirect('/profile?created=success');
        } catch (error) {
            console.error('Error creating article:', error);
            res.status(500).send('Internal Server Error');
        }
    }
] 