// import express js
const express = require("express");
const { adminAuth, userAuth } = require("./admin");
// to create instance of express js application/server 
const app = express();
// Error Handling
app.use("/error", (req, res, next) => {
    try {
        throw new Error("Error occured");
    } catch(error) {
        next(error);
    }
});
// Handling error
app.use("/", (error, req, res, next) => {
    console.log("Error is getting validated");
    if(error) {
        console.log(error);
        console.log(error.message);
        res.status(500).send("Something went wrong");
    } else {
        res.status(500).send("No Error found");
    }
});
// Handling Middlewares
app.use("/dhanush", adminAuth, userAuth);
app.use("/akshay", 
    (req, res, next)=> {
        console.log("First Route Handler");
        next();
}, (req,res,next) => {
    console.log("Second Route Handler");
    next();
}, (req,res,next) => {
    console.log("Third Route Handler");
    res.send("Hello world!!!!");
    next();
}
);
// To handle POST request 
app.post("/test", (req,res) => {
    //save data to DB
    res.send("Data saved successfully to the DB");
})
app.get("/test", (req,res)=> {
    // get data from DB
    res.send("Successfully send data to DB");
})
app.delete("/test", (req,res)=> {
    // to delete data from DB
    res.send("Successfully deleted data from DB");
})
app.patch("/test", (req,res) => {
    res.send("Successfully patched data in DB");
})
// To handle incoming request
app.use("/test", (req,res)=> {
    res.send("Hello from the server!!!")
});
app.use("/hello", (req,res)=> {
    res.send("You are requesting hello!!!");
});
app.use("/hello1", (req,res)=>  {
    res.send("You are requesting hello1!!!");
});
// To listen to the requests
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
});