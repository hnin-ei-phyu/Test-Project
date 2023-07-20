const {User} = require("../model/user")

class UserController{

    async getOneUser(req,res){
        req.checkParams("id","id must be mongojsId").isMongoId()
        req.checkBody("username", "username should not be empty")

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
            
        }
    }

    async updateUser(req,res){
        req.checkParams("id", "Id must be MongoId ").isMongoId()
        let validationErrors = req.validationErrors
        if(validationErrors) return res.status(400).json(validationErrors)
    }
}