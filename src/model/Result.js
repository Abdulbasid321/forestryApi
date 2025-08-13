const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    regNumber: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", ResultSchema);
module.exports = Result;
