// const person = require("./export");
// console.log(`from cached`);
// person.getName();
const fs = require("fs");
const path = require("path");
let name = "joe";

console.log(path.join("/", "users", name, "notes.text"));
//\users\joe\notes.text

let data = fs.readFileSync(
  path.join(__dirname, "greet.txt"),
  "utf-8",
  (err, data) => {
    console.log(data);
  }
);

let copy = fs.writeFile("hereToSave.txt", data, "utf-8", (err) => {
  if (err) throw err;
  console.log("Done");
});
