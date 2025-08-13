const Employee = require('../model/Employee');      // adjust the path
const Department = require('../model/Department');  // adjust the path
const Leave = require('../model/Leave');            // adjust the path

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'pending' });

    res.json({
      totalEmployees,
      totalDepartments,
      pendingLeaves
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
