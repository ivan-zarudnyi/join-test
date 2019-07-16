const env = process.env.NODE_ENV || 'development';

const knex = require('knex')(require('../../db/knexfile')[env]);
const {Model} = require('objection');

Model.knex(knex);

module.exports = knex;