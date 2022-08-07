const express = require('express');

const studentController = require('../controllers/studentController');


const router = express.Router();

router.get('/:id', studentController.getStudentById);
router.post('/', studentController.save);
router.get("/:stuId/courses/:courseId", studentController.getCourse);


module.exports = router;