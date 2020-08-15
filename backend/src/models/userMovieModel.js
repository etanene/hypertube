const { db } = require('../db');

const addUserMovie = async (userMovie) => {
  await db.query(`
    INSERT INTO
      user_movie (movie_id, user_id, created_at)
    VALUES
      ($1, $2, (to_timestamp($3)))
  `, [userMovie.movie_id, userMovie.user_id, userMovie.created_at]);
  return ({ status: 'ok' });
};

const getUserMovie = async (userId) => {
  const res = await db.query(`
    SELECT DISTINCT movie_id FROM user_movie
    WHERE user_id=$1
  `, [userId]);
  return (res.rows);
};

module.exports = {
  addUserMovie,
  getUserMovie,
};
