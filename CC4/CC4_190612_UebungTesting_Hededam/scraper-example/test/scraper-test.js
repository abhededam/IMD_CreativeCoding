var assert = require('assert');
var scraper = require('../modules/scraper');

describe('Scraper', function () {
	it('should always return an array', function (done) {
		var result = scraper('');
		assert(result, 'returns something');
		assert('forEach' in result, 'returns something array-like');
		done();
	});

	it('parses table-like information', function (done) {
		var result = scraper('<body><tr><td class="foo">bar</td></tr></body>');
		assert(result[0], 'returns any object');
		assert.deepEqual(result[0], {foo: 'bar'}, 'returns the expected structure');
		done();
	});

	it('parses an existing demo-file', function (done) {
		var fs = require('fs');
		var examplefile = fs.readFileSync(__dirname+'/fixtures/city-example.html');

		var result = scraper(examplefile);
		assert.equal(result.length, 2, '2 cities in the file');
		assert.deepEqual(result[0], {name: 'Dieburg', population: 15192, zipcode: '64807'}, 'returns the expected structure');
		done();
	});
});
