const {AdminManagerController} = require("../controller/adminManagerController")
const express = require("express")
const router = express.Router()
const adminManagerController = new AdminManagerController()

router.post("/create-admin",adminManagerController.createAdmin)
router.get("/all-admins",adminManagerController.getAllAdmins)
router.get("/total-admins",adminManagerController.totalAdmins)
router.get("/admins-with-limit",adminManagerController.getAdminWithSkipAndLimitAndFields)

module.exports = router