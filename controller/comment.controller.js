const { Article, User, Commentaire } = require("../models");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
exports.getDetailPage = async (req, res) => {

  try {
    const articleId = req.params.id;
    const userLogin = req.session.userId;

    const article = await Article.findByPk(articleId, {
      include: [
        {
          model: Commentaire,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
      ],
    });

    if (!article) {
      return res.status(404).render("404", {
        title: "Article non trouvé",
        errors: ["Article non trouvé"],
      });
    }

    const data = {
      userLogin,
      article,
    };

    res.render("layout/layout", {
      title: "Détails de l'article",
      currentPage: "detail",
      currentView: "../detailsPage",
      data: data,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("404", {
      title: "Erreur",
      errors: [
        "Une erreur est survenue lors de la récupération des détails de l'article",
      ],
    });
  }
};

exports.addComment = [
  body("id")
    .notEmpty()
    .withMessage("L'ID du articles est requis.")
    .isInt()
    .withMessage("L'ID doit être un entier valide."),
  body("comment")
    .notEmpty()
    .withMessage("Le commentaire ne peut pas être vide.")
    .isLength({ min: 5 })
    .withMessage("Le commentaire doit contenir au moins 5 caractères."),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const article = await Article.findByPk(req.body.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "article non trouvé",
      });
    }

    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Vous devez être connecté pour ajouter un commentaire.",
      });
    }

    try {
      await Commentaire.create({
        text: req.body.comment,
        articleId: req.body.id,
        userId,
      });

      res.json({ success: true, message: "Commentaire ajouté avec succès !" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'ajout du commentaire",
      });
    }
  },
];

exports.updateComment = [
  body("id")
    .notEmpty()
    .withMessage("L'ID du commentaire est requis.")
    .isInt()
    .withMessage("L'ID doit être un entier valide."),
  body("comment")
    .notEmpty()
    .withMessage("Le commentaire ne peut pas être vide.")
    .isLength({ min: 5 })
    .withMessage("Le commentaire doit contenir au moins 5 caractères."),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      const commentId = req.body.id;
      const newText = req.body.comment;
      const userId = req.session.userId;

      const comment = await Commentaire.findByPk(commentId);

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Commentaire non trouvé",
        });
      }

      if (comment.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "Vous n'êtes pas autorisé à modifier ce commentaire",
        });
      }

      comment.text = newText;
      await comment.save();

      res.json({
        success: true,
        message: "Commentaire mis à jour avec succès !",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du commentaire",
      });
    }
  },
];

exports.deleteComment = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      const commentId = req.body.id;
      const userId = req.session.userId;
      const comment = await Commentaire.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Commentaire non trouvé",
        });
      }

      if (comment.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "Vous n'êtes pas autorisé à modifier ce commentaire",
        });
      }

      await comment.destroy();

      res.json({
        success: true,
        message: "Commentaire supprimé avec succès !",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression du commentaire",
      });
    }
  }
