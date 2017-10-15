const express = require('express');
const models = require('../models');
const giphy = require('../giphy');

const router = express.Router();

router.get('/', (req, res) => {
	let gifs = [];
	let getGIF;

	var loop = function (resolve, reject) {
		for (let gif = 0; gif < 20; gif++) {
	 		getGIF = new Promise((resolve, reject) => {
				giphy.retrieveGIF(giphy.api_key, resolve, reject)
			}).then((gif_link) => {
				gifs.push(gif_link);
				console.log(gifs);
			});
		}
		resolve(gifs);
	};

	new Promise((loop, resolve, reject) => {
		loop(resolve, reject);
	}).then(() => {
		res.json({ gifs: gifs });
	});
	
	console.log('Outside',gifs);
  	res.json({ gifs: ['2','plus','2','is','four','minus','one','that\'s','three',
  		'quick','maths','ree','eeee','eeeee','eeeee','eeeee','eeeee','eeeee','eeee','eeee']});
});

module.exports = router;
