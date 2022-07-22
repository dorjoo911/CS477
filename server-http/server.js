const http = require("http");

const server = http
  .createServer((req, res) => {
    const { headers, url, method } = req;
    res.setHeader("content-type", "text/html");

    if (url === "/") {
      res.write("<h1 style='color:green;'>WELCOME TO LOGIN PAGE</h1>");
      res.write(`<a href="/login">login here</a>`);
      res.end();
    } else if (url === "/login") {
      res.statusCode = 200;
      res.write(`<form action="/logincheck" method="POST">`);
      res.write(`<br><input type="text" name="email"/> `);
      res.write(`<br><input type="password" name="password"/> `);
      res.write(`<br><input type="submit" value="Login"/> `);
      res.write("</form>");
      res.end();
    } else if (url === "/logincheck" && method === "POST") {
      res.statusCode = 200;
      res.write("<h1 style='color:orange;'>U R Logging</h1>");
      res.write(`<br><h1>${method}</h1>`);
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        let parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        res.end(`<br><h1>${parsedBody}</h1>`);
      });
      //
    } else if (url === "/home") {
      // home page
    } else {
      res.statusCode = 404;
      res.write("<h1>404 not found</h1>");
      res.end();
    }
  })
  .listen(3456, () => {
    console.log("The server: 3456 is running ...");
  });
