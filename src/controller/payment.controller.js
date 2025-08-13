// import { Request, Response } from "express";
// import cloudinary from "../utils/cloudinary";
// import PaymentProof from "../models/PaymentProof";

// export const uploadPaymentProof = async (req, res) => {
//   try {
//     const { regNumber, amount, term } = req.body;
//     const file = req.file;

//     if (!file) return res.status(400).json({ error: "No file uploaded" });

//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         {
//           resource_type: "auto",
//           folder: "payment_proofs",
//           access_mode: "public",
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       ).end(file.buffer);
//     });

//     const upload = await PaymentProof.create({
//       regNumber,
//       amount,
//       term,
//       proofUrl: (result).secure_url,
//     });

//     res.status(201).json(upload);
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed", details: err });
//   }
// };
