const https = require('https');
const fs = require('fs');


const server = https.createServer({
    key: fs.readFileSync('privateKey.key'),
    cert: fs.readFileSync('certificate.crt')
});

server.on('request', (req, res)=> {
    res.end('Hi');
}).listen(8443, () => console.log('8443....') );