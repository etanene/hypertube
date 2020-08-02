const express = require('express');

const { commentController } = require('../controllers');

const router = express.Router();

router.post('/add', commentController.addComment);
router.post('/get', commentController.getComments);

module.exports = router;
