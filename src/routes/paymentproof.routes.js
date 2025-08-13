const express = require('express');
const router = express.Router();
const multer = require('multer');
const PaymentProof = require('../model/PaymentProof');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const upload = multer({ storage }); 

// Admin: Get all payments

// 2️⃣ Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  const { regNumber, session, term, paymentType } = req.body;
  const amount = Number(req.body.amount); 
  const file = req.file;

  console.log("Upload request body:", req.body);
  console.log("Uploaded file info:", file);

  if (!file || !regNumber || !session || !term || !paymentType || isNaN(amount)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  try {
    // 3️⃣ Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: `payment_proofs/${regNumber}_${Date.now()}`,
          access_mode: 'public',
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(file.buffer);
    });

    // 4️⃣ Save in DB
    const newProof = await PaymentProof.create({
      regNumber,
      session,
      term,
      amount,
      paymentType,
      fileUrl: result.secure_url,
      fileName: file.originalname,
      fileType: file.mimetype,
    });

    console.log("Payment proof saved:", newProof);
    res.status(201).json(newProof);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const proofs = await PaymentProof.find().sort({ uploadedAt: -1 });
    res.json(proofs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student: Get payments by regNumber
router.get('/student/:regNumber', async (req, res) => {
  try {
    const { regNumber } = req.params;
    const proofs = await PaymentProof.find({ regNumber });
    res.json(proofs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update status (verify/reject)
// PUT /payments/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // expected: 'approved' or 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedPayment = await PaymentProof.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
