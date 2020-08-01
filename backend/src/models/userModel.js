const { db, dbUtils } = require('../db');

const addUser = async (user) => {
  await db.query(`
    INSERT INTO
      users (email, login, first_name, last_name, passwd, unique_link, photo)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
  `, [user.email, user.username, user.first_name, user.last_name, user.password, user.unique, user.photo]);
};

const getUser = async (data, without) => {
  const res = await db.query(`
    SELECT
      *
    FROM
      users
    ${dbUtils.getInCondition(data, without, 0)}
  `, dbUtils.spreadValues(data));
  return (res.rows);
};

const updateUser = async (data, condition) => {
  const res = await db.query(`
    UPDATE
      users
    ${dbUtils.getUpdateValues(data)}
    ${dbUtils.getCondition(condition, Object.keys(data).length)}
  `, [...Object.values(data), ...Object.values(condition)]);

  return (res.rows);
};

const getUserByLogin = async (login) => {
  const res = await db.query(`SELECT * from users where login = '${login}'`);
  return res.rows[0];
};

const getUserById = async (id) => {
  const res = await db.query(`SELECT * from users where id = ${id}`);
  return res.rows[0];
};

const getUserBySourceId = async (provider, id) => {
  if (provider === 'google') {
    const res = await db.query(`SELECT * from users where googleId = '${id}'`);
    return res.rows[0];
  }
  if (provider === '42') {
    const res = await db.query(`SELECT * from users where fortytwoId = '${id}'`);
    return res.rows[0];
  }
  if (provider === 'github') {
    const res = await db.query(`SELECT * from users where githubId = '${id}'`);
    return res.rows[0];
  }
  return null;
};

const createUserBySource = async (provider, profile) => {
  if (provider === 'google') {
    await db.query(`
    INSERT INTO
      users (email, login, first_name, last_name, googleId)
    VALUES
      ($1, $2, $3, $4, $5)
  `, [profile.emails[0].value, profile.displayName, profile.name.givenName, profile.name.familyName, profile.id]);
  }
  if (provider === '42') {
    await db.query(`
    INSERT INTO
      users (email, login, first_name, last_name, fortytwoId)
    VALUES
      ($1, $2, $3, $4, $5)
  `, [profile.emails[0].value, profile.username, profile.name.givenName, profile.name.familyName, profile.id]);
  }
  if (provider === 'github') {
    await db.query(`
    INSERT INTO
      users (login, photo, githubId)
    VALUES
      ($1, $2, $3)
  `, [profile.username, profile.photos[0].value, profile.id]);
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  getUserByLogin,
  getUserById,
  getUserBySourceId,
  createUserBySource,
};
