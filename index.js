const express = require("express")
const app = express()
const validator = require("express-validator")
const bodyParser = require("body-parser")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())
