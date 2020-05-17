const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
);

const db = {};
db.sequelize = sequelize;

db.User = sequelize.import('../models/User');
db.Comment = sequelize.import('../models/Comment');

db.User.hasMany(db.Comment, { foreignKey: 'userId' });

module.exports = db;
