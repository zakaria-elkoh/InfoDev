'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Commentaires', 'articleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Commentaires', 'articleId');
  }
};
