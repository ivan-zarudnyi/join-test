const AbstractController = require('./AbstractController');

class CasesController extends AbstractController {
  async createCase(req, res) {
    app.logger.info('Create case');
    const params = this.createParams();

    const result = await app.models.Case.query().insertAndFetch(params);
    return res.json(result);
  }

  async item(req, res) {
    app.logger.info(`Get case ${req.params.id}`);

    const result = await app.models.Case.query().findById(req.params.id);
    if (!result) {
      throw {status: 400, message: 'Case not found'}
    }
    return res.json(result);
  }

  async resolveCase(req, res) {
    app.logger.info(`Resolve case ${req.params.id}`);

    const result = await app.models.Case.query().findById(req.params.id);
    if (!result) {
      throw {status: 400, message: 'Case not found'};
    }

    if (result.state == app.models.Case.STATES.CLOSED) {
      throw {status: 400, message: 'Case already closed'};
    }
    result.state = app.models.Case.STATES.CLOSED;
    result.closed_at = new Date();
    result.close_reason = req.body.close_reason || null;
    await result.$query().patch();

    return res.json(result);
  }

  createParams() {
    const params = this.req.parameters.permit(['title', 'description']).value();

    return params;
  }

}

module.exports = CasesController;