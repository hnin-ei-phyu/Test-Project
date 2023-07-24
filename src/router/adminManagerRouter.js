const {AdminManagerController} = require("../controller/adminManagerController")
const express = require("express")
const router = express.Router()
const adminManagerController = new AdminManagerController()
const {AuthController} = require("../controller/authController")
const authController = new AuthController()

router.post("/create-admin",authController.isAuthed,adminManagerController.createAdmin)
router.get("/all-admins",adminManagerController.getAllAdmins)
router.get("/total-admins",adminManagerController.totalAdmins)
router.get("/admins-with-limit",adminManagerController.getAdminWithSkipAndLimitAndFields)

module.exports = router