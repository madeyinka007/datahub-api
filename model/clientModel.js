const mongoose = require('mongoose')
const Website = require('./websiteModel')

const clientSchema = new mongoose.Schema({
    firstname: {type:String},
    lastname:{type:String},
    email:{type:String},
    phone_number:{type:String},
    plan:{type:String},
    websites: [Website.schema]
}, {timestamps:true})

module.exports = mongoose.model('Client', clientSchema)