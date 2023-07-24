const {Auth} = require("../model/auth")

class AuthController{

    async isAuthed(req,res,next){
        const token = req.headers['x-access-token']
        if(!token) return res.status(403).json({msg: "A token is required of Authentication"})

        let auth = new Auth()
        try {
            let user = await auth.isAuthed(token)
            req.user = user

            next()
        } catch (error) {
            if(error==400)  res.status(400).json({msg: "Invalid token"})
            else if(error==401)  res.status(401).json({msg: "You are not User "})
            else res.status(500).json({msg: "Server Error"})
        }
    }

    async isAdmin(req,res,next){
        const token = req.headers['x-access-token']
        if(!token) return res.status(403).json({msg: "A token is required of Authentication"})
        
        let auth = new Auth()
        try {
            let admin = await auth.isAdmin(token)
            req.user = admin
            next()
        } catch (error) {
            if(error==400) res.status(400).json({msg: "Invalid token"})
            else if(error==401) res.status(401).json({msg: "You are not Admin"})
            else res.status(500).json({msg: "Server Error"})
        }
    }

    async isUser(req,res,next){
        const token = req.headers['x-access-token']
        if(!token) return res.stataus(403).json({msg: "A token is required of Authentication"})

        let auth = new Auth()
        try {
            let user = await auth.isUser(token)
            req.user = user
            next()
        } catch (error) {
            if(error==400) res.status(400).json({msg: "Invalid token"})
            else if(error==401) res.status(401).json({msg: "You are not Admin"})
            else res.status(500).json({msg: "Server Error"})
        }
    }

    async registerAdmin(req,res,next){

        req.checkBody("username","username should not be empty").notEmpty()
        req.checkBody("email","email should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let auth = new Auth()
            let data = await auth.registerAdmin(req.body)

            res.status(200).json(data)

        } catch (error) {
    
            res.status(500).json({msg: "Server Error"})
        }
    }

    async registerUser(req,res,next){

        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("email", "email should not be empyt").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        try {
            let auth = new Auth()
            let data = await auth.registerUser(req.body)

            res.status(200).json(data)

        } catch (error) {
    
            res.status(500).json({msg: "Server Error"})
        }
    }

    async loginAdmin(req,res,next){
        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        
        try {
            let auth = new Auth()
            let data = await auth.loginAdmin(email,passwrod)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }

    async loginUser(req,res,next){

        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()


        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        
        try {
            let auth = new Auth()
            let data = await auth.loginUser(email,password)
            res.status(200).json(data)
            
        } catch (error) {
            res.status(500).json({msg: "Server Error"})
        }
    }
}

module.exports = {AuthController}