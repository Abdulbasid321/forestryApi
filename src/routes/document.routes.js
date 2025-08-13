const express = require("express");
const router = express.Router();
const multer = require("multer");
const StudentDocument = require("../model/Studentdocument");
const cloudinary = require("../utils/cloudinaryConfig"); // adjust path as needed

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Student uploads document
router.post("/upload", upload.single("document"), async (req, res) => {
  try {
    const { regNumber, type } = req.body;
    const file = req.file;

    if (!file || !regNumber || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const safeFileName = regNumber.replace(/[^a-zA-Z0-9]/g, "");
    const cloudinaryUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: `student_docs/${safeFileName}_${file.originalname}`,
          access_mode: "public"
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(file.buffer);
    });

    const newDoc = new StudentDocument({
      regNumber,
      type,
      fileUrl: cloudinaryUpload.secure_url,
      fileName: file.originalname,
      fileType: file.mimetype,
      publicId: cloudinaryUpload.public_id
    });

    await newDoc.save();
    res.status(201).json({ message: "Upload successful", document: newDoc });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload document" });
  }
});

// Student fetch their own uploads
router.get("/my-documents/:regNumber", async (req, res) => {
  try {
    const { regNumber } = req.params;
    const documents = await StudentDocument.find({ regNumber });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Admin fetches all uploaded documents
router.get("/all", async (req, res) => {
  try {
    const allDocs = await StudentDocument.find().sort({ uploadedAt: -1 });
    res.json(allDocs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch uploaded documents" });
  }
});

router.get("/student/:regNumber", async (req, res) => {
  try {
    const { regNumber } = req.params;
    const documents = await StudentDocument.find({ regNumber });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

module.exports = router;
