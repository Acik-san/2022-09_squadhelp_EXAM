const http = require('http');
require('./dbMongo/mongoose');
const controller = require('./socketInit');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
controller.createConnection(server);
