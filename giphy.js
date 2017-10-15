require('isomorphic-fetch');
fs = require('fs');

let api_key = "eoQOZaUpboc8tau1qvKRzpYos1DxxlJ6";

let retrieveGIF = function(api_key, resolve, reject) {
	fetch('http://api.giphy.com/v1/gifs/random?api_key=' + api_key + '&rating=pg').then((response) => {
		return response.json();
	}).then((json) => {
		// console.log(json['data']);
		resolve(json['data']['image_original_url']);
	});
}

// retrieveGIF(api_key);
module.exports = {
	api_key: api_key,
	retrieveGIF: retrieveGIF
}