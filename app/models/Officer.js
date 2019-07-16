const AbstractModel = require('./AbstractModel');

class Officer extends AbstractModel {
  static get tableName() {
    return 'officers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
      }
    };
  }
}


module.exports = Officer;
