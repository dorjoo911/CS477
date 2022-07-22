const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {

    let html = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf-8'});
    html = html.replace('<p1>{message}</p1>', '<h1>This is a node.js server</h1>');
    res.end(html);

}).listen(3000, () => console.log('listening on 3000'));