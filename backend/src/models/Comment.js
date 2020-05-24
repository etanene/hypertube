module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Comment.associate = (models) => {
    Comment.belongsTo(models.users, { foreignKey: 'userId' });
  };

  return Comment;
};
