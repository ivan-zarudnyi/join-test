const {Model} = require('objection');

const AbstractModel = require('./AbstractModel');
const Officer = require('./Officer');

class Case extends AbstractModel {
  static get tableName() {
    return 'cases';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'state'],

      properties: {
        id: {type: 'integer'},
        title: {type: 'string'},
        description: {type: 'string'},
        state: {type: 'string', default: Case.STATES.NEW, enum: _.values(Case.STATES)},
        close_reason: {type: 'string'},
        closed_at: {type: 'datetime'},
        officer_id: {type: 'integer'}
      }
    };
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Officer,
        join: {
          from: 'cases.officer_id',
          to: 'officers.id'
        }
      }
    }
  }
}

Case.STATES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED'
};

module.exports = Case;
