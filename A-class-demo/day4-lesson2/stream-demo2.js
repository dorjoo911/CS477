const fs = require('fs');
const path = require('path');

fs.createReadStream(path.join(__dirname, 'public', 'resources', 'card.jpg'))
    .pipe(fs.createWriteStream(path.join(__dirname, 'result.jpg')));