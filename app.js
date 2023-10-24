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

// Get Method
app.get("/", function (req, res) {
  res.render("Home");
});

app.get("/compose", function (req, res) {
  res.render("Compose");
});

app.post("/compose", function (req, res) {
  const post = new Blog({
    title: req.body.postTitle,
    category: req.body.category,
    description: req.body.postDes,
  });
  post.save();
  res.redirect("/compose");
});

app.get("/blogs", async function (req, res) {
  let Post = await Blog.find();
  res.render("Blog",{ POST: Post});
});

app.post("/delete", (req,res)=>{
    let d = req.body.deleteItem;
    Blog.findByIdAndDelete(d)
    .then(console.log("Deleted Post"))
    .catch((err) =>{console.log(err)})
    res.redirect("/blogs")
})

// Listening Port
app.listen(PORT, function (req, res) {
  console.log("Server Ruuning at " + PORT);
});
