function getHealth(req, res, sendJson) {
  sendJson(res, 200, {
    success: true,
    message: 'Backend API dang hoat dong',
    timestamp: new Date().toISOString()
  });
}

module.exports = { getHealth };
