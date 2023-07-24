const {Admin} = require("../model/admin")

class AdminController{

    async getOneAdmin(req,res){
        req.checkParams("id","id must be mongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let admin = new Admin(req.params.id)
            let data = await admin.getAdminInfo()

            if(!data){
                res.status(404).json({msg: "Admin Not Found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg:"Server Error ."})
        }
    }

    async updateAdmin(req,res){

        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("username","username should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let admin = new Admin(req.params.id)
            let data = await admin.updateAdminInfo(req.body)
            
            res.status(200).json({msg: "Updated Successfully !"})

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async deleteAdmin(req,res){
        req.checkParams("id","id must be mongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let admin = new Admin(req.params.id)
            let data = await admin.deleteAdmin()

            if(!data){
                res.status(404).json({msg: "Admin not Found !"})
            }
            res.status(200).json({msg: "Deleted Successfully !"})

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async login(req,res){
        req.checkBody("username", "username not be empty").notEmpty()
        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(500).json(validationErrors)
        try {
            let admin = new Admin()
            let data = await admin.login(email,password)
            
        if(!data){
            res.status(404).json({msg: "Admin not found"})
        }
        res.status(500).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }
}

module.exports = {AdminController}
