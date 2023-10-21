// Require Package & Module
const express = require("express");


const app = express();
const PORT = 5000;

// Middlewares
app.set('view engine', "ejs")

//Static Folder 'Public
app.use(express.static("public"))

app.get("/", function(req,res){
    res.render("Home")
})

app.get('/compose', function(req,res){
    res.render('Compose')
})

app.get('/blogs', function(req,res){
    res.render('blog')
})

// Listening Port
app.listen(PORT, function(req,res){
    console.log("Server Ruuning at " + PORT);
})