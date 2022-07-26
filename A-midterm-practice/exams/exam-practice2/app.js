const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.post("/greet", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "greet.html"), (err, data) => {
    if (err) {
      next(err);
    } else {
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        const str = Buffer.concat(body).toString();
        let name = str.split("&")[0].split("=")[1];
        res.send(`<h1>Welcome ${name}</h1>`);
        res.send(`<a href="/add-product.html">add product</a>`);
      });
    }
  });
  //   next();
});

// app.post("/add-product", (req, res, next) => {
//   fs.readFile(
//     path.join(__dirname, "views", "add-product.html"),
//     (err, data) => {
//       if (err) {
//         next(err);
//       } else {
//       }
//     }
//   );
// });

app.use((err, req, res, next) => {
  res.status(404).send("<h1>something is wrong !!!</h1>");
});
app.listen(4000, () => {
  console.log("server runs .........................................");
});
