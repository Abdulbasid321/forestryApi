
const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinaryConfig");
const Result = require("../model/Result");
const authenticateStudent = require("../middleware/authStudent");

const router = Router();

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Upload Result

router.post("/uploadResult", upload.array("results", 10), async (req, res) => {
    try {
        let regNumbers = req.body.regNumbers;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        if (!regNumbers || regNumbers.length === 0) {
            return res.status(400).json({ error: "regNumbers are required" });
        }

        // Normalize regNumbers to array (handles case when it's a single string)
        if (!Array.isArray(regNumbers)) {
            regNumbers = [regNumbers];
        }

        if (regNumbers.length !== files.length) {
            return res.status(400).json({ error: "regNumbers count must match files count" });
        }

        const uploadedResults = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const regNumber = regNumbers[i];
            const safeFileName = regNumber.replace(/[^a-zA-Z0-9]/g, "");
const uploadResult = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    {
      resource_type: "auto",
      public_id: `student_results/${safeFileName}_${file.originalname}`,
      access_mode: "public", // ✅ This makes the URL viewable
      timeout: 60000,
    },
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }
  ).end(file.buffer);
});

            const newResult = new Result({
                regNumber,
                fileUrl: uploadResult.secure_url || uploadResult.url,
                publicId: uploadResult.public_id,
                fileName: file.originalname,
                fileType: file.mimetype,
            });

            await newResult.save();
            uploadedResults.push(newResult);
        }

        res.status(201).json({
            message: "Results uploaded successfully",
            results: uploadedResults,
        });

    } catch (err) {
        console.error("Bulk upload error:", err);
        res.status(500).json({ error: err.message });
    }
});

// router.get("/student/results/:regNumber", async (req, res) => {
//   try {
//     const { regNumber } = req.params;

//     if (!regNumber)
//       return res.status(400).json({ error: "Registration number is required" });

//     const result = await Result.find({ regNumber: regNumber.toUpperCase() });

//     if (!result)
//       return res.status(404).json({ message: "No result found for this reg number" });

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 📌 Delete Result by ID

router.get("/student/results/:regNumber", async (req, res) => {
    try {
        const { regNumber } = req.params;

        if (!regNumber)
            return res.status(400).json({ error: "Registration number is required" });

        const result = await Result.find({
            regNumber: { $regex: new RegExp(`^${regNumber}$`, "i") },
        });

        if (!result || result.length === 0)
            return res.status(404).json({ message: "No result found for this reg number" });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.delete("/deleteResult/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Result.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(result.publicId, {
            resource_type: "raw",
        });

        // Delete from MongoDB
        await Result.findByIdAndDelete(id);

        res.status(200).json({ message: "Result deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;

router.get("/downloadResult/:id", async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result || !result.filePath) {
            return res.status(404).json({ error: "File not found" });
        }

        const filePath = path.resolve(result.filePath);
        res.download(filePath, result.fileName); // fileName = original name to download
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
