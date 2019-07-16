const express = require('express');

const CasesController = require('../controllers/CasesController');

module.exports = function (app) {
  const router = express.Router();

  router.get('/cases/:id', CasesController.action('item'));
  router.post('/cases', CasesController.action('createCase'));
  router.post('/cases/:id/resolve', CasesController.action('resolveCase'));

  app.use('/api/v1/',router);
};

