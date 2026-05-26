const AppError = require('./app-error')
const { HTTP_STATUS_CODES } = require('../config/constants')

class BadRequestError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS_CODES.BAD_REQUEST)
  }
}

module.exports = BadRequestError
