const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findById,
  updateByProductId,
  removeByProductId
};

function insert(product) {
  return db("products")
    .insert(product, "productID")
    .then(products => {
      const [productID] = products;
      return findById(productID);
    });
}

function find() {
  return db("products").select("*");
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findById(productID) {
  return db("products")
    .where("productID", productID)
    .select("*")
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function updateByProductId(productID, changes) {
  return db("products")
    .where("productID", productID)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(productID);
      } else {
        return null;
      }
    });
}

function removeByProductId(productID) {
  return db("products")
    .where("productID", productID)
    .del();
}
