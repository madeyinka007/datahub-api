const bcrypt = require('bcryptjs')
const _config = require('./../config/app.json')

const Utils = {
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
}

module.exports = Utils