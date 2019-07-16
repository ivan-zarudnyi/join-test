
exports.up = function(knex) {
  return knex.schema.createTable('officers', function(table) {
    table.increments().unsigned().primary();
    table.string('name').notNull();
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('officers');
};
