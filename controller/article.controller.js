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

exports.getDetailsPage = (req, res) => {
    res.render('layout/layout', {
        title: 'profile',
        currentPage: 'profile',
        currentView: '../profilePage'
    });
}

exports.createArticle = async (req, res) => {
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
        res.redirect('/profile?created=fail');
    }
}