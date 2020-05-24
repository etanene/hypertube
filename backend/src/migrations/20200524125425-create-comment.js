module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      movieId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('comments')
  ),
};
