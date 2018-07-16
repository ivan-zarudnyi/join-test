const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const Officer = require('../../app/models/Officer');

factory.setAdapter(new FactoryGirl.ObjectAdapter());

factory.define('officer', Officer, {
  name: factory.sequence('Officer.name', (n) => `Officer ${n}`)
});


