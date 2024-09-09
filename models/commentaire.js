"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commentaire.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Commentaire.belongsTo(models.Article, {
        foreignKey: "articleId",
        as: "article",
      });
    }
  }
  Commentaire.init(
    {
      text: DataTypes.STRING,
      blogId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Commentaire",
    }
  );
  return Commentaire;
};
