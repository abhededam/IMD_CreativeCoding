var unitconverter = require('./modules/unitconverter');

console.log('Converting some units for your personal pleasure! Enjoy!');
console.log('Please make sure you also download: Fun with Flags.');


// temperature
console.log(" %d°F is actually %d°C.", 20, unitconverter.fahrenheitToCelsius(20));
console.log(" %d°C is referred to as %d°F in some parts of the world.", 65, unitconverter.celsiusToFahrenheit(65));

// speed
console.log(" %d mph is the speed limit on some highways. That's about %d km/h.", 70, unitconverter.mphToKmh(70));
console.log(" %d km/h is the maximum speed of a cheetah. In america, that's %d mph", 100, unitconverter.kmhToMph(100));
