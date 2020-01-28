const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findBy,
  findById,
  update,
  remove,
  getUsersStores
};

function insert(user) {
  return db("users")
    .insert(user, "userID")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select(
    "first_name",
    "last_name",
    "username",
    "seller",
    "address1",
    "address2",
    "city",
    "state",
    "zip_code",
    "country",
    "phone",
    "email",
    "billing_address",
    "billing_city",
    "billing_zip_code",
    "billing_country",
    "shipping_address",
    "shipping_city",
    "shipping_zip_code",
    "shipping_country",
    "date_created",
    "date_updated",
    "support_pin"
  );
}

function findBy(username) {
  return db("users")
    .select("userID", "username", "password")
    .where("username", username);
}

function findById(id) {
  return db("users")
    .where("userID", id)
    .select(
      "first_name",
      "last_name",
      "username",
      "seller",
      "address1",
      "address2",
      "city",
      "state",
      "zip_code",
      "country",
      "phone",
      "email",
      "billing_address",
      "billing_city",
      "billing_zip_code",
      "billing_country",
      "shipping_address",
      "shipping_city",
      "shipping_zip_code",
      "shipping_country",
      "date_created",
      "date_updated",
      "support_pin"
    )
    .first();
}

function update(id, changes) {
  return db("users")
    .where("userID", id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("users")
    .where("userID", id)
    .del();
}

function getUsersStores(id) {
  return db("users_store")
    .select(
      "userID",
      "storeID",
      "admin",
      "users.username",
      "users.email",
      "users.support_pin",
      "stores.active",
      "stores.store_name",
      "stores.hero_imageURL",
      "stores.logo_url",
      "stores.date_created",
      "stores.date_updated"
    )
    .join("stores", "storeID", "=", "stores.storeID")
    .join("users", "userID", "=", "users.userID")

    .where("userID", "=", id);
}
