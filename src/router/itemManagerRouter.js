const express = require("express")
const router = express.Router()
const {ItemManagerController} = require("../controller/itemManagerController")
const itemManagerController = new ItemManagerController()

router.post("/create-item",itemManagerController.createItem)
router.get("/all-items",itemManagerController.getAllItems)
router.get("/total-items",itemManagerController.totalItems)
router.get("/getItems-withLimit",itemManagerController.getItemsWithLimit)
router.get("/search-item",itemManagerController.searchItem)

module.exports = router