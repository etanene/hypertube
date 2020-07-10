const moment = require('moment-timezone');
const { userMovieModel } = require('../models');
const validateService = require('./validateService');
const userService = require('./userService');
const { ValidateException } = require('../errors');

const addUserMovie = async (userMovie) => {
  const user = await userService.getUser({ user_id: userMovie.user_id });
  if (!user[0]) throw new ValidateException('User with given ID does not exist');
  await validateService.validateMovieId(userMovie.movie_id);
  userMovie.created_at = moment().unix();
  const res = await userMovieModel.addUserMovie(userMovie);
  return res;
};

const getUserMovie = async (userId) => {
  const user = await userService.getUser({ user_id: userId });
  if (!user[0]) throw new ValidateException('User with given ID does not exist');
  const res = await userMovieModel.getUserMovie(userId);
  return res;
};

module.exports = {
  addUserMovie,
  getUserMovie,
};
