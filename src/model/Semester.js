const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, // e.g. "First Semester", "Second Semester"

  level: {
    type: String,
    required: true
  }, // e.g. "100", "200", "300"

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },

  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Semester', semesterSchema);
