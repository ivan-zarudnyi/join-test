const {expect, factory} = require('../test');
const AssignOfficersJob = require('./../../app/jobs/AssignOfficerJob');
describe('AssignOfficersJob', function() {
  beforeEach(async function() {
    await app.models.Case.query().delete();
    await app.models.Officer.query().delete();
  });

  describe('#doJob', function() {
    it('should assign new cases to free officer', async function() {
      const off1 = await factory.build('officer');
      await off1.$query().insert();

      const off2 = await factory.build('officer');
      await off2.$query().insert();

      let newCase = await factory.build('new_case');
      await newCase.$query().insert();

      let inProgressCase1 = await factory.build('in_progress_case');
      inProgressCase1.officer_id = off1;
      await inProgressCase1.$query().insert();

      let inProgressCase2 = await factory.build('in_progress_case');
      await inProgressCase2.$query().insert();

      await (new AssignOfficersJob()).doJob();
      const Case = app.models.Case;

      newCase = await Case.query().findById(newCase.id);
      expect(newCase.state).to.equal(Case.STATES.IN_PROGRESS);
      expect(newCase.officer_id).to.equal(off2.id);
    });
  });
});
