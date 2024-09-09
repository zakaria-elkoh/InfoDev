const { body, validationResult } = require('express-validator');
const { Article, User } = require('../models');
const { upload } = require('../middleware/article.middlware');

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
    let error = req.flash('error_response');
    res.render('layout/layout', {
        title: 'profile',
        currentPage: 'profile',
        currentView: '../profilePage',
        errors: error.length > 0 ? error[0] : null,
    });
}

exports.createArticle = [
    upload,
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('The Content is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error_response', errors.array()[0].msg);
            return res.redirect('/profile');
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