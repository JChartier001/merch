exports.seed = function(knex) {
  return knex('stores').insert([
    {active: true,
    store_name: 'Anthill Store',
    date_created: 1529644667834,
    date_updated: 1529644667834}
  ]);
};
