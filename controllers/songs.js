const express = require('express');
const models = require('../models');
const clarifai = require('../clarifai')
const spotify = require('../spotify')

const router = express.Router();

router.post('/', (req, res) => {

  new Promise((resolve, reject) => {
    clarifai.get_all_tags(req.body.gif_urls, resolve, reject)
  }).then((all_tags) => {
    new Promise((resolve, reject) => {
      spotify.search(all_tags, resolve, reject);
    }).then((tracks) => {
      console.log(tracks);
      spotify.createPlaylist(tracks);
    });
  });
  spotify.createPlaylist
  res.json({status: 200});
});


module.exports = router;
