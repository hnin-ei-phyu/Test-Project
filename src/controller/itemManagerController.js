const {ItemManager} = require("../model/itemManager")

class ItemManagerController{

    async createItem(req,res){
        
        req.checkBody("photo", "photo should not be empty").notEmpty()
        req.checkBody("name", "name should not be empty").notEmpty()
        req.checkBody("price", "price should not be empty").isInt()
        req.checkBody("point", "point should not be empty").isInt()
        req.body.createdAt = new Date()
        
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let itemManager = new ItemManager()
            let data = await itemManager.createItem(req.body)
            res.status(200).json(data)
            
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }     
    }

    async getAllItems(req,res){
        try {
            let itemManager = new ItemManager()
            let data = await itemManager.getAllItems()
            if(!data){
                res.status(404).json({msg: "Items not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async getItemsWithLimit(req,res){
        req.checkQuery("skip", "skip should not be empty").isInt()
        req.checkQuery("limit", "limit should not be empty").isInt()

        let skip = parseInt(req.query.skip)
        let limit = parseInt(req.query.limit)

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        
        try {
            let itemManager = new ItemManager()
            let data = await itemManager.getItemsWithLimit()
            if(!data){
                res.status(404).json({msg: "Items not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async totalItems(req,res){
        try {
            let itemManager = new ItemManager()
            let data = await itemManager.totalItems()
            if(!data){
                res.status(404).json({msg: "Items not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }
}

module.exports = {ItemManagerController}