const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
    courseId: {type: String, required: true},
    courseName: String,
    semester: String,
    grade: Number
});

module.exports = mongoose.model('Course', courseSchema);