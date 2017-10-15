const express = require('express');
const models = require('../models');
const clarifai = require('../clarifai')

const router = express.Router();

router.post('/', (req, res) => {
let all_tags = new Set();
  
  JSON.parse(req.body.gif_urls).forEach((gif_url) => {
    new Promise((resolve, reject) => {
      console.log(gif_url);
      clarifai.get_tags(gif_url, resolve, reject)
    }).then((tags)=>{
      console.log(gif_url,tags,tags.length);
	tags.forEach((tag) => {
      all_tags.add(tag);
});
      console.log("all_tags",all_tags, all_tags.length);
    });
  });
  

  res.json({status: 200});
});

module.exports = router;
