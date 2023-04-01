const validateUsername = (username) => {
	if (username.length > 0) {
		return true;
	} else {
		return false;
	}
};

// Validate the inputted email with a regex, return true if its valid
const validateEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	return re.test(String(email).toLowerCase());
};

// Validate that the firstname is not empty
const validateFirst = (first) => {
	if (first.length > 0) {
		return true;
	} else {
		return false;
	}
};

// Validate that the lastname is not empty
const validateLast = (last) => {
	if (last.length > 0) {
		return true;
	} else {
		return false;
	}
};

// Validate that the password is not empty, contains atleast 1 number, 1 uppercase, 1 lowercase, and is atleast 8 characters long
const validatePassword = (password) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	// source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
	return re.test(String(password));
};

// Check if the password and password confirm match
const validatePasswordConfirm = (passwordConfirm, password) => {
	if (passwordConfirm === password && passwordConfirm.length > 0) {
		return true;
	} else {
		return false;
	}
};

// Check if the given phone number is of the form xxx-xxx-xxxx
const validatePhone = (phone) => {
	const re = /^\d{3}-\d{3}-\d{4}$/;
	return re.test(String(phone));
};

module.exports = {
	validateUsername,
	validateEmail,
	validateFirst,
	validateLast,
	validatePassword,
	validatePasswordConfirm,
	validatePhone,
};
