const { getHealth, getDatabaseHealth } = require('../controllers/health.controller');
const { getBooks } = require('../controllers/books.controller');
const { login, register } = require('../controllers/auth.controller');
const { getOrders, createOrder } = require('../controllers/orders.controller');
const { updateUser } = require('../controllers/users.controller');

async function routes(req, res, sendJson) {
  if (req.method === 'GET' && req.url === '/api/health') {
    getHealth(req, res, sendJson);
    return true;
  }

  if (req.method === 'GET' && req.url === '/api/health/database') {
    await getDatabaseHealth(req, res, sendJson);
    return true;
  }

  if (req.method === 'GET' && req.url === '/api/books') {
    await getBooks(req, res, sendJson);
    return true;
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    await login(req, res, sendJson);
    return true;
  }

  if (req.method === 'POST' && req.url === '/api/auth/register') {
    await register(req, res, sendJson);
    return true;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/orders')) {
    await getOrders(req, res, sendJson);
    return true;
  }

  if (req.method === 'POST' && req.url === '/api/orders') {
    await createOrder(req, res, sendJson);
    return true;
  }

  if (req.method === 'PUT' && /^\/api\/users\/\d+$/.test(req.url)) {
    await updateUser(req, res, sendJson);
    return true;
  }

  return false;
}

module.exports = routes;
