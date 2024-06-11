const express = require('express')
const router = express.Router()

const api = '/api-gateway' //send to config...

router.use(api+'/client', require('./client'))
router.use(api+'/website', require('./website'))

//Account setup routes
//router.use('/user-account', require('./account'))


module.exports = router