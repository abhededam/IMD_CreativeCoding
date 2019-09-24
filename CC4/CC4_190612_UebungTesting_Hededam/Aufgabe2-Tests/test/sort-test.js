var assert = require('assert');
var sort = require('../modules/sort');

describe('Sorter', function () {
	it('this code is specifically written to sort a character map from the counter. More frequent characters will be listed first', function (done) {
		assert.deepEqual(sort({b: 1, a: 12}), [['a', 12], ['b', 1]]);
		done();
	});
});
