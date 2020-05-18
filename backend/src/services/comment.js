const db = require('../db');

async function getComments(params) {
  const comments = await db.Comment.findAll({
    where: params,
  });

  return comments;
}

async function createComment(comment) {
  await db.Comment.create(comment, {
    include: db.User,
  });
}

module.exports = {
  getComments,
  createComment,
};
