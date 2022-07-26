const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.get("/books", (req, res) => {
  // get all data inside books.txt
  fs.readFile(path.join(__dirname, "books.txt"), "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/books/topSellers", (req, res) => {
  // get all data inside topSeller.txt
  fs.readFile(path.join(__dirname, "topSeller.txt"), "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/users", (req, res) => {
  // get JSON object from url pram info
  const name1 = req.query.fname;
  const lname1 = req.query.lname;
  const responcebody = { name: name1, lastname: lname1, zip: 52556 };
  res.json(responcebody);
});

app.listen(3000, () => {
  console.log("..... .... server running on .... ....");
});
