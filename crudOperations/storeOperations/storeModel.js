const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  insertStoreUsers,
  find,
  findById,
  findByStoreName,
  update,
  remove,
  getStoresUsers
};

function insert(store) {
  return db("stores")
    .insert(store, "storeID")
    .then(stores => {
      const [store_name] = stores;
      return findByStoreName(store_name);
    });
}

function insertStoreUsers(store_name, username) {
  return db("users_store")
    .insert({ store_name, username, admin: true })

    .then(res => {
      console.log(res);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message:
          "Unable to add this into user_party Table, its not you.. its me"
      });
    });
}

function find() {
  return db("stores").select(
    "active",
    "store_name",
    "hero_ImageURL",
    "logo_url",
    "date_created",
    "date_updated"
  );
}

function findById(storeID) {
  return db("stores")
    .where("storeID", storeID)
    .select(
      "active",
      "store_name",
      "hero_ImageURL",
      "logo_url",
      "date_created",
      "date_updated"
    )
    .first();
}

function findByStoreName(store_name) {
  return db("stores")
    .where("store_name", store_name)
    .select(
      "active",
      "store_name",
      "hero_ImageURL",
      "logo_url",
      "date_created",
      "date_updated"
    )
    .first();
}

function update(store_name, changes) {
  return db("stores")
    .where("store_name", store_name)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findByStoreName(store_name);
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

function getStoresUsers(store_name) {
  return db("users_store")
    .select(
      "username",
      "store_name",
      "admin",

      "stores.active",
      "stores.store_name",
      "stores.hero_imageURL",
      "stores.logo_url",
      "stores.date_created",
      "stores.date_updated",

      "users.username",
      "users.first_name",
      "users.last_name",
      "users.stripe_account",
      "users.address1",
      "users.address2",
      "users.city",
      "users.state",
      "users.zip_code",
      "users.country",
      "users.phone",
      "users.email",
      "users.date_created",
      "users.date_updated",
      "users.support_pin"
    )
    .join("stores", "store_name", "=", "stores.store_name")
    .join("users", "username", "=", "users.username")

    .where("store_name", "=", store_name);
}
