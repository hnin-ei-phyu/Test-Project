const mongojs = require("mongojs")
//create database
const db = mongojs("taskManager")

class Database{
    async createDocument(collectionName, document){
        return new Promise((resolve,reject)=>{
            db[collectionName].insert(document,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async updateDocument(collectionName, queryField, updateField){
        let queryField = {_id:mongojs.ObjectID(documentId)}
        let updateField = {$set: updateDocument}

        return new Promise((resolve,reject)=>{
            db[collectionName].update(queryField,updateField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async deleteDocument(collectionName, queryField){
        let queryField = {_id:mongojs.ObjectID(documentId)}
        return new Promise((resolve,reject)=>{
            db[collectionName].remove(queryField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }
    
    async totalDocuments(collectionName, requiredField ={}){
        return new Promise((resolve,reject)=>{
            db[collectionName].count(requiredField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async getAllDocuments(collectionName,requiredField = {}){
        return new Promise((resolve,reject)=>{
            db[collectionName].find(requiredField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async getOneDocument(collectionName,fields){
        return new Promise((resolve,reject)=>{
            db[collectionName].findOne(fields,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async getDocumentsWithSkipandLimitandFields(collectionName,skip,limit,queryField = {},requiredField = {}){
        return new Promise((resolve,reject)=>{
            db[collectionName]
            .find(queryField,requiredField)
            .skip(skip)
            .limit(limit,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

}

module.exports={Database}