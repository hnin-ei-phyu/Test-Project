const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "items"

class Item{

    itemId
    constructor(itemid){
        this.itemId = itemId
    }

    async getOneItem(){
        let queryField = {_id:mongojs.ObjectId(this.itemId)}

        try {
            let data = await database.getOneDocument(collectionName,queryField)
            return data

        } catch (error) {
            throw error
        }
    }

    async updateItem(document){
        let queryField = {_id:mongojs.ObjectId(this.itemId)}
        let updateField = {$set: document}

        try {
            let data = await database.updateDocument(collectionName,queryField,updateField)
            return data

        } catch (error) {
            throw error
        }
    }

    async deleteItem(){
        let queryField = {_id:mongojs.ObjectId(this.itemId)}
        
        try {
            let data = await database.deleteDocument(collectionName,queryField)
            return data 

        } catch (error) {
            throw error
        }
    }
}
module.exports = {Item}