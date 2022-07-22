const fs = require("fs");
const path = require("path");

//read file from path.join(__dirname, "greet.txt")
fs.readFile(
  path.join(__dirname, "greet.txt"), //C:\Users\mike\OneDrive\Desktop\CS-477 + greet.txt
  { encoding: "utf8" },
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
