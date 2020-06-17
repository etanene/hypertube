const express = require('express');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
// const movieRouter = require('./movie');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Alive!');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
// router.use('/movie', movieRouter);

module.exports = router;
