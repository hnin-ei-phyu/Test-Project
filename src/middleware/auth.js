class Auth {

    static isAdmin(req, res, next) {
        if (req.query.username == "Zaw") {
            next()
        } else {
            res.status(401).json({msg: "You are not Zaw"})
        }
    }

    static isUser(req,res,next) {
        if(req.query.username == "user") {
            next()
        } else{
            res.status(401).json({msg: "You are not user"})
        }
    }

}

module.exports = Auth