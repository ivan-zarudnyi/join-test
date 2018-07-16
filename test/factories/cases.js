const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const Case = require('../../app/models/Case');

factory.setAdapter(new FactoryGirl.ObjectAdapter());

factory.define('new_case', Case, {
  title: factory.sequence('Case.name', (n) => `New case ${n}`),
  state: Case.STATES.NEW,
  description: 'Some desc'
});
factory.define('in_progress_case', Case, {
  title: factory.sequence('Case.name', (n) => `In progress case ${n}`),
  state: Case.STATES.IN_PROGRESS,
  description: 'Some desc'
});


