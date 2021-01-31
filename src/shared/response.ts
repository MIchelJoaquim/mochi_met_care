export function getErrorResponse (errorMessage: string) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: errorMessage
    })
  }
};

export function getSuccessResponse (errorMessage: string) {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: errorMessage
    })
  }
};
