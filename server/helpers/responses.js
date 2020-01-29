class Responses {
  static failure(response, status, error) {
    response.status(status)
      .json({
        status,
        error,
      });
  }

  static success(response, status, message, data) {
    response.status(status)
      .json({
        status,
        message,
        data,
      });
  }


  static delete(response, status, message) {
    response.status(status)
      .json({
        status,
        message,
      });
  }
}
export default Responses;
