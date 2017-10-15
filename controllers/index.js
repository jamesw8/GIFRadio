const express = require('express');
const router = express.Router();

router.use('/gifs', require('./gifs'));
router.use('/songs', require('./songs'));

module.exports = router;
