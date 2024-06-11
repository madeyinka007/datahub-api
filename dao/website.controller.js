const { body } = require('express-validator')
const Util = require('./../libraries/Utility')
const clientModel = require('./../model/clientModel')
const webModel = require('./../model/websiteModel')
const websiteModel = require('./../model/websiteModel')

exports.validate = method => {
    switch(method){
        case 'web': {
            return [
                body('admin_email').isEmail()
            ]
        }

    }
}

exports._create = async (req, res) => {
    const clientId = req.params.client
    try {
        clientModel.findOne({_id:clientId})
        .then((client) => {
            if (!client.websites.some(e => e.admin_email === req.body.admin_email)){
                const websiteInfo = {
                    company: req.body.company,
                    admin_email: req.body.admin_email,
                    password: Util.hashPassword(req.body.password),
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    logo: req.body.logo,
                    content: req.body.content,
                    tagline: req.body.tagline,
                    domain_state: req.body.domain_state,
                    domain_name: req.body.domain_name,
                    overview: req.body.overview,
                    digital_service: req.body.digital_service,
                    note: req.body.note
                }
                client.websites.push(websiteInfo)
                client.save()
                .then((response) => {
                    const website = new websiteModel(websiteInfo)
                    website.save()
                    .then((result) => {
                        return res.status(201).json({
                            success: true,
                            message: "New project created successfully",
                            data: {
                                status:201,
                                message: result
                            }
                        })
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            success: false,
                            message:"Bad Request"
                        })
                    })
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message:"Administrator Email already taken."
                })
            }
            
        })
        .catch(err => {
            //console.log(err)
            return res.status(404).json({
                success: false,
                message:"User record does not exists"
            })
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message:"Error in database connection"
        })
    }
}