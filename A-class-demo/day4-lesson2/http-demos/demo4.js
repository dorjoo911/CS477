const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {

    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
        if(err){
            throw new Error(err.message);
        } else {
            res.write(data);
            res.end('123');
        }
    });
 
}).listen(3000, () => console.log('listening on 3000'));