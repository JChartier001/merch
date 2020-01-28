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
    "user_name",
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
    .select("userID", "user_name", "password")
    .where("user_name", username);
}

function findById(id) {
  return db("users")
    .where("userID", id)
    .select(
      "first_name",
      "last_name",
      "user_name",
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
    .where("id", id)
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
    .where("id", id)
    .del();
}

function getUsersStores(id) {
  return db("users_store")
    .select() //add in what info we will need
    .join("stores", "storeID", "=", "stores.storeID")
    .where("userID", "=", id);
}
