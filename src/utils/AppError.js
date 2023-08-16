export class AppError {
  message
  status

  constructor(message, statusCode = 400) {
    this.status = statusCode
    this.message = message
  }
}
