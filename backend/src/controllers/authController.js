const passport = require('passport');
const {
  validateService,
  authService,
} = require('../services');
const { InternalError } = require('../errors');

const signupUser = async (req, res) => {
  try {
    validateService.validateUser(req.body);
    const { username, email } = await authService.signup(req.body);
    const message = 'Welcome! Please check your email for account confirm!';
    res.send({ username, email, message });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.send(err.message);
    }
    if (user) {
      req.session.logged = req.body.username;
      res.send({ token: req.session.id, userId: user.user_id, photo: user.photo });
    }
  })(req, res, next);
};

const logoutUser = (req, res) => {
  try {
    req.logout();
    res.send({ message: 'user logout!' });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const getUser = (req, res) => {
  try {
    const { user } = req.session.passport;
    res.send({
      username: user.login,
      token: req.session.id,
      userId: user.user_id,
      photo: user.photo,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const verifyUser = async (req, res) => {
  try {
    if (req.params) {
      await authService.verify(req.params.uuid);

      res.redirect('/login');
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const validatePassword = async (req, res) => {
  try {
    const isValid = await authService.validatePassword(req.body);
    res.send({ isValid });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const isAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    authService.isAuth(authorization, req.session.id);
    next();
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

module.exports = {
  validatePassword,
  signupUser,
  loginUser,
  logoutUser,
  verifyUser,
  isAuth,
  getUser,
};
