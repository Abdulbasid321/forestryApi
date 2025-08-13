// const express = require('express');
// const router = express.Router();
// const courseController = require('../controller/course.controller');

// // Create a new course
// router.post('/', courseController.createCourse);

// // Get all courses
// router.get('/', courseController.getAllCourses);

// // Get a specific course by ID
// router.get('/:id', courseController.getCourseById);

// // Update a course by ID
// router.put('/:id', courseController.updateCourse);

// // Delete a course by ID
// router.delete('/:id', courseController.deleteCourse);

// module.exports = router;
const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');

router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/student/:studentId', courseController.getStudentCourses);

module.exports = router;
