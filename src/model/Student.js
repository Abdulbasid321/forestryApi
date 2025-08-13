// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String },
//   departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },

//   // 🎓 Academic tracking
//   semester: { type: String, default: '1st' },        // '1st' or '2nd'
//   currentLevel: { type: String, default: '100' },     // e.g. '100', '200'
//   completedLevels: [{ type: String }]                 // optional tracking
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);


const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  regNumber: { type: String, required: true, unique: true }, // ✅ NEW
  address: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },

  // 🎓 Academic tracking
  currentLevel: {
    type: String,
    enum: ['100', '200', '300', '400'],
    default: '100',
  },
  semester: {
    type: String,
    enum: ['1st', '2nd'],
    default: '1st',
  },
  completedLevels: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
}, { timestamps: true });


module.exports = mongoose.model('Student', studentSchema);
