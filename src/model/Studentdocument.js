const mongoose = require("mongoose");

const studentDocumentSchema = new mongoose.Schema({
  regNumber: { type: String, required: true },
  type: {
    type: String,
    enum: ["assignment", "project", "it-report"],
    required: true
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  publicId: { type: String },
//   uploadedAt: { type: Date, default: Date.now }
  uploadedAt: {
  type: Date,
  default: Date.now
}

});

module.exports = mongoose.model("StudentDocument", studentDocumentSchema);
