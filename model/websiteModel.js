const mongoose = require('mongoose')
const Util = require('./../libraries/Utility')

const websiteSchema = new mongoose.Schema({
    company:{type:String},
    admin_email:{type:String},
    password:{type:String},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    logo:{type:Object},
    domain_state:{type:String},
    domain_name:{type:String},
    phone:{type:String},
    content:{type:Object},
    overview:{type:String},
    tagline:{type:String},
    digital_service:{type:String},
    note:{type:String},
    client_id:{type:String},
    status:{type:String, enum:['Pending', 'Active', 'Suspended'], default:'Pending'}
}, {timestamps:true})

module.exports = mongoose.model('Websites', websiteSchema)