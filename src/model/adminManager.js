//const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "admins"


class AdminManager{
    
     async createAdmin(document){
        try {
            let data = await database.createDocument(collectionName,document)
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