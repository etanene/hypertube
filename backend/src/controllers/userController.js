const bcrypt = require('bcrypt');
const { userService, validateService } = require('../services');
const { InternalError } = require('../errors');

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
    validateService.validateEmail(req.body.email);
    await userService.resetPwUser(req.body.email);
    res.send({ message: 'reset' });
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
      userId,
      email,
      username,
      password,
      first_name,
      last_name,
      confirm_password,
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
    await userService.updateUser(data, userId);
    res.send({ message: 'User updated' });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      console.error('');
      res.status(e.status || 500).send(new InternalError());
    } else {
      console.error(e);
      console.error('');
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
