require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes')
const config = require('./config')
const limiter = require('./middlewares/limiter')
const errorHandler = require('./middlewares/error-handler')
const { requestLogger, errorLogger } = require('./utils/logger')

const app = express()

mongoose.connect(config.mongoUrl)

app.use(helmet())
app.use(cors())
app.use(limiter)
app.use(express.json())
app.use(requestLogger)

app.use('/api', routes)

app.use(errorLogger)
app.use(errors())
app.use(errorHandler)

module.exports = app
