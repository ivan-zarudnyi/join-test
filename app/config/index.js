module.exports = function (app) {
  require('./router')(app);
  require('./log')(app);
  require('./db')(app);
};