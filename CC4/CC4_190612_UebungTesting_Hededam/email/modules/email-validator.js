EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z-]{2}/; // do not use! incomplete!

module.exports = function (candidate) {
	return EMAIL_REGEX.test(candidate);
};
