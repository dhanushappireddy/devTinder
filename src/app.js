// import express js
const express = require("express");
const connectDB = require('./config/databases');
const User = require("./models/user");
const Test = require('./models/test');
const app = express();
const {validateSignUpData, validateLoginData} = require("./Utilities/validation.js");
const bcrypt = require("bcrypt");
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
    try {
    const test = new Test(req.body);
    await test.save();
    res.send("Data saved successfully");
    } catch(error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
// find one
app.get("/findOne", async (req, res) => {
    try {
        const user = await Test.findOne({emailId: req.body.email});
        console.log(user);
        res.send(user);
    } catch(error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
// update a record in mongodb using PATCH 
app.patch("/patch/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const ALLOWED_ITEMS = ["firstName", "password", "age", "gender"];
        const isUpdated = Object.keys(data).every((k) => {
            console.log(k);
            return ALLOWED_ITEMS.includes(k); // Add return here
        });
        if(!isUpdated) {
            throw new Error("Email is not allowed to update");
        }
        const afterUser = await Test.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after"});
        console.log(afterUser);
        res.send(afterUser);
    } catch(error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
// find and delete record from db
app.delete("/findAndDelete", async (req, res) => {
    try {
        const id = req.body._id;
        const user = await Test.findByIdAndDelete(id);
        res.send("Data deleted successfully from the database");
    } catch(error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
// Get a user from db and send to the postman
app.get("/getData", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await Test.find({emailId: userEmail});
        console.log(users.length);
        if(users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch {
        res.status(400).send("Something went wrong");
    }
});
// To get all uses from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await Test.find({});
        if(users.length === 0) {
            res.status(404).send("Database is empty");
        } else {
            res.send(users);
        }
    } catch {
        res.status(400).send("Something went wrong");
    }
});
app.post("/login", async (req, res) => {
    try {
        // Validation
        validateLoginData(req);
        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword) {
            return res.send("Login Successful");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch(error) {
        console.log("Login Error: "+error.message);
        return res.status(500).send(`Login Error: ${error.message}`);
    }
});
app.post("/signup", async (req, res) => {
    try {
        // Validation
        validateSignUpData(req);
        // Encryption of passwords
        const {firstName, lastName, password, email} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // Creating the instance of User
        const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash
        });
        await user.save();
        res.send("User added successfully");
    } catch(error) {
        console.log("Error while SignUp: ", error.message);
        res.status(500).send(`Error while SignUp: ${error.message}`);

    }
});