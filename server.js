const express = require("express")
const app = express()
const PORT = 5001


const connectDB = require("./config/db")
//Connecting the Database
connectDB();

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})


app.use(express.json())

app.use("/api/auth", require("./authcontrol/route"))