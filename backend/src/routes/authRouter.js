const express = require('express');
const passport = require('passport');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/login', authController.loginUser);

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/login/42', passport.authenticate('42'));

router.get('/login/42/callback', passport.authenticate('42', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/login/github', passport.authenticate('github'));

router.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/login/vk', passport.authenticate('vkontakte'));

router.get('/login/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/login/spotify', passport.authenticate('spotify'));

router.get('/login/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

router.post('/user', authController.getUser);

router.post('/signup', authController.signupUser);

router.get('/logout', authController.logoutUser);

router.post('/validatePass', authController.validatePassword);

router.get('/verify/:uuid', authController.verifyUser);

module.exports = router;
