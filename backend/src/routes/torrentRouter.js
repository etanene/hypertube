const express = require('express');

const { torrentController } = require('../controllers');

const router = express.Router();

router.post('/download', torrentController.download);

module.exports = router;
