require("dotenv").config();
require("./config/db").connect();
const express = require("express");

const app = express()

app.use(express.json())

// Logic goes here

module.exports = app;
