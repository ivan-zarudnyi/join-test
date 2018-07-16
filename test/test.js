process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('factory-girl').factory;

require('require-all')({
  dirname: __dirname + '/factories',
  recursive: false
});
chai.use(chaiHttp);
chai.should();


module.exports = {
  expect : chai.expect,
  server : require('../'),
  factory,
  chai
};