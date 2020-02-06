exports.seed = function(knex) {
  return knex("stores").insert([
    { active: true, store_name: "Anthill Store", userID: 1 }
  ]);
};
