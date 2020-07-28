const passport = require('passport');

const {
  validateService,
  authService,
  // userService,
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

const loginUser = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) { return next(err); }
    req.logIn(user, (error) => {
      if (error) { return next(error); }
      return res.send(user);
    });
    return next(err);
  })(req, res, next);
};

const logoutUser = (req, res) => {
  try {
    req.session.destroy();
    res.send({ message: 'user logout!' });
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

const isAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('auth', authorization);

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
  signupUser,
  loginUser,
  logoutUser,
  verifyUser,
  isAuth,
};
