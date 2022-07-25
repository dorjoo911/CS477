const http = require('http');
const querystring = require('querystring');

http.createServer((req, res)=> {
    console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);
   
    // const index = req.url.indexOf('?');
    // const querystirng = req.url.substring(index + 1);
    // let obj = {};
    // querystirng.split('&').forEach(pair => {
    //     const arr = pair.split('=');
    //     obj[arr[0]] = arr[1];
    // });
    // console.log(obj);

    
    const index = req.url.indexOf('?');
    const query = req.url.substring(index + 1);
   
    // console.log( querystring.parse(query));
    const obj = new URLSearchParams(query);
    console.log(obj.get('firstname'),  obj.get('lastname'));

    res.end('Hi');
}).listen(3000, ()=> console.log('3000.....'));