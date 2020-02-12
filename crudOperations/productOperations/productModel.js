const db = require("../../databaseOperations/db-config");
const axios = require("axios");

module.exports = {
  insert,
  find,
  findById,
  updateByProductId,
  removeByProductId,
  ShirtMaker
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

function ShirtMaker(data) {
  console.log("data inside shirtmaker", data);
  console.log(process.env.TEST);

  async function makeShirt(data) {
    let config = await {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.TEST}` //this an actual TEST api key - it has to be a env variable moving forward === TEST
      }
    };

    try {
      if ((data, config)) {
        const shirtImage = await axios.post(
          "https://api.scalablepress.com/v3/mockup",
          data,
          config
        );
        return shirtImage;
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  }

  makeShirt();

  return shirtImage;
}
