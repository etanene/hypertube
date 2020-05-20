const express = require('express');

const movieRouter = require('./movie');

const router = express.Router();

router.use('/movie', movieRouter);

module.exports = router;
