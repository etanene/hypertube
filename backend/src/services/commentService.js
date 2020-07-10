const { commentModel } = require('../models');
const validateService = require('./validateService');
const userService = require('./userService');
const { ValidateException } = require('../errors');

const addComment = async (comment) => {
  const user = await userService.getUser({ user_id: comment.user_id });
  if (!user[0]) throw new ValidateException('User with given ID does not exist');
  await validateService.validateComment(comment);
  const res = await commentModel.addComment(comment);
  return res;
};

const getComments = async (movieId) => {
  validateService.validateMovieId(movieId);
  const res = await commentModel.getCommentsByMovieId(movieId);
  return res;
};

const getCommentById = async (id) => {
  const res = await commentModel.getCommentById(id);
  return res;
};

module.exports = {
  addComment,
  getComments,
  getCommentById,
};
