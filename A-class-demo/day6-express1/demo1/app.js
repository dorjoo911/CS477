const e = require('express');
const express = require('express');
const path = require('path');
// 1. instantiation
const app = express();

// 2. configuration - congfigure how express behave in different parts.
app.set('port', process.env.PORT || 3000);
console.log(process.env.NODE_ENV);

// app.enable('case sensitive routing');
// app.set('case sensitive routing', true);


//3. middlewares
//express.urlencoded() => (req, res, next) =>{}

app.use(express.urlencoded());

// express.myownurlencoded = function(){
//     return ((req, res, next) => {
//         if (req.method === 'POST') {
//             const obj = [];
//             req.on('data', (chunk) => {
//                 obj.push(chunk);
//             });
//             req.on('end', () => {
//                 let str = Buffer.concat(obj).toString();
//                 let body = {};
//                 str.split('&').forEach(pair => {
//                     let temp = pair.split('=');
//                     body[temp[0]] = temp[1];
//                 });
//                 req.body = body;
//                 next();
//             });
//         } else {
//             next();
//         }
    
//     });
// }

// app.use(express.myownurlencoded());

app.use('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.use('/processLogin', (req, res, next) => {
    console.log(req.body);
    if(req.body.username === 'admin' && req.body.password=== '123') {
        res.redirect('/user?username='+ req.body.username);       
    } else{
        res.redirect('/login');
    }
});

app.use((req, res, next) => {
    if (req.query.username) {
        req.greeting = 'Hi....';
        req.username = req.query.username;
        next();
    } else {
        res.redirect('/login');
    }
});

app.use('/user', (req, res, next) => {
    console.log('5.....');
    console.log(req.greeting);
    res.end(`${req.greeting} ${req.username}`);
});






//7. bootup
app.listen(app.get('port'), () => console.log(`${app.get('port')}`));

