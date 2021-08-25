require('dotenv').config()

const mongoose = require('mongoose')

const isTestRunning = process.env.NODE_ENV === 'test'

mongoose.Promise = global.Promise

mongoose.connect(isTestRunning ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = { mongoose }