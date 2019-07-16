const _ = require('lodash');

class AbstractController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  static action(method) {
    return (req, res, next) => {
      const instance = new this(req, res);
      if (!instance[method]) {
        throw new Error(`Method ${method} not found in controller`);
      }

      instance[method](req, res).then(() => {}).catch(err => {
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