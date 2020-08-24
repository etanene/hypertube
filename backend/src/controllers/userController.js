const escape = require('escape-html');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs').promises;
const { userService, validateService } = require('../services');
const { InternalError } = require('../errors');
const { userModel } = require('../models');

const get = async (req, res) => {
  try {
    const user = await userService.getUser(req.query);
    res.send(user);
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const resetpw = async (req, res) => {
  try {
    await validateService.validateEmail(req.body.email);
    const { email } = req.body;
    const user = await userModel.getUser({ email });
    if (user.length === 0) {
      res.send({ message: 'no user' });
    } else {
      await userService.resetPwUser(req.body.email);
      res.send({ status: 'ok' });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const changepw = async (req, res) => {
  try {
    if (req.params) {
      validateService.validatePasswords(req.body.password, req.body.confirm_password);
      await userService.changePwUser(req.body.password, req.params.uuid);

      res.send({ message: 'Password changed' });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const changeUserpw = async (req, res) => {
  try {
    validateService.validatePasswords(req.body.password, req.body.confirm_password);
    await userService.checkPassword(req.body.old_password, req.session.logged);
    await userService.changePwUser(req.body.password, { login: req.session.logged });
    res.send({ message: 'Password changed' });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const changeUserEmail = async (req, res) => {
  try {
    validateService.validateEmail(req.body.email);
    await userService.changeUserEmail(req.body.email, req.session.logged);
    res.send({ message: 'Email changed' });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const data = {};
    const {
      info,
      userId,
      email,
      username,
      password,
      first_name,
      last_name,
      confirm_password,
      photo,
    } = req.body;
    await validateService.validateUserId(userId);
    if (email) {
      validateService.validateEmail(email);
      data.email = email;
    }
    if (username) {
      validateService.validateUsername(username);
      data.login = username;
    }
    if (info !== undefined) {
      validateService.validateInfo(info);
      data.info = escape(info);
    }
    if (password || confirm_password) {
      validateService.validatePasswords(password, confirm_password);
      data.passwd = await bcrypt.hash(password, 1);
    }
    if (first_name) {
      data.first_name = first_name;
    }
    if (last_name) {
      data.last_name = last_name;
    }
    if (photo) {
      const filename = uuid();
      const base64 = photo.replace(/data:image.*?;base64,/, '');
      await fs.writeFile(path.resolve('/app/public/photo', filename), base64, 'base64');
      data.photo = filename;
    }
    if (Object.keys(data).length !== 0) {
      await userService.updateUser(data, userId);
      const user = await userModel.getUser({ user_id: userId });
      const { user_id, login } = user[0];
      const userPhoto = user[0].photo;
      res.send({ message: 'User updated', user: { userId: user_id, photo: userPhoto, username: login } });
    } else {
      res.send({ message: 'No data was updated' });
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(e.status || 500).send(new InternalError());
    } else {
      console.error(e);
      res.status(e.status || 500).send(e);
    }
  }
};

module.exports = {
  get,
  resetpw,
  changepw,
  changeUserpw,
  changeUserEmail,
  updateUser,
};
