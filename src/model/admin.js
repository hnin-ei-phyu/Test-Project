const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "admins"

class Admin{

    adminId
    constructor(adminId){
        this.adminId = adminId
    }

    async getAdminInfo(){
        let queryField = {_id:mongojs.ObjectId(this.adminId)}

        try {
            let data = await database.getOneDocument(collectionName,queryField)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async updateAdminInfo(document){
        let queryField = {_id:mongojs.ObjectId(this.adminId)}
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

    async deleteAdmin(){
        let queryField= {_id:mongojs.ObjectId(this.adminId)}
        
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
module.exports = {Admin}