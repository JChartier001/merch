exports.seed = function(knex) {
  return knex("stores").insert([
    {
      active: true,
      store_name: "Anthill Store",
      userID: 1,
      domain_name: "anthillstore"
    },
    {
      active: true,
      store_name: "The Best Store",
      userID: 2,
      domain_name: "TheBestStore"
    }
  ]);
};
