const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs').promises;

const { userModel } = require('../models');
const { AuthException } = require('../errors');

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
  user.password = await bcrypt.hash(user.password, 1);
  user.unique = uuid();
  const filename = uuid();
  const base64 = user.photo.replace(/data:image.*?;base64,/, '');
  await fs.writeFile(path.resolve('/app/public/photo', filename), base64, 'base64');
  user.photo = filename;
  await userModel.addUser(user);
  return (user);
};

const validatePassword = async (data) => {
  if (!data.user_id) throw new AuthException('User id is required');
  const user = await userModel.getUser({ user_id: data.user_id });
  if (!user[0]) throw new AuthException('Can not find user!');
  const validPasswd = await bcrypt.compare(data.password, user[0].passwd);
  return validPasswd;
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
  verify,
  isAuth,
  validatePassword,
};
