const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    //destructure req by url and method
    const { headers, url, method } = req;
    // tell content type as html
    res.setHeader("content-type", "text/html");
    // if url / read file from index.html while st:200 and data
    if (url === "/") {
      fs.readFile("./src/index.html", "utf8", (error, data) => {
        if (error) {
          res.statusCode = 500;
          res.end("<h1>Error!</h1>");
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else if (url === "/login") {
      // return to Login form html
      fs.readFile("./src/login.html", "utf8", (error, data) => {
        if (!error) {
          res.statusCode = 200;
          res.end(data);
        } else {
          res.statusCode = 400;
          res.end("<h1>Ooops something is wrong</h1>");
        }
      });
    } else if (url === "/logincheck" && method === "POST") {
      const body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        //save parsedBody into that file in userinfo.txt
        fs.writeFileSync("userinfo.txt", parsedBody);
        //get password from parsedBody string by split method index 2
        const password = parsedBody.split("=")[2].toLowerCase();
        const username = parsedBody.split("=")[1].toLowerCase().split("&")[0];

        if (password === "pass123" && username === "tom") {
          // if login successful
          res.statusCode = 302;
          res.setHeader("Location", "/home"); //this case:jump into home.html
        } else {
          // if login failed
          res.statusCode = 302;
          res.setHeader("Location", "/error"); //this case:jump into error.html
        }
        res.end();
      });
    } else if (url === "/home") {
      // After login jump into home page
      fs.readFile("./src/home.html", "utf8", (error, data) => {
        res.statusCode = 200;
        res.end(data);
      });
      // After login failed jump into error page
    } else if (url === "/error") {
      fs.readFile("./src/error.html", "utf8", (error, data) => {
        res.statusCode = 200;
        res.end(data);
      });
      // After login jump into home page
    } else {
      res.statusCode = 404;
      res.end("<h1>404 not found</h1>");
    }
  })
  .listen(6000, () => {
    console.log("http server running on port: 6000 ...");
  });
