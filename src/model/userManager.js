const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "users"
const jwt = require('jsonwebtoken')

class UserManager{

    async createUsers(document){
        try {
            let data = await database.createDocument(collectionName,document)
            return data
        } catch (error) {
            throw error
        }
    }


    async getAllUsers(){
        try {
            let data = await database.getAllDocuments(collectionName)
            return data
        } catch (error) {
            throw error
        }
    }

    async totalUsers(){
        try {
            let data = await database.totalDocuments(collectionName)
            return data
        } catch (error) {
            throw error
        }
    }

    async getUsersWithSkipAndLimitAndFields(skip,limit,field = {}){
        try {
            let data = await database.getDocumentsWithSkipandLimitandFields(collectionName,skip,limit,field)
            return data
        } catch (error) {
            throw error
        }
    }

    async login (email,password){
        try {
            let data = await database.getOneDocument(collectionName,{email,password})
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

module.exports = {UserManager}