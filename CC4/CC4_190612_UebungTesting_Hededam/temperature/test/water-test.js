var assert = require('assert');

var water = require('../module/water');

describe('Water', function () {
	it('is steam when above 100°', function (done) {
		var output = water.stateAtTemperature(110);
		assert.equal(output, 'gaseous');
		done();
	});

	it('is liquid when above 0°', function (done) {
		assert.equal(water.stateAtTemperature(1), 'liquid');
		assert.equal(water.stateAtTemperature(19.2), 'liquid');
		assert.equal(water.stateAtTemperature(99.9), 'liquid');
		done();
	});

	it('is solid when at or below 0°', function (done) {
		assert.equal(water.stateAtTemperature(0), 'solid');
		assert.equal(water.stateAtTemperature(-0.2), 'solid');
		assert.equal(water.stateAtTemperature(-Infinity), 'solid');
		done();
	});

	it('will throw an error if specified value is anything but a number', function (done) {
		assert.throws(function () {
			water.stateAtTemperature("boink!");
		});
		done();
	});
});
