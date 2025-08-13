const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password); 
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET_KEY || "poiuytrewqasdfghjklmnbvcxz", // You should store your secret key in an env variable
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    // const token = jwt.sign(
    //   {
    //     data: {
    //       id: admin.id,
    //       email: admin.email,
    //     },
    //   },
    //   process.env.JWT_SECRET || 'poiuytrewqasdfghjklmnbvcxz',
    //   { expiresIn: '24h' }
    // );
    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin login function
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the admin exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { adminId: admin._id, email: admin.email },
//       process.env.JWT_SECRET_KEY || "poiuytrewqasdfghjklmnbvcxz", // You should store your secret key in an env variable
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     // Return the token
//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Create an admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Create the admin
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific admin
exports.getAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const { name, email, password } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await admin.remove();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id; // assume you attach admin info in verifyAdminToken
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};