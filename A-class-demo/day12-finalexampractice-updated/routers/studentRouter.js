const express = require('express');

const studentController = require('../controllers/studentController');


const router = express.Router();

router.get('/:id', studentController.getStudentById);
router.post('/', studentController.save);
router.get("/:studentId/courses/:courseId", studentController.getCourse3);


module.exports = router;