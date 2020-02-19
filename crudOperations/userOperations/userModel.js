const db = require("../../databaseOperations/db-config");

module.exports = {
  findById,
  findByUsername,
  update,
  remove
  // getUsersStores
};

function findById(id) {
  return db("users")
    .where("userID", id)
    .select("*")
    .first();
}

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .select("*")
    .first();
}

function update(username, changes) {
  return db("users")
    .where("username", username)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findByUsername(username);
      } else {
        return null;
      }
    });
}

function remove(username) {
  return db("users")
    .where("username", username)
    .del();
}

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
