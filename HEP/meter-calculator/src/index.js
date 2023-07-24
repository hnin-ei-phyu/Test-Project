const express = require("express")
const validator = require("express-validator")
const bodyParser = require("body-parser")

class App{

    httpport
    httpServer

    configs = [
        {
            name: "Access-Control-Allow-Origin",
            val:"*",
        },
        {
            name: "Access-Control-Allow-Methods",
            val:"GET,PUT,POST,PATCH,OPTIOINS",
        },
        {
            name: "Access-Control-Allow-Headers",
            val: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token",

        }
        
    ]

    constructor(){
        this.setupApplication()
    }

    setupApplication(){
        this.app = express()

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(validator())

          // initialize http 

        this.httpServer = http.createServer(this.app)


        this.app.use((req, res, next) => { 
        this.configs.map((config) => res.set(config.name, config.val)); next() 
        })

        startServer(){
            //start listening the http
            this.httpServer.listen(this.httpport,()=>{
                console.log("Http Server is running on port " + this.httpPort + ". \n ^c to exit.")
            })
        }
    }

}
const expressApp = new App()

expressApp.startServer()


