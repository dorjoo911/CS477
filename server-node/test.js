const fs = require("fs");
const request = require("request");
/* request("url", function (error, responce, body) {
  fs.writeFileSync("./fileName.json", body);
}); */

request(
  "https://nodejs.org/dist/latest-v16.x/docs/api/path.json",
  (error, responce, body) => {
    // console.log(body);
    fs.writeFileSync("./jsonExample.json", body);
  }
);
