const { mongoose } = require('../database/mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

schema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

module.exports = mongoose.model('User', schema)