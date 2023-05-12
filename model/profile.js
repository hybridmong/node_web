const Mongoose = require("mongoose")
const profileSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  created_at: 
  { type: Date, 
    required: true, 
    default: Date.now }
})

const profile = Mongoose.model("profile", profileSchema)
module.exports = profile