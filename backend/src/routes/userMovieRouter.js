const express = require('express');

const { userMovieController } = require('../controllers');

const router = express.Router();

router.post('/add', userMovieController.addUserMovie);
router.post('/get', userMovieController.getUserMovie);

module.exports = router;
