const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname)));
app.use('/mycss', express.static(path.join(__dirname)));

app.use('/user', userRouter);

app.use('/product', productRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
});

app.use((err, req, res, next) => {
    console.log(err);
    if(err.code = 'edit') {
        
    }
    res.status(500).send(err.message);
});


app.listen(3000);


