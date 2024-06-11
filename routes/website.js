const express = require('express')
const router = express.Router()
const validator = require('./../middlewares/validate')
const webDAO = require('./../dao/website.controller')

router.post('/create/:client', webDAO.validate('web'), validator, webDAO._create)

module.exports = router