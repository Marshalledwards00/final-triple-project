const AppError = require('./app-error')
const { HTTP_STATUS_CODES } = require('../config/constants')

class ConflictError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS_CODES.CONFLICT)
  }
}

module.exports = ConflictError
