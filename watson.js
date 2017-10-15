const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

let account_cred = JSON.parse(fs.readFileSync('watson_key', 'utf8'))
const NaturalLanguageUnderstandingService = new NaturalLanguageUnderstandingV1({
	'username': account_cred.username,
	'password': account_cred.password,
	'version_date': '2017-02-27'
});

let parameters = {
	'text': 'This is a test text that tells us good news and bad news about something \
	and yeah.',
	'features': {
		'emotion': {
			'targets'
		}
		}
	}
}