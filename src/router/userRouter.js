const {UserController} = require("../controller/userController")
const express = require("express")
const router = express.Router()
const userController = new  UserController()

router.get("/get-one-user/:id",userController.getOneUser)
router.put("/update-user/:id",userController.updateUser)
router.delete("/delete-user/:id",userController.deleteUser)

module.exports = router