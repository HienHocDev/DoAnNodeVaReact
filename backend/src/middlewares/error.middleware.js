function notFoundHandler(req, res, sendJson) {
  sendJson(res, 404, {
    success: false,
    message: 'Không tìm thấy API'
  });
}

function errorHandler(error, req, res, sendJson) {
  console.error(error);
  sendJson(res, 500, {
    success: false,
    message: error.message || 'Lỗi server'
  });
}

module.exports = { notFoundHandler, errorHandler };
