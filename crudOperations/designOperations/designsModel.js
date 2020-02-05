const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findById,
  updateByDesignId,
  removeByDesignId
};

function insert(design) {
  return db("designs")
    .insert(design, "designID")
    .then(designs => {
      const [designID] = designs;
      return findById(designID);
    });
}

function find() {
  return db("designs").select(
    "store_name",
    "username",
    "design_name",
    "design_url"
  );
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findById(designID) {
  return db("designs")
    .where("designID", designID)
    .select("store_name", "username", "design_name", "design_url")
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function updateByDesignId(quoteID, changes) {
  return db("quotes")
    .where("quoteID", quoteID)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(quoteID);
      } else {
        return null;
      }
    });
}

function removeByDesignId(designID) {
  return db("designs")
    .where("designID", designID)
    .del();
}
