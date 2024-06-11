const { body } = require('express-validator')
const clientModel = require('../model/clientModel')
const nodemailer = require('nodemailer')
const _config = require('./../config/app.json')

// create error handler...(code, status, message, data) as args

exports.validate = method => {
    switch(method) {
        case "client": {
            return [
                body('firstname').isString(),
                body('lastname').isString(),
                body('email').isEmail(),
                body('phone_number').isString()
            ]
        }
    }
}

exports._create = async (req, res) => {
    // get form elements, save to db, send email to complete onboarding process
    try {
        const { firstname, lastname, email, phone_number, plan} = req.body
        const newClient = new clientModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone_number: phone_number,
            plan: plan
        })

        const isExist = await clientModel.findOne({email:email})
        if (isExist) {
            return res.status(200).json({
                success: false,
                message: 'This business name already exists',
                data: {
                    status: 200,
                    message: 'This business name already exists'
                }
            })
        }

        const addUser = await newClient.save()
        if (addUser) {
            //customize this xperience for users using templates, formatted messages with graphical effects and customized email.
            let smtpTransport = nodemailer.createTransport({
                service:"gmail",
                auth: {
                    user:_config.SMTP.USER,
                    pass:_config.SMTP.PASS
                }
            })
            let mailOption = {
                to: addUser.email,
                from: "admin@datahubtechnologies.com",
                subject: "Complete Your Account Setup",
                text: 
                    "Thank you for considering us for your project.\n\n "+
                    "Click on the link below or paste the url in your browser to complete your account setup."+
                    "http://"+
                    req.headers.host +
                    "/user-account/kyc/" +
                    addUser._id +
                    "\n\n"
            }
            smtpTransport.sendMail(mailOption, (err, info) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Error sending email. Contact admin",
                        data: {
                            status: 400,
                            message: err.message
                        }
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'Success! Check your mailbox for next steps',
                    data: {
                        status: 200,
                        message: addUser
                    }
                })
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: {
                status: 500,
                message: 'Internal Server Error'
            }
        })
    }
    

}


