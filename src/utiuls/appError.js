export class AppError {
  message
  status

  constructor(status, message) {
    this.status = status
    this.message = message
  }
}