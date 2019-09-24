module.exports = {
	fahrenheitToCelsius: function (value) {
		return (value - 32) * 5/9;
	},
	celsiusToFahrenheit: function (value) {
		return (value * 9/5) + 32;
	},
	mphToKmh: function (value) {
		return value * 1.609;
	},
	kmhToMph: function (value) {
		return value / 1.609;
	}
};
