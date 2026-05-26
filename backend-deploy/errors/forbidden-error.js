const AppError = require('./app-error')
const { HTTP_STATUS_CODES } = require('../config/constants')

class ForbiddenError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS_CODES.FORBIDDEN)
  }
}

module.exports = ForbiddenError
