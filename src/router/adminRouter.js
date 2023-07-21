const {AdminController} = require("../controller/adminController")
const express = require("express")
const router = express.Router()
const adminController = new AdminController()

router.get("/get-admin/:id",adminController.getOneAdmin)
router.put("/update-admin/:id", adminController.updateAdmin)
router.delete("/delete-admin/:id",adminController.deleteAdmin)

module.exports = router