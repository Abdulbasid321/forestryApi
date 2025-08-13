const mongoose = require('mongoose');

const paymentProofSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  fileType: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PaymentProof', paymentProofSchema);
