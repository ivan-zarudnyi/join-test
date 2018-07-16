const AbstractJob = require('./AbstractJob');
const {transaction} = require('objection');

class AssignOfficerJob extends AbstractJob {
  async doJob() {
    app.logger.info('AssignOfficerJob start');

    const trx = await transaction.start(app.knex);//wrap into transaction to avoid issue if more than one instance of job started at once
    try {
      const freeOfficers = await this.getAvailableOfficers(trx);
      const newCases = await app.models.Case.query(trx).where({state: app.models.Case.STATES.NEW})
        .orderBy('created_at', 'asc').limit(freeOfficers.length).forUpdate();
      if (freeOfficers.length == 0) {
        app.logger.info('All officers are busy');
      }
      for (const newCase of newCases) {
        newCase.officer_id = freeOfficers.pop().id;
        newCase.state = app.models.Case.STATES.IN_PROGRESS;
        await newCase.$query(trx).patch();
        app.logger.info(`Case ${newCase.id} assigned to officer ${newCase.officer_id}`);
      }

      await trx.commit();
    } catch (e) {
      await trx.rollback();
      throw e;
    }

    app.logger.info('AssignOfficerJob finished');
  }

  async getAvailableOfficers(trx) {
    return await trx.raw(`select id
      from (
             select
               id,
               (select max(closed_at)
                from cases
                where cases.officer_id = officers.id and state = 'CLOSED') as last_case_closed
             from officers
             where not exists(select 1
                              from cases
                              where cases.officer_id = officers.id and state != 'CLOSED')
           ) available_officers
      order by available_officers.last_case_closed desc`); // here should be for update clause, but sqllite does not support it
  }
}

module.exports = AssignOfficerJob;