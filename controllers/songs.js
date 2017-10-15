const express = require('express');
const models = require('../models');
const clarifai = require('../clarifai')

const router = express.Router();

router.get('/', (req, res) => {
  const clarifai_result = clarifai.get_tags('https://samples.clarifai.com/beer.mp4');
  console.log(clarifai_result)
  res.json({status: 200});
});

module.exports = router;
