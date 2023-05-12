const express = require("express")
const router = express.Router()

//imported register function
const { register, login, forgot, verify, inventory, sales} = require("./auth")
router.route("/register").post(register)
//imported login function
router.route("/login").get(login)
router.route("/forgot").post(forgot)
router.route("/verify").post(verify)
router.route("/inventory").post(inventory)
router.route("/sales").post(sales)
module.exports = router

