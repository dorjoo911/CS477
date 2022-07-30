const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  //Home page: to Login
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.post("/product", (req, res, next) => {
  //Product page: add product
  res.sendFile(path.join(__dirname, "views", "product.html"));
});
app.post("/add-product", (req, res, next) => {
  //Saved page: add product
  res.sendFile(path.join(__dirname, "views", "add-product.html"));
});

app.use((err, req, res, next) => {
  //Error
  res.status(404).send("<h1>something is wrong !!!</h1>");
});

app.listen(4000, () => {
  console.log("server runs .........................................");
});
