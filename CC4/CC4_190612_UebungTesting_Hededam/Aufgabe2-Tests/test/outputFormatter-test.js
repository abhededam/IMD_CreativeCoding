var assert = require('assert');
var outputFormatter = require('../modules/outputFormatter');

describe('Output Formatter', function () {
	
	it('this takes a sorted count array and formats it nicely ', function (done) {
		assert.deepEqual(outputFormatter([['a', 12], ['b', 1]]), 'a: 12' + "\n" + 'b: 1' + "\n");
		done();
	});
});
