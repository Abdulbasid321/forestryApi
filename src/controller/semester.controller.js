const Semester = require('../model/Semester');

exports.createSemester = async (req, res) => {
  try {
    const { name, level, departmentId } = req.body;

    const semester = await Semester.create({
      name,
      level,
      departmentId
    });

    res.status(201).json({
      message: 'Semester created successfully',
      semester
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSemestersByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const semesters = await Semester.find({ departmentId }).populate('departmentId', 'name code');

    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
