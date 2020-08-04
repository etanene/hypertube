const express = require('express');
const passport = require('passport');
const { InternalError } = require('../errors');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.send(err.message);
    }
    if (user) {
      req.session.logged = req.body.username;
      res.send({ token: req.session.id, userId: user.user_id, photo: user.photo });
    }
  })(req, res, next);
});

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/login');
  });

router.get('/login/42', passport.authenticate('42'));

router.get('/login/42/callback', passport.authenticate('42', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/login');
  });

router.get('/login/github', passport.authenticate('github'));

router.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/login');
  });

router.post('/user', (req, res) => {
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
});

router.post('/signup', authController.signupUser);

router.get('/logout', (req, res) => {
  try {
    // req.session.destroy();
    req.logout();
    res.send({ message: 'user logout!' });
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
});

router.get('/verify/:uuid', authController.verifyUser);

module.exports = router;
