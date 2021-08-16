require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User.model')

module.exports = {
    async signup(req, res) {
        try {
            const newUser = new User(req.body)
            await newUser.save()
            return res.status(200).json({
                message: 'User successfully registered',
                user: newUser
            })
        } catch(e) {
            return res.status(400).json({
                message: 'There was an error registering the user'
            })
        }
    },

    async signin(req, res) {
        try {
            const userExists = await User.findOne({ email: req.body.email })

            if(userExists) {
                const { _id, name, email, password } = userExists
                const passwordMatch = await bcrypt.compare(req.body.password, password)

                if(passwordMatch) {
                    const token = jwt.sign({ _id, name, email }, process.env.JWT_SECRET)
                    return res.status(200).json({ message: 'User successfully logged in', _id, name, email, token })
                } else {
                    return res.status(401).json({ message: 'Error on logging in! Check your credentials' })
                }
            }
        } catch(e) {
            res.status(401).json({ message: 'Error on logging in' })
        }

        return res.status(400).json({ message: 'User not found' })
    },

    async jwt(req, res, next) {
        const token = req.headers.authorization

        if(!token) {
            return res.status(401).json({ message: 'No JWT token was found in the request header' })
        }

        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)

            if(decoded) {
                return next()
            } else {
                return res.status(401).json({ message: 'JWT token is invalid' })
            }
        } catch(e) {
            return res.status(401).json({ message: 'Error on authentication' })
        }
    }
}