//const mongojs = require("mongojs")
const {Database} = require("../../db/index")
let database = new Database()
let collectionName = "admins"


class AdminManager{
    
     async createAdmin(document){
        try {
            let data = await database.createDocument(collectionName,document)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw data
        }
     }

     async getAllAdmins(){
        try {
            let data = await database.getAllDocuments(collectionName)
            database.close()
            return data
        }catch(error){
            database.close()
            throw data
        }
    }

    async totalAdmins(){
        try {
            let data = await database.totalDocuments(collectionName)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw data
        }
    }

    async getAdminsWithSkipandLimitandField(skip,limit,field={}){
        try {
            let data = await database.getDocumentsWithSkipandLimitandFields(collectionName,skip,limit,field)
            database.close()
            return data
        } catch (error) {
            database.close()
            throw data
        }
    }
}

module.exports = {AdminManager}