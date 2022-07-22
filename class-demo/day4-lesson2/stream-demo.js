const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'public', 'resources', 'dog.webp'), 
{
    highWaterMark: 16 * 1024
});

const writable = fs.createWriteStream(path.join(__dirname, 'destination2.jpg'));

readableStream.on('data', function(chunk){
    console.log(chunk.length);
    writable.write(chunk);
});