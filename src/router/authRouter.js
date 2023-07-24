const {AuthController} = require("../controller/authController")
const express = require("express")
const router = express.Router()
const authController = new AuthController()

router.get("/is-auth",authController.isAuthed)
router.get("/is-admin",authController.isAdmin)
router.get("/is-user",authController.isUser)
router.post("/register-admin",authController.registerAdmin)
router.post("/login-admin",authController.loginAdmin)
router.post("/register-user",authController.registerUser)
router.post("/login-user",authController.loginUser)

module.exports = router