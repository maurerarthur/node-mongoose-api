const express = require('express')

const routes = express.Router()

const AuthMiddleware = require('./middlewares/Auth')

const Auth = require('./controllers/Auth')

routes.post('/auth/signup', Auth.signup)
routes.post('/auth/signin', Auth.signin)

routes.use(AuthMiddleware.jwt)

module.exports = routes