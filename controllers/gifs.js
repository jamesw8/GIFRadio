const express = require('express');
const models = require('../models');
const giphy = require('../giphy');

const router = express.Router();

router.get('/', (req, res) => {
	let gif_promises = [];
	

	for (let gif = 0; gif < 20; gif++) {
 		gif_promises.push(
 			new Promise((resolve, reject) => {
				giphy.retrieveGIF(giphy.api_key, resolve, reject)
			})
		);
	}

	Promise.all(gif_promises).then(gif_promises => {
		console.log(gif_promises);
		res.json({ gifs: gif_promises });
	});
});

module.exports = router;
