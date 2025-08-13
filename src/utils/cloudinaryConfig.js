const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dg1hrifnk",
  api_key:    "364159795788712",
  api_secret: "vW2G-Yt6aNJ35Kq2hXfQx7ZAj7o"
});

module.exports = cloudinary;
