/*
 * text blocks contain stuff that is not very printable
 * we're converting newlines and tabs, currently.
 */
function specialCharacterHandling(character) {
	switch (character) {
		case "\n":
			return '<newline>';
		case "\t":
			return '<tab>';
		case " ":
			return '<space>';
		default:
			return character;
	}
}

/*
 * this takes a sorted count array and formats it nicely like this:
 *  input:
 *     [['a', 12], ['b', 1]]
 *  output:
 *     a: 12
 *     b: 1
 */
function outputFormatter(counters) {
	var output = '';

	counters.forEach(function (pair) {
		output += specialCharacterHandling(pair[0]) + ': ' + pair[1] + "\n";
	});

	return output;
}

module.exports = outputFormatter;
