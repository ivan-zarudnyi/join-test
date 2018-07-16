const scheduler = require('node-schedule');
const AssignOfficerJob = require('./../jobs/AssignOfficerJob');

const ASSIGN_OFFICERS_SCHEDULE = '*/15 * * * * *';
module.exports = function (app) {

  app.logger.info('Schedule AssignOfficerJob ' + ASSIGN_OFFICERS_SCHEDULE);

  scheduler.scheduleJob(ASSIGN_OFFICERS_SCHEDULE, () => {
    const assignOfficer = new AssignOfficerJob();
    assignOfficer.doJob().then(() => {
    }).catch(e => app.logger.error(e));
  });
};