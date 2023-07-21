const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "items"

class ItemManager{

    async getAllItems(){
        try {
            let data = await database.getAllDocuments(collectionName)
            return data

        } catch (error) {
            throw error
        }
    }

    async getItemsWithLimit(skip,limit,field={}){
        try {
            let data = await database.getDocumentsWithSkipandLimitandFields(collectionName,skip,limit,field)
            return data

        } catch (error) {
            throw error
        }
    }

    async totalItems(){
        try {
            let data = await database.totalDocuments(collectionName)
            return data

        } catch (error) {
            throw error
        }
    }
}

module.exports = {ItemManager}