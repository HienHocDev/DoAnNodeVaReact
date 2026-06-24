const app = require('./app');
const { env } = require('./config/env');

app.listen(env.port, () => {
  console.log(`Backend is running at http://localhost:${env.port}`);
});
