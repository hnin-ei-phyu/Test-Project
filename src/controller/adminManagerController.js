const {AdminManager} = require("../model/adminManager")

class AdminManagerController{

    async createAdmin(req,res){
        req.checkBody("username","username should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let adminManager = new AdminManager()
            let data = await adminManager.createAdmin(req.body)

            if(!data){
                res.status(404).josn({msg: "Admin not found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }


    async getAllAdmins(req,res){  
        try {
            let adminManager = new AdminManager()
            let data = await adminManager.getAllAdmins()

            if(!data){
                res.status(404).json({msg: "Admins not found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async totalAdmins(req,res){
        try {
            let adminManager = new AdminManager()
            let data = await adminManager.totalAdmins()

            if(!data){
                res.status(404).json({msg: "Admin not found !"})
            }
            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({msg: "Server Error !"})
        }
    }

    async getAdminWithSkipAndLimitAndFields(req,res){
        req.checkQuery("skip","skip should not be empty").isInt()
        req.checkQuery("limit","limit should not be empty").isInt()

        let skip = parseInt(req.query.skip)
        let limit = parseInt(req.query.limit)

        try {
            let adminManager = new AdminManager()
            let data = await adminManager.getAdminsWithSkipandLimitandField(skip,limit)
            if(!data){
                res.status(404).json({msg: "Admin not found"})
            }
            res.status(200).json(adminManager)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

}