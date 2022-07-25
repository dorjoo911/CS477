/*
Create a npm project and install Express.js (Nodemon if you want)
Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”.
For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers.
Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
Customize your 404 page
Provide your own error handling */
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "users.html"));
});

app.post("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "product.html"));
});

app.get("/saved", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "saved.html"));
});

app.use("/mycss", express.static(path.join(__dirname)));

app.use((err, req, res, next) => {
  console.log(err);
  if ((err.code = "edit")) {
  }
  res.status(500).send(err.message);
});

app.listen(8080, () => {
  console.log(`Server running .... on 8080 .... !!!`);
});
