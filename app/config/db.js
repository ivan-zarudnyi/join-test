module.exports = function (app) {
  const env = process.env.NODE_ENV || 'development';

  const knex = require('knex')(require('../../db/knexfile')[env]);
  const {Model} = require('objection');

  Model.knex(knex);

  app.models = require('require-all')({
    dirname: __dirname + '/../models',
    recursive: false
  });
  app.knex = knex;
};