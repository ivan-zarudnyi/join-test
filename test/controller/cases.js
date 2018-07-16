const {server, expect, chai, factory} = require('../test');

describe('Cases Api', function () {

  beforeEach(async function() {
    await app.models.Case.query().delete();
  });

  describe('/GET cases/:id', () => {
    it('it should return case', async () => {
      const newCase = await factory.build('new_case');
      await newCase.$query().insert();

      let res = await chai
        .request(server)
        .get('/api/v1/cases/' + newCase.id);

      expect(res).to.have.status(200);
    });
  });

  describe('/POST cases', () => {
    it('should create new case', done => {
      chai
        .request(server)
        .post('/api/v1/cases')
        .send({title: 'Tes case', description: 'Some desc'})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body.id).to.be.not.null;
          expect(res.body.state).to.equal(app.models.Case.STATES.NEW);
          done();
        });
    });
  });
  describe('/POST cases/:id/resolve', () => {
    it('it should resolve case', async () => {
      const newCase = await factory.build('in_progress_case');
      await newCase.$query().insert();

      let res = await chai
        .request(server)
        .post(`/api/v1/cases/${newCase.id}/resolve`);

      expect(res).to.have.status(200);

      const resolved = await app.models.Case.query().findById(newCase.id);
      expect(resolved.state).to.equal(app.models.Case.STATES.CLOSED);
    });
  });

});
