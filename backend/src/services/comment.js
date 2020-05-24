const db = require('../models');

async function getComments(params) {
  const comments = await db.comments.findAll({
    attributes: ['id', 'text', 'createdAt'],
    where: params,
    include: { model: db.users, attributes: ['username', 'photo'] },
  });

  return comments;
}

async function createComment(comment) {
  await db.comments.create(comment);
}

module.exports = {
  getComments,
  createComment,
};
