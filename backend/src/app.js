const http = require('http');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

const app = http.createServer((req, res) => {
  try {
    if (routes(req, res, sendJson)) {
      return;
    }

    notFoundHandler(req, res, sendJson);
  } catch (error) {
    errorHandler(error, req, res, sendJson);
  }
});

module.exports = app;
