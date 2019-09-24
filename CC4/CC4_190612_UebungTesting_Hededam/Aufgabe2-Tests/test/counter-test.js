var assert = require('assert');
var counter = require('../modules/counter');

describe('Counter', function () {
	it('this will take an arbitrary amount of text and count each occurring character', function () {
	assert.deepEqual(counter('hi'),{h: 1, i: 1});
	});
});
