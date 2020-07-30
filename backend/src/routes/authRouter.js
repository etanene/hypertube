/* eslint-disable */
const express = require('express');
const passport = require('passport');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log('error is ', err);
    console.log('user is ', user);
    if (err) {
      res.send(err.message);
    }
    if (user) {
      req.session.logged = req.body.username;
      res.send({ token: req.session.id, userId: user.user_id, photo: user.photo });
    }
  })(req, res, next);
});

router.post('/signup', authController.signupUser);

router.get('/logout', authController.isAuth, authController.logoutUser);

router.get('/verify/:uuid', authController.verifyUser);

module.exports = router;
