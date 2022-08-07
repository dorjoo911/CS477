const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
    studentId: String,
    firstname: String,
    lastname: String,
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

module.exports = mongoose.model('Student', studentSchema);