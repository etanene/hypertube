const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Sequelize.Model {}
  Comment.init({
    commentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'comments',
  });

  return Comment;
};
