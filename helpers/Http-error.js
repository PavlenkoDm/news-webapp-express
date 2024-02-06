const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const httpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  error.data = { status, message };
  return error;
};

module.exports = httpError;
