const { InternalError } = require('../errors');
const { commentService } = require('../services');

const addComment = async (req, res) => {
  try {
    console.log('controller');
    const response = await commentService.addComment(req.body);
    res.send(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.body.movie_id);
    res.send(comments);
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

module.exports = {
  addComment,
  getComments,
};
