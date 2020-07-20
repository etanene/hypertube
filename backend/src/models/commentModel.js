const { db } = require('../db');

const addComment = async (comment) => {
  await db.query(`
    INSERT INTO
      comments (text, parent_id, created_at, user_id, movie_id)
    VALUES
      ($1, $2, (to_timestamp($3)), $4, $5)
  `, [comment.text, comment.parent_id, comment.created_at, comment.user_id, comment.movie_id]);
};

const getCommentById = async (commentId) => {
  const res = await db.query(`
    SELECT * FROM comments
    WHERE id=$1
  `, [commentId]);
  return (res.rows);
};

const getCommentsByMovieId = async (movieId) => {
  const res = await db.query(`
    SELECT u.login, u.photo, c.id, c.text, c.created_at, c.parent_id FROM comments c
     LEFT JOIN users u 
     ON c.user_id = u.user_id
     WHERE movie_id=$1
  `, [movieId]);
  return (res.rows);
};

module.exports = {
  addComment,
  getCommentsByMovieId,
  getCommentById,
};
