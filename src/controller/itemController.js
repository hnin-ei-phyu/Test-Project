const {Item} = require("../model/item")

class ItemController{

    async getOneItem(req,res){
        req.checkParams("id", "id must be MongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let item = new Item()
            let data = await item.getOneItem()
            if(!data){
                res.status(404).json({msg: "Items not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async updateItem(req,res){
        req.checkParams("id", "id must be MongoId").isMongoId()
        req.checkBody("photo", "photo should not be empty").notEmpty()
        req.checkBody("name", "name should not be empty").notEmpty()
        req.checkBody("price", "price should not be empty").isInt()
        req.checkBody("point", "point should not be empty").isInt()
        req.body.UpdatedAt = new Date()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let item = new Item()
            let data = await item.updateItem(req.body)
            if(!data){
                res.status(404).json({msg: "Item not found"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async deleteItem(req,res){
        req.checkParams("id", "id must be MongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let item = new Item()
            let data = await item.deleteItem()
            if(!data){
                res.status(404).json({msg: "Item not found"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }
}

module.exports = {ItemController}