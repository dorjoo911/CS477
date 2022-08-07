const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/userRouter');
const tweetRouter = require('./routers/tweetRouter');
const authRouter = require('./routers/authRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/tweetS', tweetRouter);

app.use((err, req, res, next)=> {
    res.status(500).json(new Response(true, err.message, null));
});

mongoose.connect('mongodb://127.0.0.1:27017/tweeter')
    .then(() => {
        app.listen(3000, () => console.log('listening to 3000...'));
    });
