const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Encrypt password before saving
// adminSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next()
});


// Method to compare password for login
// adminSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };


adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });

  if (admin) {
      const auth = await bcrypt.compare(password, admin.password)
      if (auth) {
          return admin;
      }
      throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

module.exports = mongoose.model('Admin', adminSchema);
