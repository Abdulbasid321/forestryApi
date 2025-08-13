// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  currentLevel: { type: String, default: "100" }, // 100, 200, 300, etc.
  completedLevels: [{ type: String }],
});

export default mongoose.model("User", userSchema);
