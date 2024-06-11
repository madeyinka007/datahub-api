const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const expressLayout = require('express-ejs-layouts')
const clientFilesPath = path.join(__dirname, "/assets/")
const StaticFileHandler = require('serverless-aws-static-file-handler')
const fileHandler = new StaticFileHandler(clientFilesPath)
const dotenv = require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use(expressLayout)
app.use(cors({
   origin: process.env.NODE_ENV === 'development' ?  'http://localhost:3000' : '',
   credentials: true
}))
app.use(cookieParser())
app.disable('x-powered-by')
app.use(require('./routes'))

//app.set('view engine', 'ejs')

//integrate session after redit initiation...

const handler = serverless(app)

module.exports.handler = async (event, context) => {
    const {MongoDB} = require('./libraries/Connector')
    MongoDB()
    return await handler(event, context)
}

module.exports.static = async (event, context) => {
    return await fileHandler.get(event, context)
}