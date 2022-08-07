const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
    studentId: String,
    firstname: String,
    lastname: String,
    courses: [{
        courseId: String,
        coursenama: String,
        semester: String,
        grade: Number
    }]
});

module.exports = mongoose.model('Student', studentSchema);