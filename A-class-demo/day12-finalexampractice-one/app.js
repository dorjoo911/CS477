const express = require('express');
const mongoose = require('mongoose');

const studentRouter = require('./routers/studentRouter');

const app = express();
app.use(express.json());
//place your code below

app.use('/students', studentRouter);

mongoose.connect('mongodb://127.0.0.1:27017/final2')
    .then(() => {
        app.listen(3000, () => console.log('listening to 3000...'));
    });
