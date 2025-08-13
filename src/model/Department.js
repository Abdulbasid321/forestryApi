// const mongoose = require('mongoose');

// const departmentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   semesters: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Semester'
//   }]
// }, { timestamps: true });

// module.exports = mongoose.model('Department', departmentSchema);

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentSchema);
