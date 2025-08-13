const express = require('express');
// import { getLecturers, createLecturer } from '../controller/teacher.controller';
const lecturerController = require('../controller/lecturer.controller');
const router = express.Router();

router.get('/', lecturerController.getLecturers);
router.post('/', lecturerController.createLecturer); // Optional: if you want to add lecturers

module.exports = router;
