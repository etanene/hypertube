module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert('users', [{
      email: 'root@root.ru',
      username: 'root',
      firstName: 'Root',
      lastName: 'Rootovich',
      password: 'root',
      photo: 'root',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('users', {
      username: 'root',
    }, {})
  ),
};
