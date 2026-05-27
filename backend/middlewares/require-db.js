const mongoose = require('mongoose')
const { HTTP_STATUS_CODES, MESSAGES } = require('../config/constants')

const requireDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).send({
      message: MESSAGES.DATABASE_UNAVAILABLE,
    })
    return
  }

  next()
}

module.exports = requireDb