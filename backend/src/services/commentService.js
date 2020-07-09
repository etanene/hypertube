const { commentModel } = require('../models');
const validateService = require('./validateService');

const addComment = async (comment) => {
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
