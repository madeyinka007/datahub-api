const express = require('express')
const router = express.Router()
const validator = require('./../middlewares/validate')
const clientDAO = require('../dao/client.controller')

router.post('/create', clientDAO.validate('client'), validator, clientDAO._create)

module.exports = router