const createError = require('http-errors');
const express = require('express');
const strongParams = require('strong-params');

const app = express();
app.set('title', 'stolen-bike-cases');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(strongParams.expressMiddleware());

const config = require('./app/config');
config(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  try {
    JSON.stringify(err); //avoid recursive json error
  } catch (e) {
    err = {message: '' + err};
  }

  res.json(err);
});

global.app = app;
global._ = require('lodash');

module.exports = app;