var assert = require('assert');
var validator = require('../modules/email-validator');

describe('E-Mail Validation', function () {
	it('should allow valid addresses', function (done) {
		var validAddresses = [
			'thomas@example.de',
			'bork.bork@gmx.de',
			'aileen.b.hededam@stud.h-da.de',
			'aileen@gmail.com'
		];
		validAddresses.forEach(function (address) {
			assert(validator(address), address + ' should be valid');
		});
		done();
	});

	it('should reject invalid addresses', function (done) {
		var invalidAddresses = [
			'Hello, world',
			'bork',
			'fiesepeter@'
		];
		invalidAddresses.forEach(function (address) {
			assert.equal(validator(address), false, address + ' should not be valid');
		});
		done();
	});
});
