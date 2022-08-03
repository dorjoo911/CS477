const Student = require("../models/studentModel");

exports.allStudent = async (req, res, next) => {
  res.status(200).json(await Student.find());
};

exports.getStudent = async (req, res, next) => {
  res.status(200).json(await Student.findById(req.params.id));
};

exports.saveStudent = async (req, res, next) => {
  res.status(201).json(await new Student(req.body).save());
};

exports.updateStudent = async (req, res, next) => {
  res
    .status(200)
    .json(await Student.findByIdAndUpdate(req.params.id, req.body));
};

exports.deleteStudent = async (req, res, next) => {
  res.status(200).json(await Student.findByIdAndDelete(req.params.id));
};
exports.getByCourseID = async (req, res, next) => {
  res.status(200).json(await Student.getByCourseID(req.params.courseId));
};
