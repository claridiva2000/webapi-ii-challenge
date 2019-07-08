const express = require('express');

const db = require('../data/db');
const postsRouter = require('../routes/posts-routes');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send("i'm a little teapot");
});

server.use('/api/posts', postsRouter);
module.exports = server;
