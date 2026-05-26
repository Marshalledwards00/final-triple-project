const mongoose = require('mongoose')
const { isCelebrateError } = require('celebrate')
const { HTTP_STATUS_CODES, MESSAGES } = require('../config/constants')
const BadRequestError = require('../errors/bad-request-error')

const errorHandler = (error, req, res, next) => {
  if (isCelebrateError(error)) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: MESSAGES.INVALID_DATA })
    return
  }

  if (error instanceof mongoose.Error.ValidationError
    || error instanceof mongoose.Error.CastError
    || error instanceof BadRequestError) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: error.message || MESSAGES.INVALID_DATA })
    return
  }

  const statusCode = error.statusCode || HTTP_STATUS_CODES.SERVER_ERROR
  const message = statusCode === HTTP_STATUS_CODES.SERVER_ERROR
    ? MESSAGES.SERVER_ERROR
    : error.message

  res.status(statusCode).send({ message })
  next()
}

module.exports = errorHandler
