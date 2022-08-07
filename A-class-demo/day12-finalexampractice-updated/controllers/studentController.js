const Student = require('../models/student');
const Course = require('../models/course');

exports.getStudentById = async(req, res, next) => {
    const student = await Student.findOne({ studentId: req.params.id }).populate('courses');
    res.status(200).json(student);
};

exports.save = async(req, res, next) => {
    const student = await Student.findOne({ studentId: req.body.studentId });

    const result = await Course.insertMany(req.body.courses);
    req.body.courses = result.map(c => c._id);

    if (student) {
        const result = await Student.updateOne({ studentId: req.body.studentId }, req.body);
        res.json(result);
    } else {
        const result = await new Student(req.body).save();
        res.status(201).json(result);
    }
}

exports.getCourse = async(req, res, next) => {
    let result = await Student.findOne({ studentId: req.params.studentId }).populate('courses');
    result = result.courses.find(c => c.courseId === req.params.courseId);
    res.json(result);
}

exports.getCourse2 = async(req, res, next) => {
    let result = await Student.aggregate([{
        $match: {
            studentId: '610001'
        }
    }, {
        $lookup: {
            from: 'courses',
            localField: 'courses',
            foreignField: '_id',
            as: 'result'
        }
    }, {
        $project: {
            _id: 0,
            result: 1
        }
    }]);
    res.json(result.find(c => c.courseId === req.params.courseId));
}

exports.getCourse3 = async(req, res, next) => {
    const courses = await Course.find({ courseId: req.params.courseId });
    const coursesInStudent = await Student.findOne({ studentId: req.params.studentId }).select({ _id: 0, courses: 1 });
    res.json(courses.find(c => coursesInStudent.courses.includes(c._id)));
}