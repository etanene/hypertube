const express = require('express');

const commentRouter = require('./comment');

const router = express.Router();

router.use('/comment', commentRouter);

module.exports = router;
