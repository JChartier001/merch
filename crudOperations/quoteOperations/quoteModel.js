const db = require("../../databaseOperations/db-config");

module.exports = {
  insert,
  find,
  findById,
  findByOrderToken,
  updateByQuoteId,
  updateByOrderToken,
  removeByQuoteId,
  removeByOrderToken
};

function insert(quote) {
  return db("quotes")
    .insert(quote, "quoteID")
    .then(quotes => {
      const [quoteID] = quotes;
      return findById(quoteID);
    });
}

function find() {
  return db("quotes").select(
    "quoteID",
    "storeID",
    "userID",
    "total",
    "subtotal",
    "tax",
    "fees",
    "shipping",
    "orderToken",
    "warnings",
    "mode"
  );
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findById(quoteID) {
  return db("quotes")
    .where("quoteID", quoteID)
    .select(
      "quoteID",
      "storeID",
      "userID",
      "total",
      "subtotal",
      "tax",
      "fees",
      "shipping",
      "orderToken",
      "warnings",
      "mode"
    )
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findByOrderToken(orderToken) {
  return db("quotes")
    .where("orderToken", orderToken)
    .select(
      "quoteID",
      "storeID",
      "userID",
      "total",
      "subtotal",
      "tax",
      "fees",
      "shipping",
      "orderToken",
      "warnings",
      "mode"
    )
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function updateByQuoteId(quoteID, changes) {
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

function updateByOrderToken(orderToken, changes) {
  return db("quotes")
    .where("orderToken", orderToken)
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findByOrderToken(orderToken);
      } else {
        return null;
      }
    });
}

function removeByQuoteId(quoteID) {
  return db("quotes")
    .where("quoteID", quoteID)
    .del();
}

function removeByOrderToken(orderToken) {
  return db("quotes")
    .where("orderToken", orderToken)
    .del();
}
