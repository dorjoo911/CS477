const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "hello.txt"), "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(`${data}`);
    fs.writeFile(
      path.join(__dirname, "hello.txt"),
      data + "---------------",
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});
