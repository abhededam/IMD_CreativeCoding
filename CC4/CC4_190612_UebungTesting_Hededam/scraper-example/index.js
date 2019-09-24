var scraper = require('./modules/scraper');
var request = require('request');

request({
	uri: process.argv[2],
}, function(error, response, body) {
	if (error || response.statusCode != 200) {
		console.error(response.statusCode, response.body, error);
		return;
	}

	console.log("Download Complete");
	console.log(scraper(body));
});
