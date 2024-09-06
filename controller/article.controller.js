const { Article, User } = require('../models');

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        res.render('blog', { articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
};