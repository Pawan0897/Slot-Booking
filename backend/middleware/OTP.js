const otpGenerator = require("otp-generator");

const OTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true
  });
};

module.exports = OTP;