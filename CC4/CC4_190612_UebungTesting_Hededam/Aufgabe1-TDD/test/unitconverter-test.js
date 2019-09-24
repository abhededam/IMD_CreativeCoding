var assert = require('assert');
var unitconverter = require('../modules/unitconverter');

// helper: you can't easily compare to float numbers
// they may be off in tiny ways. Here we compare them
// within a tiny margin of error.
function roughlyEqual(a, b) {
	assert((a - b) < 0.001, `${a} and ${b} are not roughly the same`);
}

describe('Temperature Conversion', function () {
	it('converts from celsius to fahrenheit', function (done) {
		roughlyEqual(unitconverter.celsiusToFahrenheit(0), 32);
		roughlyEqual(unitconverter.celsiusToFahrenheit(10), 50);
		roughlyEqual(unitconverter.celsiusToFahrenheit(20), 68);
		roughlyEqual(unitconverter.celsiusToFahrenheit(100), 212);
		done();
	});

	it('converts from fahrenheit to celsius', function (done) {
		roughlyEqual(unitconverter.fahrenheitToCelsius(32), 0);
		roughlyEqual(unitconverter.fahrenheitToCelsius(50), 10);
		roughlyEqual(unitconverter.fahrenheitToCelsius(68), 20);
		roughlyEqual(unitconverter.fahrenheitToCelsius(212), 100);
		done();
	});

	it('should work back and forth without changing the value', function () {
		var randomValue = Math.random()*100;
		roughlyEqual(unitconverter.fahrenheitToCelsius(unitconverter.celsiusToFahrenheit(randomValue)), randomValue);
	});
});

describe('Speed Conversion', function () {
	it('converts from mph to kmh', function (done) {
		roughlyEqual(unitconverter.mphToKmh(0), 0, "well, zero is zero in both cases.");
		roughlyEqual(Math.round(unitconverter.mphToKmh(10)), 16, "10 is round about 16");
		roughlyEqual(Math.round(unitconverter.mphToKmh(88)), 142, "88 mph, all we need is lightning");
		done();
	});

	it('converts from kmh to mph', function (done) {
		roughlyEqual(unitconverter.kmhToMph(0), 0, "well, zero is zero in both cases.");
		roughlyEqual(Math.round(unitconverter.kmhToMph(30)), 19);
		roughlyEqual(Math.round(unitconverter.kmhToMph(100)), 62, "88 mph, all we need is lightning");
		done();
	});

	it('should work back and forth without changing the value', function () {
		var randomValue = Math.random()*100;
		roughlyEqual(unitconverter.mphToKmh(unitconverter.kmhToMph(randomValue)), randomValue);
	});
});
