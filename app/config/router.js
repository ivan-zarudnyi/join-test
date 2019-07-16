const express = require('express');

const CasesController = require('../controllers/CasesController');

module.exports = function (app) {
  const router = express.Router();

  router.post('/cases', (CasesController.action('item'));

  app.use('/api/v1/',router);
};

