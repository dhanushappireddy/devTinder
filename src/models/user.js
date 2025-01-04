const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName: {
        type: String 
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender must be male, female or others");
            }
        }
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;