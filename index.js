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

const http = require('http');

let port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  app.logger.info('Listening on ' + bind);
}
