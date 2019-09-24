var water = {

	stateAtTemperature: function (temperature) {
		if (temperature !== 0+temperature) {
			throw "Parameter 'temperature' must be a Number";
		}

		if (temperature > 100) {
			return 'gaseous';
		} else if (temperature > 0) {
			return 'liquid';
		} else if (temperature <= 0) {
			return 'solid';
		}
	}
};

module.exports = water;
