const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findBy,
  findById,
  findByUsername,
  update,
  remove,
  getUsersStores
};

//for Auth router use primarily//

function insert(user) {
  return db("users")
    .insert(user, "userID")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findBy(username) {
  return db("users")
    .select("userID", "username", "password")
    .where("username", username);
}

//for Auth router use primarily//

function find() {
  return db("users").select(
    "first_name",
    "last_name",
    "username",
    "seller",
    "stripe_account",
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

function findById(id) {
  return db("users")
    .where("userID", id)
    .select(
      "first_name",
      "last_name",
      "username",
      "seller",
      "stripe_account",
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

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .select(
      "first_name",
      "last_name",
      "username",
      "seller",
      "stripe_account",
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

function getUsersStores(username) {
  return db("users_store")
    .select(
      "userID",
      "storeID",
      "admin",
      "users.username",
      "users.email",
      "users.stripe_account",
      "users.support_pin",
      "stores.active",
      "stores.store_name",
      "stores.hero_imageURL",
      "stores.logo_url",
      "stores.date_created",
      "stores.date_updated"
    )
    .join("stores", "store_name", "=", "stores.store_name")
    .join("users", "username", "=", "users.username")

    .where("username", "=", username);
}
