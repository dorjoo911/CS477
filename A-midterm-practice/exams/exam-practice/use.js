const express = require("express");
const app = express();

//GET http//localhost:3000/courses -What is output?

// /courses - not matches here but print in console
app.use("/", function (req, res, next) {
  console.log("there is a new request"); //there is a new request
  next(); //to next middleware
});

// /courses - matches here bcs: 'use' is all type of methods
app.use("/courses", function (req, res, next) {
  console.log("middleware"); //middleware -in console
  res.send("middleware"); //middleware -in browser it's responded ! "DONE"
});

// can't reach here bcs: previous app.use already responded res.send();
app.get("/courses", (req, res) => {
  console.log("course list");
  res.send("course list");
});

app.listen(3000, () => {
  console.log("server runs .....");
});
