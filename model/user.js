const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  newPassword: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

const User = Mongoose.model("user", UserSchema)
module.exports = User