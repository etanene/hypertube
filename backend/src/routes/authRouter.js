const express = require('express');

const { authController } = require('../controllers');

const router = express.Router();

router.post('/login', authController.loginUser);

router.post('/signup', authController.signupUser);

router.get('/logout', authController.logoutUser);

router.get('/verify/:uuid', authController.verifyUser);

module.exports = router;
