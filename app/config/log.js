module.exports = function (app) {
  const log4js = require('log4js');

  log4js.configure({
    appenders: {
      console: {type: 'console'}
    },
    categories: {
      default: {appenders: ['console'], level: 'info'}
    }
  });

  app.logger = log4js.getLogger(app.name);
};