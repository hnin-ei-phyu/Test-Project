//const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "admins"
const jwt = require("jsonwebtoken")


class AdminManager{
    

    async login(email,password){
        let requireField = {email,password}
        try {
            let data = await database.getOneDocument(collectionName,requireField)
            if(!data){
                return 404
            }
            let token = jwt.sign({_id:mongoId.ObjectId(data._id)},"token")
            data.token = token
            return data

        } catch (error) {
            throw error
        }
    }

     async createAdmin(document){
        try {
            let data = await database.createDocument(collectionName,document)

            
            let token = jwt.sign({_id:mongoId.ObjectId(data._id)},"token")
            data.token = token
            return data
        } catch (error) {
            throw error
        }
     }
   

     async getAllAdmins(){
        try {
            let data = await database.getAllDocuments(collectionName)
            return data
        }catch(error){
            throw error
        }
    }

    async totalAdmins(){
        try {
            let data = await database.totalDocuments(collectionName)
            return data
        } catch (error) {
            throw error
        }
    }

    async getAdminsWithSkipandLimitandField(skip,limit,field={}){
        try {
            let data = await database.getDocumentsWithSkipandLimitandFields(collectionName,skip,limit,field)
            return data
        } catch (error) {
            throw error
        }
    }

    
}

module.exports = {AdminManager}