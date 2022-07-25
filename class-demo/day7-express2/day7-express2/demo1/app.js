const express = require('express');
const app = express();

//  /user/*
// /*
app.use('/user', (req, res, next) => {
    res.send('inside app.use...');
});

//  /product
app.all('/product', (req, res) => {
    res.send('insde app.all----');
})




// app.get('/', (req, res, next) => {
//     console.log('1....');
//     next('566');
// }, (req, res, next) => {
//     console.log('2....');
//     next();
// },
// (req, res, next) => {
//     console.log('3....');
//     next();
// });

// app.get('/', (req, res) => {
//     console.log('4....');
//     res.send('Hi');
// });

// app.get('/search', (req, res, next) => {
//     console.log(req.query);
//     res.send(JSON.stringify(req.query));
// });

// app.get('/users/:userid/posts/:postid', (req, res, next) => {
//     console.log(req.params);
//     res.send(`UserId: ${req.params.uid}, postId:: ${req.params.pid}`);
// });


app.use((err, req, res, next) => {
    res.status(500).send('Whooops!!!!');
    // res.send( 'Whoops');
});


app.listen(3000);