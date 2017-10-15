const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

let account_cred = JSON.parse(fs.readFileSync('watson_key', 'utf8'));

const NaturalLanguageUnderstandingService = new NaturalLanguageUnderstandingV1({
	"username": account_cred.username,
	"password": account_cred.password,
	"version_date": "2017-02-27"
});

let retrieveEmotions = function (string, resolve, reject) {
	let parameters = {
		'text': string,
		'features': {
			'emotion': {
				'targets': string.split(" ")
			}
		}
	};

	NaturalLanguageUnderstandingService.analyze(parameters, function(err, res) {
		if (err)
			console.log(err);
		else
			resolve(res);
	});
};

// console.log(retrieveEmotions('hey what is up how are you really today?', resolve, reject));
module.exports = {
	retrieveEmotions: retrieveEmotions
};