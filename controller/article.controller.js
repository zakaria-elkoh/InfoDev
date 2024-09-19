const { body, validationResult } = require('express-validator');
const { Article, User } = require('../models');
const { upload } = require('../middleware/article.middlware');
const moment = require('moment');

exports.getArticles = async (req, res) => {
    const error = req.flash('error_response');
    try {
        const articles = await Article.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        const formattedArticles = articles.map(article => {
            return {
               ...article.dataValues,
               day: moment(article.createdAt).format('DD'),    // Day of creation
               month: moment(article.createdAt).format('MMM')  // Short month format
            };
         });
        res.render('layout/layout', {
            articles: formattedArticles,
            title: 'home',
            currentPage: 'home',
            currentView: '../homePage',
            errors: error.length > 0 ? error[0] : null 
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getCreateArticlePage = (req, res) => {
    let error = req.flash('error_response');
    res.render('layout/layout', {
        title: 'create articlePage',
        currentPage: 'createArticlePage',
        currentView: '../createArticlePage',
        errors: error.length > 0 ? error[0] : null,
    });
}

exports.createArticle = [
    upload,
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('The DEscription is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error_response', errors.array()[0].msg);
            return res.redirect('/create/article');
        }
        const { title, content } = req.body;

        let img = null;
        if(req.file){
            img = `/uploads/articles/${req.file.filename}`;
        }
        try {
            await Article.create({
                title,
                content,
                image: img,
                userId: req.session.userId
            });
            res.redirect('/create/article?created=success');
        } catch (error) {
            console.error('Error creating article:', error);
            res.status(500).send('Internal Server Error');
        }
    }
] 

exports.updateArticle = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Description is required'),
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('error_response', errors.array()[0].msg);
            return res.redirect('/');
        }
        if(req.body['img-checkbox'] === 'true'){
            upload;
        }

        let img = null;
        if(req.file){
            img = `/uploads/articles/${req.file.filename}`;
        }
        
        

        const {title, content, id} = req.body; 
        const article = await Article.findByPk(Number(id));

        if(img === null){
            article.title = title;
            article.content = content;
            article.save();
        }else{
            article.title = title;
            article.content = content;
            article.image = img;
            article.save();
        }
        return res.redirect('/?created=success');
    }
]

exports.deleteArticle = async (req, res) => {
    const articleId = req.body.articleId;
    const article = await Article.findByPk(articleId);
        
    try{
        if (article.userId !== req.session.userId){
            req.flash('error_response', "");
            return res.status(403).json({
                success: false,
                message: "You don't have the permission to delete this article"
            })
        }
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found"
            })
        }
    
        await article.destroy();
        return res.json({
            success: true,
            message: 'Article Deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression du commentaire",
        });
    }    
}