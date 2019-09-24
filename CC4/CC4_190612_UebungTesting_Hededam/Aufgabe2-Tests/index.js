var fs = require('fs');

var countCharacters = require('./modules/counter');
var sortCounters = require('./modules/sort');
var formatOutput = require('./modules/outputFormatter');

var filename = process.argv[2];
var content = fs.readFileSync(filename).toString();
var unsortedCounts = countCharacters(content);
var sortedCounts = sortCounters(unsortedCounts);

console.log(formatOutput(sortedCounts));
