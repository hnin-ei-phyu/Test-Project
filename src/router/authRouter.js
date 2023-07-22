const {AuthController} = require("../controller/authController")
const express = require("express")
const router = express.Router()
const authController = new AuthController()

router.get("/is-auth",authController.isAuthed)
router.get("/is-admin",authController.isAdmin)
router.get("/is-user",authController.isUser)

module.exports = router