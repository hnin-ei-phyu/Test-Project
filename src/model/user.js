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
            return data
        } catch (error) {
            throw error
        }
    }

    async updateUserInfo(document){
        let queryField = {_id:mongojs.ObjectId(this.userId)}
        let updateField = {$set: document}

        try {
            let data = await database.updateDocument(collectionName,queryField,updateField)
            return data
        } catch (error) {
            throw error
        }
    }

    async deleteUser(){
        let queryField = {_id:mongojs.ObjectId(this.userId)}
        try {
            let data = await database.deleteDocument(collectionName,queryField)
            return data
        } catch (error) {
            throw error
        }
    }

    async login (email,password){
        let requireField = {email,passwrod}
        try {
            let data = await database.getOneDocument(collectionName,requireField)
            if(!data) {
                return 404
            }
            let token = jwt.sign({_id:mongojs.ObjectId(data._id)},'token')
            data.token = token

            return data

        } catch (error) {
            throw error
        }
    }


}

module.exports = {User}