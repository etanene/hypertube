const express = require('express');
const passport = require('passport');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/login', passport.authenticate('local'),
  (req, res) => {
    console.log('req in router', req);
    console.log('res in router', res);
    req.session.logged = req.body.username;
    res.send({ token: req.session.id, userId: req.user.user_id, photo: req.user.photo });
  });

router.post('/signup', authController.signupUser);

router.get('/logout', authController.isAuth, authController.logoutUser);

router.get('/verify/:uuid', authController.verifyUser);

module.exports = router;
