const config = require('./config')
const express = require('express')
const app = express()
const cors = require('cors')
const jobRouter = require('../controllers/jobs')
const middleware = require('./middleware')
const logger = require('./logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connecting to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB', error)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/jobs', jobRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app