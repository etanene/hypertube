const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const { userModel } = require('../models');
const { UserException } = require('../errors');
const { HOST_URL } = require('../config');
const mailService = require('./mailService');

const getUser = async (params) => {
  const user = await userModel.getUser(params);
  return (user);
};

const updateUser = async (user, userId) => {
  const res = await userModel.updateUser(user, { user_id: userId });
  return res;
};

const resetPwUser = async (email) => {
  const uniqueLink = uuid();
  const res = await userModel.updateUser({ unique_link: uniqueLink }, { email });
  if (!res) {
    throw new UserException('Email does not exists!');
  }

  const link = `<a href="${HOST_URL}/changepw/${uniqueLink}">Click me</a>`;
  await mailService.sendMail(
    email,
    'Hypertube reset password',
    `Please, use link to reset password ${link}`,
  );
};

const changePwUser = async (password, ulink) => {
  const hashPassword = await bcrypt.hash(password, 1);
  const res = await userModel.updateUser({ passwd: hashPassword, unique_link: null },
    { unique_link: ulink });

  if (!res) {
    throw new UserException('Can not find user!');
  }
};

const checkPassword = async (password, login) => {
  const users = await userModel.getUser({ login });
  const user = users[0];
  const validPasswd = await bcrypt.compare(password, user.passwd);

  if (!validPasswd) {
    throw new UserException('Invalid password!');
  }
};

const changeUserEmail = async (newEmail, login) => {
  const res = await userModel.updateUser({ email: newEmail }, { login });

  if (!res) {
    throw new UserException('Can not find user! And change Email');
  }
};

module.exports = {
  getUser,
  updateUser,
  resetPwUser,
  changePwUser,
  checkPassword,
  changeUserEmail,
};
