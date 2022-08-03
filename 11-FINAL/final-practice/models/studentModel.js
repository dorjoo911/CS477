const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: Number,
  firstname: String,
  lastname: String,
  courses: [
    {
      courseId: String,
      coursename: String,
      semester: String,
      grade: Number,
    },
  ],
});

studentSchema.methods.getByCourseID = function (cid) {
  return this.find({
    courses: { $elemMatch: { courseId: cid } },
  });
};

module.exports = mongoose.model("Student", studentSchema);
