// const db = require("../../databaseOperations/db-config");

// module.exports = {
//   // getUsersStores
// };

////Future release//////

// function getUsersStores(username) {
//   return db("users_store")
//     .select(
//       "userID",
//       "storeID",
//       "admin",
//       "users.username",
//       "users.email",
//       "users.stripe_account",
//       "users.support_pin",
//       "stores.active",
//       "stores.store_name",
//       "stores.hero_imageURL",
//       "stores.logo_url"
//     )
//     .join("stores", "store_name", "=", "stores.store_name")
//     .join("users", "username", "=", "users.username")

//     .where("username", "=", username);
// }
