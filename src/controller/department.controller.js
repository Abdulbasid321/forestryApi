// const Department = require('../model/Department');

// exports.createDepartment = async (req, res) => {
//   try {
//     const { name, code } = req.body;

//     const department = await Department.create({ name, code });

//     res.status(201).json({
//       message: 'Department created successfully',
//       department
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllDepartments = async (req, res) => {
//   try {
//     const departments = await Department.find();
//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const Department = require('../model/Department');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    const department = await Department.create({ name, code });

    res.status(201).json({
      message: 'Department created successfully',
      department
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { name, code, semester } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, code, semester },
      { new: true, runValidators: true }
    );

    if (!department) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({
      message: 'Department updated successfully',
      department
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
