const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin:admin@devtinder.iwca2.mongodb.net/devTinder");  
};
module.exports = connectDB;