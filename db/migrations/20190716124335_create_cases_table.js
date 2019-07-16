
exports.up = function(knex) {
  return knex.schema.createTable('cases', function(table) {
    table.increments().unsigned().primary();
    table.string('title').notNull();
    table.string('state').notNull().defaultTo('NEW').index();
    table.integer('officer_id').index().references('id').inTable('officers').onDelete('SET NULL');
    table.string('description').notNull();
    table.string('close_reason');
    table.timestamp('closed_at');
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('cases');
};
