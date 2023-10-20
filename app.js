// Require Package & Module
const express = require("express");


const app = express();
const PORT = 5000;


app.get("/", function(req,res){
    res.send("<h1>Hello World!</h1>")
})

// Listening Port
app.listen(PORT, function(req,res){
    console.log("Server Ruuning at " + PORT);
})