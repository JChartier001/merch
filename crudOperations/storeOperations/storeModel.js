const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  // insertStoreUsers,
  find,
  findById,
  findByStoreName,
  update,
  remove
  // getStoresUsers
};

function insert(store) {
  return db("stores")
    .insert(store, "storeID")
    .then(stores => {
      const [store_name] = stores;
      return findByStoreName(store_name);
    });
}
//FUTURE RELEASE////////////// lets a store have multiple users
// function insertStoreUsers(store_name, username) {
//   return db("users_store")
//     .insert({ store_name, username, admin: true })

//     .then(res => {
//       console.log(res);
//     })
//     .catch(error => {
//       res.status(500).json({
//         error,
//         message:
//           "Unable to add this into user_party Table, its not you.. its me"
//       });
//     });
// }

function find() {
  return db("stores").select(
    "storeID",
    "userID",
    "active",
    "store_name",
    "hero_ImageURL",
    "logo_url",
    "created_at",
    "updated_at"
  );
}

function findById(storeID) {
  return db("stores")
    .where("storeID", storeID)
    .select("storeID", "active", "store_name", "hero_ImageURL", "logo_url")
    .first();
}

function findByStoreName(store_name) {
  return db("stores")
    .where("store_name", store_name)
    .select("storeID", "active", "store_name", "hero_ImageURL", "logo_url")
    .first();
}

function update(storeID, changes) {
  return db("stores")
    .where("storeID", storeID)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(storeID);
      } else {
        return null;
      }
    });
}

function remove(store_name) {
  return db("stores")
    .where("store_name", store_name)
    .del();
}

// function getStoresUsers(store_name) {
//   return db("users_store")
//     .select(
//       "username",
//       "store_name",
//       "admin",

//       "stores.active",
//       "stores.store_name",
//       "stores.hero_imageURL",
//       "stores.logo_url",

//       "users.username",
//       "users.first_name",
//       "users.last_name",
//       "users.stripe_account",
//       "users.address1",
//       "users.address2",
//       "users.city",
//       "users.state",
//       "users.zip_code",
//       "users.country",
//       "users.phone",
//       "users.email",
//       "users.support_pin"
//     )
//     .join("stores", "store_name", "=", "stores.store_name")
//     .join("users", "username", "=", "users.username")

//     .where("store_name", "=", store_name);
// }
