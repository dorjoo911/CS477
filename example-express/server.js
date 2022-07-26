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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "users.html"));
});

app.post("/product", (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const str = Buffer.concat(body).toString();
    let name = str.split("&")[0].split("=")[1];
    res.sendFile(path.join(__dirname, "views", "product.html"));
    res.send(`
    <h1>Welcome ${name}</h1>
    <form action="/saved" method="post">      
      <input type="text" id="pro1" name="product" /><br />      
      <input type="text" id="price" name="price" /><br /><br />
      <input type="submit" value="Submit" />
    </form>
    `);
  });
});

app.post("/saved", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "saved.html"));
  let html = fs.readFileSync(
    path.join(__dirname, "views", "saved.html"),
    "utf8"
  );
  res.send((html = html.replace("{mastehgtdh}", "Good job . !!!")));
});

app.use("/mycss", express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.status(404).send("<h1>something is wrong ...!!!</h1>");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(8080, () => {
  console.log(`Server running .... on 8080 .... !!!`);
});
