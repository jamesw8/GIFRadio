const express = require('express');
const models = require('../models');
const clarifai = require('../clarifai')
const spotify = require('../spotify')

const router = express.Router();

router.post('/', (req, res) => {
  var retval={}

  new Promise((resolve, reject) => {
    clarifai.get_all_tags(req.body.gif_urls, resolve, reject)
  }).then((all_tags) => {
    retval["keywords"] = all_tags;
    new Promise((resolve, reject) => {
      tags = []
      frequencies = []
      all_tags.forEach((entry) => {
        tags.push(entry[0]);
        frequencies.push(entry[1]);
      })
      spotify.search(tags, frequencies, resolve, reject);
    }).then((tracks) => {
      retval["tracks"] = tracks;
      res.json(retval);
      //spotify.createPlaylist(tracks);
    });
  });
});

module.exports = router;
