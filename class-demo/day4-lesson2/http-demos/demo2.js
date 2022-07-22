const http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const user = {
        firstname: 'John',
        lastname: 'Smith'
    }

    response.end(JSON.stringify(user));
}).listen(3000, () => {console.log('listening on 3000')});