module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Unauthorized user');
  }

  static badRequest(message, errors = []) {
   return new ApiError(400, message, errors);
  }

  static internal(message) {
    return new ApiError(500, message);
  }
}
