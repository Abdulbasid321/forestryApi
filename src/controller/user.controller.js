import User from "../models/User";
import Department from "../model/Department";

export const registerUser = async (req, res) => {
  try {
    const { name, email, departmentId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const newUser = await User.create({
      name,
      email,
      department: department._id,
      currentLevel: "100",
      completedLevels: [],
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const promoteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const nextLevel = parseInt(user.currentLevel) + 100;

    user.completedLevels.push(user.currentLevel);
    user.currentLevel = nextLevel.toString();
    await user.save();

    res.json({ message: `User promoted to ${nextLevel} level`, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to promote user" });
  }
};
