const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "users"

class User{

    userId
    constructor(userId){
        this.userId = userId
    }

    async getUserInfo(){
        let queryField = {_id:mongojs.ObjectId(this.userId)}
        try {
            let data = await database.getOneDocument(collectionName,queryField)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async updateUserInfo(document){
        let queryField = {_id:mongojs.ObjectId(this.userId)}
        let updateField = {$set: document}

        try {
            let data = await database.updateDocument(collectionName,queryField,updateField)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async deleteUser(){
        let queryField = {_id:mongojs.ObjectId(this.userId)}

        try {
            let data = await database.deleteDocument(collectionName,queryField)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

}

module.exports = {User}