const mongojs = require("mongojs")
const jwt = require("jsonwebtoken")
const {Database} = require("../../db/index")
let database = new Database()

class Auth{

    tokenKey = "aaaaa11@!"
    userCollectionName = "users"
    adminCollectionName = "admins"

    async isAuthed(token){

        let decodedToken
        try {
            decodedToken = jwt.verify(token,this.tokenKey)
        } catch (error) {
            database.close()
            throw 400
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let admin = await database.getOneDocument(this.adminCollectionName,queryField)
            database.close()
            if(admin) return admin

        } catch (error) {
            database.close()
            throw 500
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let user = await database.getOneDocument(this.userCollectionName,queryField)
            database.close()
            if(!user) throw 401
            return user

        } catch (error) {
            database.close()
            throw error
        }
    }

    async isAdmin(token){

        let decodedToken
        try {
            decodedToken = jwt.verify(token,this.tokenKey)
        } catch (error) {
            database.close()
            throw 400
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let admin = await database.getOneDocument(this.adminCollectionName,queryField)
            database.close()
            if(!admin) throw 401
            return admin

        } catch (error) {
            database.close()
            throw error
        }
    }

    async isUser(token){

        let decodedToken
        try {
            decodedToken = jwt.verify(token,this.tokenKey)
        } catch (error) {
            database.close()
            throw 400
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let user = await database.getOneDocument(this.adminCollectionName,queryField)
            database.close()
            if(!user) throw 401
            return user

        } catch (error) {
            database.close()
            throw error
        }
    }

    async registerAdmin(document){
        try {
            let data = await database.createDocument(this.adminCollectionName,document)
            database.close()
            data.token = jwt.sign({_id:data._id},this.tokenKey)
            return data

        } catch (error) {
            database.close()
            throw 500
        }
    }

    async loginAdmin(email,password){
        let requiredField = {email,password}
        try {
            let data = await database.getAllDocuments(this.adminCollectionName,requiredField)
            database.close()
            if(!data) throw 400
            else{
                data.token = jwt.sign({_id:data._id},this.tokenKey)
                return data
            }
        } catch (error) {
            database.close()
            throw error
        }
    }


}

module.exports = {Auth}