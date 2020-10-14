const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errHandler = require('./errorHandler.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json({
    api: 'up',
  });
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'host'
    )}`
  );

  next();
}

server.use(errHandler);

module.exports = server;
