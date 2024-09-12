const { Article, User, Commentaire } = require("../models");
const { body, validationResult } = require("express-validator");
exports.getDetailPage = async (req, res) => {
  try {
    const articleId = req.params.id;
    console.log(articleId);

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
      return res.status(404).render("layout/layout", {
        title: "Article non trouvé",
        currentPage: "detail",
        currentView: "../errorPage",
        errors: ["Article non trouvé"],
      });
    }

    res.render("layout/layout", {
      title: "Détails de l'article",
      currentPage: "detail",
      currentView: "../detailsPage",
      article: article,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("layout/layout", {
      title: "Erreur",
      currentPage: "detail",
      currentView: "../errorPage",
      errors: [
        "Une erreur est survenue lors de la récupération des détails de l'article",
      ],
    });
  }
};

exports.addComment = [
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
      await Commentaire.create({
        text: req.body.comment,
        articleId: 2,
        userId: 1,
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

      const comment = await Commentaire.findByPk(commentId);

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Commentaire non trouvé",
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

exports.deleteComment = [
  body("id")
    .notEmpty()
    .withMessage("L'ID du commentaire est requis.")
    .isInt()
    .withMessage("L'ID doit être un entier valide."),

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

      const comment = await Commentaire.findByPk(commentId);

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Commentaire non trouvé",
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
  },
];
