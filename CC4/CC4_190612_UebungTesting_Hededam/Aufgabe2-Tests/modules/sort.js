/*
 * this code is specifically written to sort a character map from
 * the counter. More frequent characters will be listed first
 *  input:
 *     {b: 1, a: 12}
 *  output:
 *     [['a', 12], ['b', 1]]
 */
function sortCounters(counters) {
	var sortedCounters = [];
	for (var key in counters) {
		sortedCounters.push([key, counters[key]]);
	}

	// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for why this works.
	sortedCounters.sort(function (a, b) {
		return b[1] - a[1];
	});
	return sortedCounters;
}

module.exports = sortCounters;