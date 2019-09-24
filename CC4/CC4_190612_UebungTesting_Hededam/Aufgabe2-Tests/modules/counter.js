/*
 * this will take an arbitrary amount of text and count each
 * occurring character
 *  input:
 *    'hi there!'
 *  output:
 *    {h: 2, i: 1, ' ': 1, t: 1, e: 2, '!': 1}
 */
function countCharacters(textblock) {
	var characterCounters = {};

	var characters = textblock.split('');
	characters.forEach(function (character) {
		character = character.toLowerCase();
		var oldCount = characterCounters[character];
		oldCount = oldCount || 0; // initialising if empty!
		var newCount = oldCount + 1;
		characterCounters[character] = newCount;
	});

	return characterCounters;
}

module.exports = countCharacters;
