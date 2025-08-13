// const mongoose = require('mongoose');

// const CourseSchema = new mongoose.Schema({
//   courseCode: { type: String, required: true, unique: true },   // e.g. CSC101
//   courseTitle: { type: String, required: true },                // instead of courseName
//   creditUnits: { type: Number, required: true },
//   lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer', required: true },
//   level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },  // instead of class
//   semester: { type: String, required: true },                   // e.g. First Semester
//   department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Course', CourseSchema);

// model/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseTitle: { type: String, required: true },
  creditUnits: { type: Number, required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer', required: true },
  level: { type: String, required: true }, // or ObjectId if it's a model
  semester: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
