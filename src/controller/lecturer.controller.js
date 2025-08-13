const Lecturer = require('../model/Teacher');

exports.getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json(lecturers);
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({ message: 'Server error while fetching lecturers' });
  }
};

exports.createLecturer = async (req, res) => {
  try {
    const { name, department, email, phone } = req.body;

    const lecturer = new Lecturer({ name, department, email, phone });
    await lecturer.save();

    res.status(201).json(lecturer);
  } catch (error) {
    console.error('Error creating lecturer:', error);
    res.status(500).json({ message: 'Server error while creating lecturer' });
  }
};
