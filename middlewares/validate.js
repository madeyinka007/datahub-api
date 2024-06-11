const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ message: `${err.param} ${err.msg}` }))

    const response = {
        success: false,
        message: "Request is not valid",
        error: {
            code: 400,
            description: extractedErrors[0].message
        }
    }

    if (extractedErrors.length > 1) {
        response.error.errors = extractedErrors
    }
  
    return res.status(400).json(response)

}