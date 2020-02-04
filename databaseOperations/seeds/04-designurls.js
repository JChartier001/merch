exports.seed = function(knex) {
  return knex('designs').insert([
    {design_url: 'https://uxmasters.org/images/ant_logo.svg',
    store_name: 'Anthill Store',
    username: 'merchdropperadmin'}
  ]);
};
