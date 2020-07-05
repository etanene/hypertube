const express = require('express');

const { userController, authController } = require('../controllers');

const router = express.Router();

router.get('/get', userController.get);

router.post('/resetpw', userController.resetpw);

router.post('/changepw/:uuid', userController.changepw);

router.post('/changeUserpw', authController.isAuth, userController.changeUserpw);

router.post('/changeUserEmail', authController.isAuth, userController.changeUserEmail);

module.exports = router;
