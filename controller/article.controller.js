const { body, validationResult } = require('express-validator');
const { Article, User } = require('../models');

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
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('The Content is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('layout/layout', {
                title: 'profile',
                currentPage: 'profile',
                currentView: '../profilePage',
                errors: errors.array(),
            })
        }
        const { title, content } = req.body;
        try {
            const response = await Article.create({
                title,
                content,
                userId: 1
            });
            res.redirect('/profile?created=success');
        } catch (error) {
            console.error('Error creating article:', error);
            res.status(500).send('Internal Server Error');
        }
    }
] 