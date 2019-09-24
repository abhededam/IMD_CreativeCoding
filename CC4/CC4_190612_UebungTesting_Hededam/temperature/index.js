var water = require('./module/water');

console.log('Hi there, this will print some interesting facts about water.');

for (var i = 0; i < 10; i++) {
	var temperature = Math.round(Math.random() * 200 - 50);
	var state = water.stateAtTemperature(temperature);
	console.log("At %d°, water is %s", temperature, state);
}
