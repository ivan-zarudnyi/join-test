
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('officers').del()
    .then(function () {
      // Inserts seed entries
      return knex('officers').insert([
        {name: 'officer 1'},
        {name: 'officer 2'}
      ]);
    });
};
