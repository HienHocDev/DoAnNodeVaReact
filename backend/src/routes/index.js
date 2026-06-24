const { getHealth } = require('../controllers/health.controller');

function routes(req, res, sendJson) {
  if (req.method === 'GET' && req.url === '/api/health') {
    getHealth(req, res, sendJson);
    return true;
  }

  return false;
}

module.exports = routes;
