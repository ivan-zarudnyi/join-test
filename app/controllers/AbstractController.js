const _ = require('lodash');

class AbstractController {
  static action(method) {
    const instance = new this();
    if (!instance[method]) {
      throw new Error(`Method ${method} not found in controller`);
    }

    return (req, res, next) => {
      instance[method](req, res).then(() => {
      }).catch(err => {
        app.logger.error(err);
        next(err);
      });
    };
  }

  renderError(res, err) {
    res.status(_.get(err, 'status') || 400);
    res.json(err);
  }
}

module.exports = AbstractController;