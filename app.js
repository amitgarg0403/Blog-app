// Require Package & Module
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000;
const Schema = mongoose.Schema;
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Static Folder 'Public
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(console.log("MongoDb Connected"))
  .catch((err) => {
    console.log(err);
  });

//Mongoose Schema
const blogSchema = new Schema(
  { title: String, category: String, description: String },
  { timestamps: true }
);

//Mongoose Mondel
const Blog = mongoose.model("Blog", blogSchema);


// Home Request
app.get("/", function (req, res) {
  res.render("Home",{Count:"" , countCat:""});
});

// Compose request
app.get("/compose", function (req, res) {
  res.render("Compose", {message: "Create New Post"});
});

app.post("/compose", function (req, res) {
  const post = new Blog({
    title: req.body.postTitle,
    category: req.body.category,
    description: req.body.postDes,
  });
  post.save();
  res.render("compose", {message: "Post Created Successfully"})
});

// Blog page Request
app.get("/blogs", async function (req, res) {
  let Post = await Blog.find();
  res.render("Blog",{ POST: Post});
});

app.post("/blogs/delete", (req,res)=>{
    let d = req.body.deleteItem;
    Blog.findByIdAndDelete(d)
    .then(console.log("Post Deleted"))
    .catch((err) =>{console.log(err)})
    res.redirect("/blogs")
})

// filter feature on Blog Page
app.post("/filter", function(req,res){
  let f = req.body.category;
  Blog.find({category: f})
  .then(filter =>{
    res.render("Blog", { POST:filter})
  })
  .catch((err)=>{console.log(err)})
})

//count post feature on Home page
app.post("/home/count", function (req, res) {
  let q = req.body.catCount;
    Blog.countDocuments({category:q})
    .then(result=>{res.render("Home",{Count:result , countCat:q})})
    .catch(err=>{console.log(err)})
});

// Listening Port
app.listen(PORT, function (req, res) {
  console.log("Server Running at " + PORT);
});


//commit on git hub first


//feature to be add next
//1. search button for post
//2. comment under post that open in another page
//3. edit post using put method 
//4. show more link that open post in new page full size