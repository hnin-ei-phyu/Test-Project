const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "users"
const jwt = require('jsonwebtoken')
class UserManager{

    async createUsers(){
        try {
            let data = await database.createDocument(collectionName,document)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }


    async getAllUsers(){
        try {
            let data = await database.getAllDocuments(collectionName)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async totalUsers(){
        try {
            let data = await database.totalDocuments(collectionName)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async getUsersWithSkipAndLimitAndFields(){
        try {
            let data = await database.getDocumentsWithSkipandLimitandFields(collectionName,skip,limit)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

    async login (username,password){
        try {
            let data = await database.getOneDocument(collectionName,{username,password})
            if(!data) {
                return 404
            }
            let token = jwt.sign({_id:mongojs.ObjectId(data._id)},'token')
            data.token = token

            database.close()
            return data
        } catch (error) {
            database.close()
            throw error
        }
    }

}

module.exports = {UserManager}