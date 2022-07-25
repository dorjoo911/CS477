const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { headers, url, method } = req;

    res.setHeader("content-type", "text/html");

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
      // Login form html butsaana
      fs.readFile("./src/login.html", "utf8", (error, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
      });
    } else if (url === "/logincheck" && method === "POST") {
      // login hiisnii daraa usreh heseg
      // DATA ==> CHUNK1 ==> CHUNK2 ===> CHUNK ==
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const password = parsedBody.split("=")[2];
        if (password === "saraa55") {
          // login successful
          res.statusCode = 302;
          res.setHeader("Location", "/home");
        } else {
          // login failed
          res.statusCode = 302;
          res.setHeader("Location", "/error");
        }

        res.end();
        // fs.writeFileSync("logininfo.txt", parsedBody);
        // res.write("Za huleej avlaa.");
        // res.end();
      });
    } else if (url === "/home") {
      // login hiisnii daraa usreh heseg
      fs.readFile("./src/home.html", "utf8", (error, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
      });
    } else if (url === "/error") {
      fs.readFile("./src/error.html", "utf8", (error, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
      });
      // login hiisnii daraa usreh heseg
    } else {
      res.statusCode = 404;
      res.write("<h1>404 not found</h1>");
      res.end();
    }
  })
  .listen(5000, () => {
    console.log("http сэрвэр 5000 порт дээр аслаа...");
  });
