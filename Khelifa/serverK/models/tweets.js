const mongoose = require('mongoose');

const { Schema } = mongoose;

const tweetSchema = new Schema({
    username: String,
    date: {type: 'Date', default: Date.now },
    comment: String,
}, {
    versionKey: false
});

module.exports = mongoose.model('tweets', tweetSchema);