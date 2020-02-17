const db = require("../../databaseOperations/db-config");
const axios = require("axios");

module.exports = {
  insert,
  find,
  findById,
  findByOrderToken,
  updateByQuoteId,
  updateByOrderToken,
  removeByQuoteId,
  removeByOrderToken,
  quoteMaker
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
  return db("quotes").select("*");
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findById(quoteID) {
  return db("quotes")
    .where("quoteID", quoteID)
    .select("*")
    .first();
} //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

function findByOrderToken(orderToken) {
  return db("quotes")
    .where("orderToken", orderToken)
    .select("*")
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

async function quoteMaker(data) {
  let config = await {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TEST}` //this our TEST api key - it has to be a env variable moving forward === TEST
    }
  };
  if (data) {
    // console.log(
    //   "----The info to be sent to Sp from inside quoteMaker----",
    //   data
    // );
    const quote = await axios.post(
      "https://api.scalablepress.com/v2/quote",
      data,
      config
    );
    // console.log(
    //   "----The info returned from SP from inside quoteMaker----",
    //   quote.data
    // );

    return quote.data;
  }
}
