const AbstractController = require('./AbstractController');

class CasesController extends AbstractController {
  async createCase(req, res) {
    app.logger.info('Create case');
    const params = this.createParams();

    const result = await app.models.Case.query().insertAndFetch(params);
    return res.json(result);
  }

  createParams() {
    const params = this.req.parameters.permit(['title', 'description']).value();

    return params;
  }

}

module.exports = CasesController;