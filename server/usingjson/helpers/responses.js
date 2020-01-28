class Responses {
  static failureResponse(response, status, error) {
    response.status(status)
      .json({
        status,
        error,
      });
  }

  static successResponse(response, status, message, data) {
    response.status(status)
      .json({
        status,
        message,
        data,
      });
  }


  static deleteResponse(response, status, message) {
    response.status(status)
      .json({
        status,
        message,
      });
  }
}
export default Responses;
