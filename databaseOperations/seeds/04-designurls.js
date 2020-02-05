exports.seed = function(knex) {
  return knex('designs').insert([
    {design_url: 'https://uxmasters.org/images/ant_logo.svg',
    design_name: 'Ant for shirt',
    store_name: 'Anthill Store',
    username: 'merchdropperadmin'}
  ]);
};
