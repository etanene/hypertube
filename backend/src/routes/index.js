const express = require('express');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Alive!');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

module.exports = router;
