const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');

// POST /api/departments
router.post('/', departmentController.createDepartment);

// GET /api/departments
router.get('/', departmentController.getAllDepartments);

// GET /api/departments/:id
router.get('/:id', departmentController.getDepartmentById);

// PUT /api/departments/:id
router.put('/:id', departmentController.updateDepartment);

// DELETE /api/departments/:id
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
