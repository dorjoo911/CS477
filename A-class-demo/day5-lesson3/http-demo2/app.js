const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        //display signup form
        fs.createReadStream(path.join(__dirname, 'signup.html'))
            .pipe(res);

    } else if (req.url === '/signup' && req.method === 'POST') {
        //save to file
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const str = Buffer.concat(body).toString();
            console.log(str);
            fs.writeFile('users.txt', str, (err) => {
                if (!err) {
                    res.end('save successfully');
                } else {
                    res.end('Try again ');
                }
            })
        });
    } else {
        res.end('others....');
    }

}).listen(3000);