const express = require("express")
const router = express.Router()
const {ItemController} = require("../controller/itemController")
const itemController = new ItemController()

router.get("/get-OneItem/:id",itemController.getOneItem)
router.put("/update-item/:id",itemController.updateItem)
router.delete("/delete-item/:id",itemController.deleteItem)

module.exports = router