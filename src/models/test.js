const mongoose = require("mongoose");
const validator = require("validator");
const testSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id");
            }
        }
    },
    password: {
        type: String
    },
    photoURL: {
        type: String,
        default: "https://cdn2.iconfinder.com/data/icons/business-hr-and-recruitment/100/account_blank_face_dummy_human_mannequin_profile_user_-512.png"
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender can only be male, female or others");
            }
        }
    }
}, {
    timestamps: true
}

);
const test = mongoose.model("test", testSchema);
module.exports = test;