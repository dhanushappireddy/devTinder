const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("FirstName is mandatory");
    } else if(!validator.isEmail(email)) {
        throw new Error("Please enter a valid emailID");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};
const validateLoginData = (req) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new Error("UserName or Password should not be empty");
    } else if(!validator.isEmail(email)) {
        throw new Error("Please enter valid emailID");
    }
};
module.exports = {
    validateSignUpData,
    validateLoginData
};