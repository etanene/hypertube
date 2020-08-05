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
  console.log('data', data);
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
  if (provider === 'vkontakte') {
    const res = await db.query(`SELECT * from users where vkId = '${id}'`);
    return res.rows[0];
  }
  if (provider === 'spotify') {
    const res = await db.query(`SELECT * from users where spotifyId = '${id}'`);
    return res.rows[0];
  }
  return null;
};

const createUserBySource = async (provider, profile) => {
  if (provider === 'google') {
    await db.query(`
    INSERT INTO
      users (email, login, first_name, last_name, googleId, photo)
    VALUES
      ($1, $2, $3, $4, $5, 'avatar.jpg')
  `, [profile.emails[0].value, profile.displayName, profile.name.givenName, profile.name.familyName, profile.id]);
  }
  if (provider === '42') {
    await db.query(`
    INSERT INTO
      users (email, login, first_name, last_name, fortytwoId, photo)
    VALUES
      ($1, $2, $3, $4, $5, 'avatar.jpg')
  `, [profile.emails[0].value, profile.username, profile.name.givenName, profile.name.familyName, profile.id]);
  }
  if (provider === 'github') {
    await db.query(`
    INSERT INTO
      users (login, githubId, photo)
    VALUES
      ($1, $2, 'avatar.jpg')
  `, [profile.username, profile.id]);
  }
  if (provider === 'vkontakte') {
    await db.query(`
    INSERT INTO
      users (login, first_name, last_name, vkId, photo)
    VALUES
      ($1, $2, $3, $4, 'avatar.jpg')
  `, [profile.username, profile.name.givenName, profile.name.familyName, profile.id]);
  }
  if (provider === 'spotify') {
    await db.query(`
    INSERT INTO
      users (login, spotifyId, photo)
    VALUES
      ($1, $2, 'avatar.jpg')
  `, [profile.displayName, profile.id]);
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
