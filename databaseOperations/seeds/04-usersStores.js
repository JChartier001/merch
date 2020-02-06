exports.seed = function(knex) {
  return knex("users_store").insert([
    {
      storeID: 1,
      userID: 1
    }
  ]);
};
