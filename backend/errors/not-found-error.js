const AppError = require('./app-error')
const { HTTP_STATUS_CODES } = require('../config/constants')

class NotFoundError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS_CODES.NOT_FOUND)
  }
}

module.exports = NotFoundError
