const express = require('express')

const routes = express.Router()

const Auth = require('./controllers/Auth')

routes.post('/auth/signup', Auth.signup)
routes.post('/auth/signin', Auth.signin)

routes.use(Auth.jwt)

module.exports = routes