// Require Package & Module
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
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
    title: _.upperFirst(req.body.postTitle),
    category: req.body.category,
    description: _.upperFirst(req.body.postDes)
  });
  post.save();
  console.log("Post Created!")
  res.render("compose", {message: "Post Created Successfully"})
});

// Blog page Request
app.get("/blogs", async function (req, res) {
  let Post = await Blog.find();
  res.render("Blog",{ POST: Post});
});

app.post("/blogs/find", (req,res)=>{
  let q= _.upperFirst(req.body.findItem);
  console.log(q)
  Blog.find({title:q})
  .then(result =>{res.render("Blog",{ POST: result})})
  .catch((err)=>{console.log(err)})
 
})


app.post("/blogs/delete", (req,res)=>{
    let d = req.body.deleteItem;
    Blog.findByIdAndDelete(d)
    .then(console.log("Post Deleted!"))
    .catch((err) =>{console.log(err)})
    res.redirect("/blogs")
})

// filter + sort feature on Blog Page
app.post("/filter", function(req,res){
  let f = req.body.category;
  let s = req.body.sort;
  console.log(f,s);

  if(f!=="Filter" && s!=="Sort"){
    console.log("Both !Filter !sort block")
    Blog.find({category: f}).sort({title:s})
    .then(result =>{res.render("Blog", { POST:result})})
    .catch((err)=>{console.log(err)})

  }else if(f!=="Filter" || s!=="Sort")
  {
    if(f!=="Filter"){
      console.log("!Filter block");
      Blog.find({category: f})
      .then(filter =>{res.render("Blog", { POST:filter})})
      .catch((err)=>{console.log(err)})
    }else{
      console.log("!sort block");
      Blog.find({}).sort({title:s})
      .then(sort =>{res.render("Blog", { POST:sort})})
      .catch((err)=>{console.log(err)})
    }
  }else{
    console.log("Filter + Sort Block");
    res.redirect("/blogs")
    }
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
//1. search button for post DONE
//2. comment under post that open in another page
//3. edit post using put method 
//4. show more link that open post in new page full size
//5. sort feature in blog DONE

