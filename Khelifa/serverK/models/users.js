const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    email: String,
    photo: String,
    roll: String,
    following: [ ]
}, {
    versionKey: false
});

module.exports = mongoose.model('users', userSchema);