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
    validateService.validatePasswords(req.body.password, req.body.confirm_password);
    await userService.changePwUser(req.body.password, req.params);

    res.send({ message: 'Password changed' });
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

module.exports = {
  get,
  resetpw,
  changepw,
  changeUserpw,
  changeUserEmail,
};
