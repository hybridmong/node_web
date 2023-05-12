const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const Mongoose = require("mongoose")
const SalesSchema = new Mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  staff: {
    type: String,
    required: true,
  },
  created_at: 
  { type: Date, 
    required: true, 
    default: Date.now }
})

const sales = Mongoose.model("sales", SalesSchema)
module.exports = sales