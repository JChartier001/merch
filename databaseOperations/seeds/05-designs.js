exports.seed = function(knex) {
  return knex("designs").insert([
    {
      design_url: "https://uxmasters.org/images/ant_logo.svg",
      thumbnail_url: "https://uxmasters.org/images/ant_logo.svg",
      design_name: "Ant for shirt",
      storeID: 1,
      userID: 1
    },
    {
      design_url: "https://uxmasters.org/images/ant_logo.svg",
      thumbnail_url: "https://uxmasters.org/images/ant_logo.svg",
      design_name: "Ant for shirt",
      storeID: 1,
      userID: 1
    },
    {
      design_url: "https://uxmasters.org/images/ant_logo.svg",
      thumbnail_url: "https://uxmasters.org/images/ant_logo.svg",
      design_name: "Ant for shirt",
      storeID: 1,
      userID: 1
    }
  ]);
};
