const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  insertStoreUsers,
  find,
  findById,
  findByStoreName,
  update,
  remove,
  getStoresUsers,
  getStoresProducts
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
  return db("user_party")
    .insert({ store_name, username, admin: true })

    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
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

function findById(id) {
  return db("stores")
    .where("storeID", id)
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

function getStoresProducts(store_name) {
  return db("products")
    .select(
      "stores.store_name",
      "stores.active",

      "category.category_name",
      "category.description",
      "category.picture",
      "category.active",

      "active",
      "SKU",
      "product_name",
      "product_description",
      "quantity_per_unit",
      "unit_price",
      "available_size", //there are a lot of sizes to reference, we need to add a size table many to many rel.
      "size",
      "available_color", //there are a lot of colors to reference, we need to add a color table many to many rel.
      "color",
      "available_discount", //there are a lot of discounts to reference, we need to add a discount table many to many rel.
      "discount",
      "product_available",
      "picture",
      "ranking",
      "note"
    )

    .join("stores", "store_name", "=", "stores.store_name")
    .join("category", "categoryID", "=", "category.categoryID")

    .where("store_name", "=", store_name);
}
