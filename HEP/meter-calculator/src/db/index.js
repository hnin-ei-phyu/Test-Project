const mongojs = require("mongojs")

class DB{
    dbName = "temperature-mornitoring"
    db

    constructor(){
        this.db = mongojs(this.dbName)
    }

    async createDocument(collectionName,document){
        return new Promise((resolve,reject)=>{
            this.db[collectionName].insert(document,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async getAllDocuments(collectionName,requiredFields = {}){
        return new Promise((resolve,reject)=>{
            this.db[collectionName].find({},requiredFields,(err,data)){
                if(err) reject(err)
                else resolve(data)
            }
        })
    }

    async totalDocuments(collectionName,fields={}){
        return new Promise((resolve,reject)=>{
            this.db[collectionName].count(fields,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async getDocumentsWithLimit(collectionName,skip,limit,fields= {}){
        return new Promise((reject,resolve)=>{
            this.db[collectionName].aggregate(
                [
                    {
                        $facet: {
                            totalData: [
                                {$match: fields},
                                {$skip: skip},
                                {$limit: limit},
                                {$sort: {createdAt: -1}},
                            ],
                        },
                    },
                ],
                (err,data)=>{
                    if(err) reject(err)
                    else data
                }
            );
        })
    }

    async getOneDocument(collectionName,queryField){
        return new Promise((reject,resolve)=>{
            this.db[collectionName].findOne(queryField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async updateDocument(collectionName,queryField,updageField){
        return new Promise((resolve,reject)=>{
            this.db[collectionName].update(queryField,updageField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    async deleteDocument(collectionName,queryField){
        return new Promise((resolve,reject)=>{
            this.db[collectionName].delete(queryField,(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }
}
module.exports = {DB}
