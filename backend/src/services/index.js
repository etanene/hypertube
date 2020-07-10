const authService = require('./authService');
const validateService = require('./validateService');
const userService = require('./userService');
const mailService = require('./mailService');
const commentService = require('./commentService');
const userMovieService = require('./userMovieService');


module.exports = {
  userMovieService,
  authService,
  validateService,
  userService,
  mailService,
  commentService,
};
