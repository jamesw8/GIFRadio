const express = require('express');
const models = require('../models');
const clarifai = require('../clarifai')

const router = express.Router();

router.post('/', (req, res) => {
  new Promise((resolve, reject) => {
    clarifai.get_tags('https://samples.clarifai.com/beer.mp4', resolve, reject)
  }).then((tags)=>{
    console.log(tags);
    res.json({status: 200});
  });

});

module.exports = router;
