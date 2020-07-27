const express = require('express');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const commentRouter = require('./commentRouter');
const userMovieRouter = require('./userMovieRouter');
const torrentRouter = require('./torrentRouter');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Alive!');
});

router.use('/user', userRouter);
router.use('/torrent', torrentRouter);
router.use('/auth', authRouter);
router.use('/comment', commentRouter);
router.use('/userMovie', userMovieRouter);

module.exports = router;
