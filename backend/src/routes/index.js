const express = require('express');

const commentRouter = require('./comment');

const router = express.Router();

router.use('/comments', commentRouter);

module.exports = router;
