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
            throw 400
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let admin = await database.getOneDocument(this.adminCollectionName,queryField)
            if(admin) return admin

        } catch (error) {

            throw 500
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let user = await database.getOneDocument(this.userCollectionName,queryField)
            if(!user) throw 401
            return user

        } catch (error) {
            throw error
        }
    }

    async isAdmin(token){

        let decodedToken
        try {
            decodedToken = jwt.verify(token,this.tokenKey)
        } catch (error) {

            throw 400
        }

        try {
            let queryField = {_id:mongojs.ObjectId(decodedToken._id)}
            let admin = await database.getOneDocument(this.adminCollectionName,queryField)
            database.close()
            if(!admin) throw 401
            return admin

        } catch (error) {

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
            if(!user) throw 401
            return user

        } catch (error) {
            throw error
        }
    }

    async registerAdmin(document){
        try {
            let data = await database.createDocument(this.adminCollectionName,document)

            data.token = jwt.sign({_id:data._id},this.tokenKey)
            return data

        } catch (error) {
            throw error
        }
    }

    async registerUser(document){
        try {
            let data = await database.createDocument(this.userCollectionName,document)

            data.token = jwt.sign({_id:data._id},this.tokenKey)
            return data

        } catch (error) {
            throw error
        }
    }

    async loginAdmin(email,password){
        let requiredField = {email,password}
        try {
            let data = await database.getOneDocument(this.adminCollectionName,requiredField)
            if(!data) throw 400
            else{
                data.token = jwt.sign({_id:data._id},this.tokenKey)
                return data
            }
        } catch (error) {
            throw error
        }
    }

    async loginUser(email,password){
        let requireField = {email,password}
        try {
            let data = await database.getOneDocument(this.userCollectionName,queryField)
            if(!data) throw 400
            else{
                data.token = jwt.sign({_id:data._id},this.tokenKey)
                return data
            }
        } catch (error) {
            throw error
        }
    }


}

module.exports = {Auth}