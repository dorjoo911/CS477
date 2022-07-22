/*Create a web server that's going to send a response of big image 
(bigger then 3MB) to any client that sends a request to your 
specified server:port. Use the best way for performance. (Try to 
solve this in many different ways and inspect the loading time in the
browser and send many requests to see the performance differences) */
const http = require("http");
const fs = require("fs");
// const path = require("path");
http
  .createServer((req, res) => {
    res.end(fs.readFileSync("card.jpg"));
  })
  .listen(3000);
