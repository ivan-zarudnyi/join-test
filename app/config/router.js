const express = require('express');

module.exports = function (app) {
  const router = express.Router();



  app.use('/api/v1/',router);
};

