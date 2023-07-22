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
}

module.exports = {AuthController}