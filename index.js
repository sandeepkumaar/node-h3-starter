// listen for request
import config from 'config';
import { createServer } from 'node:http'
import { toNodeListener } from 'h3';
import app from './src/index.js'


const { port } = config.server;

const server = createServer(toNodeListener(app)).listen(port, function () {
  const port = server.address().port;
  console.log('service listening on port:', port);
});
