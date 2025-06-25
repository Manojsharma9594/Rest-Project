const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { json } = require("stream/consumers");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ express: true }));
// app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let posts = [
  {
    id: uuidv4(),
    username: "Manoj sharma",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "Ganesh sharma",
    content: "i love debugging",
  },
  {
    id: uuidv4(),
    username: "Raj yadav",
    content: "I am a mentor",
  },
];

app.get("/posts", (req, res) => {
  res.render("quora.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// adding into quora page

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// searching posts by it's id

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// editing the post content

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// deleting a post

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
