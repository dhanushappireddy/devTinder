const mongoose = require("mongoose");
const testSchema = mongoose.Schema({
    name: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});
const test = mongoose.model("test", testSchema);
module.exports = test;