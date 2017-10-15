const watson = require('./watson');

var test = new Promise((resolve, reject) => {
	watson.retrieveEmotions('hey what is up how are you really today?', resolve, reject);
});

test.then((json) => {
	return (json);
}).then((jsonWords) => {
	console.log(jsonWords['emotion']['targets']);
});
