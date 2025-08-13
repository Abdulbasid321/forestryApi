const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const {getCurrentAdminProfile} = require('../controller/admin.controller');
const {verifyAdminToken} = require('../middleware/middleware');
const Student = require('../model/Student');
const Department = require('../model/Department');
const Course = require('../model/Course');
const Announcement = require('../model/Announcement');



router.get("/stats", async (req, res) => {
  try {
    const [totalUsers, totalDepartments, totalCourses, totalAnnouncements] =
      await Promise.all([
        Student.countDocuments(),
        Department.countDocuments(),
        Course.countDocuments(),
        Announcement.countDocuments()
      ]);

    res.json({
      totalUsers,
      totalDepartments,
      totalCourses,
      totalAnnouncements
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats", details: err.message });
  }
});


// Admin login route
router.post('/login', adminController.adminLogin);

// Create a new admin route
router.post('/create', adminController.createAdmin);

// Get all admins route
router.get('/all', adminController.getAllAdmins);

router.get('/profile', verifyAdminToken, getCurrentAdminProfile);

// Get a specific admin by ID
router.get('/:adminId', adminController.getAdmin);

// Update an admin by ID
router.put('/:adminId', adminController.updateAdmin);

// Delete an admin by ID
router.delete('/:adminId', adminController.deleteAdmin);

// router.get("/stats", async (req, res) => {
//   try {
//     console.log("Fetching stats...");

//     const totalUsers = await Student.countDocuments();
//     const totalDepartments = await Department.countDocuments();
//     const totalCourses = await Course.countDocuments();
//     const totalAnnouncements = await Announcement.countDocuments();

//     console.log("Stats fetched:", {
//       totalUsers,
//       totalDepartments,
//       totalCourses,
//       totalAnnouncements,
//     });

//     res.json({
//       totalUsers,
//       totalDepartments,
//       totalCourses,
//       totalAnnouncements,
//     });
//   } catch (err) {
//     console.error("Error in /admin/stats:", err);
//     res.status(500).json({ error: "Failed to fetch stats", details: err.message });
//   }
// });

module.exports = router;
