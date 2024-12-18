// import express js
const express = require("express");
// to create instance of express js application/server 
const app = express();
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
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});
