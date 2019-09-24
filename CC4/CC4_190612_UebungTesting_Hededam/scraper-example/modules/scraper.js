var cheerio = require('cheerio');

module.exports = function (html) {
	var results = [];

	var dom = cheerio.load(html);
	var rows = dom('tr');

	rows.each(function (index, element) {
		var row = {};
		var tds = cheerio(element).find('td[class]');
		if (tds.length > 0) {
			tds.each(function (index, td) {
				$td = cheerio(td);
				row[$td.attr('class')] = $td.text();
			});
			results.push(row);
		}
	});
	return results;
};
