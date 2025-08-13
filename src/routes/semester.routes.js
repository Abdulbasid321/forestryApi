const express = require('express');
const router = express.Router();
const semesterController = require('../controller/semester.controller');

// POST /api/semesters
router.post('/', semesterController.createSemester);

// GET /api/semesters/:departmentId
router.get('/:departmentId', semesterController.getSemestersByDepartment);

module.exports = router;
