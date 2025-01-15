function response({status, message, data}) {
  return {
    statusCode: status,
    message: message,
    data: data || []
  }
}

module.exports = { response };