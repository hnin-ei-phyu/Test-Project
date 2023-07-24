const {User} = require("../model/user")

class UserController{

    async getOneUser(req,res){
        req.checkParams("id","id must be mongojsId").isMongoId()
        

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let user = new User(req.params.id)
            let data = await user.getUserInfo()

            if(!data){
                res.status(404).json({msg: "User not Found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(200).json({msg: "Server error !"})
        }
    }

    async updateUser(req,res){

        req.checkParams("id", "Id must be MongoId ").isMongoId()
        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let user = new User(req.params.id)
            let data = await user.updateUserInfo(req.body)

            if(!data){
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json(data)
            }catch (error){
                res.status(500).json({msg: "Server Error !"})
        }
    }

    async deleteUser(req,res){
        req.checkParams("id","Id must be MongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let user = new User(req.params.id)
            let data = await user.deleteUser()

            if(!data){
                res.status(404).json({msg: "User not found !"})
            }
            res.status(200).json({msg: "Deleted Successfully !"})

        } catch (error) {
            res.status(500).json({msg: "Server not found !"})
        }
    }

    async login(req,res){

        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let user = new User()
            let data = await user.login()
            res.status(404).json({msg: "User not found"})
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }
}

module.exports = {UserController}