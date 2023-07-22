const {UserManager} = require("../model/userManager")

class UserManagerController{
    async getAllUsers(req,res){

        try {
            let userManager = new UserManager()
            let data = await userManager.getAllUsers()
            if(!data){
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error ! "})
        }
    }

    async totalUsers(req,res){
        try {
            let userManager = new UserManager()
            let data = await userManager.totalUsers()
            if(!data){
                res.status(404).json({msg: "User not Found !"})
            }
            res.status(500).json(data)
        } catch (error) {
            
        }
    }

    async getUserWithLimit(req,res){
        req.checkQuery("skip", "Skip should not be empty").isInt()
        req.checkQuery("limit", "Limit should not be empty").isInt()

        let skip = parseInt(req.query.skip)
        let limit = parseInt(req.query.limit)

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let userManager = new UserManager()
            let data = await userManager.getUsersWithSkipAndLimitAndFields(skip,limit)
            if(!data){
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async createUser(req,res){
        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let userManager = new UserManager()
            let data = await userManager.createUsers(req.body)
            if(!data){
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    //  write login controller
    
}
module.exports = {UserManagerController}