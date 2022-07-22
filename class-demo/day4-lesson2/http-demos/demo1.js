const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req.method);
    res.end('Hello');
});

server.listen(3000);