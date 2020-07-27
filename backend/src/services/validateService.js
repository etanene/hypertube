const escape = require('escape-html');
const moment = require('moment-timezone');
const { getUser } = require('./userService');
const { ValidateException } = require('../errors');

const REGEXP_USERNAME = /^[A-Za-z\d]{4,12}$/;
const REGEXP_EMAIL = /^\S+@\S+\.\S+$/;
const REGEXP_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,12}$/;
const REGEXP_MOVIE_ID = /^[t]{2}\d{3,10}$/;
// const REGEXP_TORRENT_URL = /^(https:).{4}(yts.mx).{2}(torrent).{2}(download)/;

const validateUsername = (username) => {
  if (!(username && REGEXP_USERNAME.test(username))) {
    throw new ValidateException('Invalid username!');
  }
};

const validateEmail = (email) => {
  if (!(email && REGEXP_EMAIL.test(email))) {
    throw new ValidateException('Invalid email');
  }
};

const validatePasswords = (password, confirmPassword) => {
  if (!(password && REGEXP_PASSWORD.test(password))) {
    throw new ValidateException('Invalid password!');
  } else if (!(confirmPassword && confirmPassword === password)) {
    throw new ValidateException('Password does not match!');
  }
};

const validateUser = (user) => {
  if (!user.first_name) {
    throw new ValidateException('Invalid first name!');
  } else if (!user.last_name) {
    throw new ValidateException('Invalid last name!');
  }
  validateUsername(user.username);
  validateEmail(user.email);
  validatePasswords(user.password, user.confirm_password);
};

const validateMovieId = (movieId) => {
  if (!REGEXP_MOVIE_ID.test(movieId)) {
    throw new ValidateException('Invalid movie Id');
  }
};

const validateComment = async (comment) => {
  comment.text = escape(comment.text);
  comment.created_at = moment().unix();
  if (!comment.text) {
    throw new ValidateException('Comment text is required');
  } else if (comment.text.length > 500) {
    throw new ValidateException('Comment cannot be more than 500 symbols');
  }
  validateMovieId(comment.movie_id);
};

const validateUserId = async (userId) => {
  if (!userId) throw new ValidateException('User id is required');
  const user = await getUser({ user_id: userId });
  if (!user[0]) throw new ValidateException('User with given ID does not exist');
};

const validateInfo = (info) => {
  if (info.length > 250) throw new ValidateException('Profile info is too long');
};

const getLoginData = (user) => {
  if (user && REGEXP_EMAIL.test(user)) {
    return ({ email: user });
  }
  return ({ login: user });
};

const validateTorrent = (torrent) => {
  // if (!(torrent.url && REGEXP_TORRENT_URL.test(torrent.url))) {
  //   throw new ValidateException('Invalid URL');
  // }
  if (!torrent.name) {
    throw new ValidateException('Invalid name');
  }
  if (!torrent.quality) {
    throw new ValidateException('Invalid quality');
  }
  validateMovieId(torrent.movie_id);
};

module.exports = {
  validateTorrent,
  validateInfo,
  validateUserId,
  validateUser,
  getLoginData,
  validateUsername,
  validateEmail,
  validatePasswords,
  validateMovieId,
  validateComment,
};
