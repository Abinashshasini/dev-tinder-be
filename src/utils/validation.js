const validator = require('validator');
const { ApiError } = require('./apiError');

/** Function to validate user signup data */
const handleValidateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new ApiError(400, 'Name is not valid!');
  } else if (!validator.isEmail(emailId)) {
    throw new ApiError(400, 'Email is not valid!');
  } else if (!validator.isStrongPassword(password)) {
    throw new ApiError(400, 'Please enter a strong Password!');
  }
};

module.exports = {
  handleValidateSignupData,
};
