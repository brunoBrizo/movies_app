/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "22/08/2021",
        "description": "custom error class",
        "modified_at": "22/08/2021"
    }
*/
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
