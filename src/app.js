// import express js
const express = require("express");
const connectDB = require('./config/databases');
const User = require("./models/user");
const Test = require('./models/test');
const app = express();
connectDB().then(() => {
    console.log("DataBase connection successfully");
    app.listen(3333, () => {
        console.log("Server is currently running on port 3333");
    })
}).catch((error) => {
    console.log(error.message);
    console.log("DataBase cannot be connected");
    console.log(error);
});
app.use(express.json());
// Sending data to db from POSTMAN
app.post("/test", async (req, res) => {
    const test = new Test(req.body);
    await test.save();
    res.send("Data saved successfully");
});

// POST API for creating a new user
app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Dhanush",
        lastName: "Appireddy",
        emailId: "dhanush@appireddy.com",
        password: "pass"
    }
    // Creating a new instance of the User model
    const user = new User(userObj);
    await user.save();
    console.log("User created successfully");
    res.send("User created successfully");
});