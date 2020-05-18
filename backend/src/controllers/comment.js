const { CustomError } = require('../errors');

const commentService = require('../services/comment');

async function getComments(req, res) {
  try {
    const params = req.query;
    const comments = await commentService.getComments(params);
    res.send(comments);
  } catch (error) {
    console.log('Error: ', error);
    if (error instanceof Error) {
      res.status(error.status || 500).send(new CustomError(error.message));
    } else {
      res.status(error.status || 500).send(error);
    }
  }
}

async function createComment(req, res) {
  try {
    const comment = req.body;
    await commentService.createComment(comment);
    res.end();
  } catch (error) {
    console.log('Error: ', error);
    if (error instanceof Error) {
      res.status(error.status || 500).send(new CustomError(error.message));
    } else {
      res.status(error.status || 500).send(error);
    }
  }
}

module.exports = {
  getComments,
  createComment,
};
