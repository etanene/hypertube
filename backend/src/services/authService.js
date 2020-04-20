const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const { userModel } = require('../models');
const { AuthException } = require('../errors');
const validateService = require('./validateService');
// const mailService = require('./mailService');
// const { HOST_URL } = require('../config');

function swapDayMonth(date) {
  const splittedDate = date.split('.');
  [splittedDate[0], splittedDate[1]] = [splittedDate[1], splittedDate[0]];
  return splittedDate.join('/');
}
const signup = async (data) => {
  const user = data;
  const checkLogin = await userModel.getUser({ login: user.username });
  if (checkLogin.length) {
    throw new AuthException('Login already exists!');
  }
  const checkEmail = await userModel.getUser({ email: user.email });
  if (checkEmail.length) {
    throw new AuthException('Email already exists!');
  }
  user.birthday = swapDayMonth(user.birthday);
  user.password = await bcrypt.hash(user.password, 1);
  user.unique = uuid();
  await userModel.addUser(user);

  // const link = `<a href="${HOST_URL}/api/auth/verify/${user.unique}">Click me</a>`;
  // await mailService.sendMail(
  //   user.email,
  //   'Matcha email verification',
  //   `Please, verify your matcha account ${link}`,
  // );
  return (user);
};

const login = async (data) => {
  const loginData = validateService.getLoginData(data.username);
  const users = await userModel.getUser(loginData);
  if (!users.length) {
    throw new AuthException('Invalid username or password!');
  }
  const user = users[0];

  const validPasswd = await bcrypt.compare(data.password, user.passwd);
  if (!validPasswd) {
    throw new AuthException('Invalid username or password!');
  }
  if (!user.validate) {
    throw new AuthException('Please, validate your account on email');
  }
};

const verify = async (ulink) => {
  const res = await userModel.updateUser({ validate: 'TRUE' }, { unique_link: ulink });

  if (!res) {
    throw new AuthException('Can not find user!');
  }
};

const getToken = (data) => {
  try {
    const token = data.split(' ');
    if (token[0] === 'Bearer' && token[1]) {
      return token[1];
    }
    throw new AuthException('Unauthorized', 401);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      throw new AuthException('Unauthorized', 401);
    }
    throw e;
  }
};

const isAuth = (data, session) => {
  const token = getToken(data);
  if (token !== session) {
    throw new AuthException('Unauthorized', 401);
  }
};

module.exports = {
  signup,
  login,
  verify,
  isAuth,
};
