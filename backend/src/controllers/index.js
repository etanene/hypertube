const authController = require('./authController');
const userController = require('./userController');
const commentController = require('./commentController');
const userMovieController = require('./userMovieController');
const torrentController = require('./torrentController');

module.exports = {
  torrentController,
  userMovieController,
  authController,
  userController,
  commentController,
};
