const Student = require('../models/student');


exports.getStudentById = async(req, res, next) => {
    const student = await Student.findOne({ studentId: req.params.id });
    res.status(200).json(student);
};

exports.save = async(req, res, next) => {
    const student = await Student.findOne({ studentId: req.body.studentId });

    if (student) {
        const result = await Student.updateOne({ studentId: req.body.studentId }, req.body);
        res.json(result);
    } else {
        const result = await new Student(req.body).save();
        res.status(201).json(result);
    }
}

exports.getCourse = async(req, res, next) => {
    let result2 = await
    Student.find({
        courses: { $elemMatch: { courseId: req.params.courseId } },
        studentId: req.params.stuId
    }, { "courses.$": 1 });

    res.json(result2.courses[0]);
}