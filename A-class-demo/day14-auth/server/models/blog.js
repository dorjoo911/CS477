const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String,
    body: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Blog', blogSchema);

