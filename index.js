const express = require("express")
const app = express()
const validator = require("express-validator")
const bodyParser = require("body-parser")

const AdminRouter = require("./src/router/adminRouter")
const AdminManagerRouter = require("./src/router/adminManagerRouter")
const UserRouter = require("./src/router/userRouter")
const UserManagerRouter = require("./src/router/userManagerRouter")
const ItemRouter = require("./src/router/itemRouter")
const ItemManagerRouter = require("./src/router/itemManagerRouter")
const AuthRouter = require("./src/router/authRouter")

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())

//using route"
app.use("/api/admin",AdminRouter)
app.use("/api/adminManager",AdminManagerRouter)
app.use("/api/user",UserRouter)
app.use("/api/userManager",UserManagerRouter)
app.use("/api/item",ItemRouter)
app.use("/api/itemManager",ItemManagerRouter)
app.use("/api/auth",AuthRouter)


app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})
