const {UserManagerController} = require("../controller/userManagerController")
const express = require("express")
const router = express.Router()
const userManagerController = new UserManagerController()

router.post("/create-user",userManagerController.createUser)
router.get("/all-users",userManagerController.getAllUsers)
router.get("/total-users",userManagerController.totalUsers)
router.get("/users-with-limit",userManagerController.getUserWithLimit)
//router.post("/login-user",userManagerController.l)

module.exports = router