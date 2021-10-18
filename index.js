require('dotenv').config();
const app = require('./src/app');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log('server is listening on port', port));

module.exports = server;
