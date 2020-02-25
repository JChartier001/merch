const db = require("../../databaseOperations/db-config");

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  insert(newItem) {
    return db(this.tableName)
      .insert(newItem)
      .then((ids) => {
        const [id] = ids;
        return this.findBy(id);
      });
  }

  // I'm not really sure how the above function is suppoosed to work.
  //  I'm assuming it works in SQLite because of whatever the default response is after doing an insert
  // PostgreSQL makes use of the .returning method to define which columns are included in the response object when doing
  //  POST and PUT requests. This is the reason I started using the same flavor of database from development to production.
  //
  // The function below is the one I used. I think the class and method solution works really well for GET and DELETE
  //  but the POST and PUT need a little more flexibility. Maybe that can be worked in, or they need a different approach.
  async insertProduct(newItem) {
    const [addedItem] = await db(this.tableName)
      .returning([
        "id",
        "productName",
        "fullSizeURL",
        "thumbnailURL",
        "description",
        "price",
        "storeID"
      ])
      .insert(newItem);

    return addedItem;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  find() {
    return db(this.tableName).select("*");
  }

  findBy(filter) {
    return db(this.tableName)
      .where("id", filter)
      .select("*")
      .first();
  }

  findBySPId(spOrderID) {
    return db(this.tableName)
      .where("spOrderID", spOrderID)
      .select("*")
      .first();
  } //may need to restrict what this returns after development, perhaps in the router that uses it by destructuring res.json

  findByOrderToken(orderToken) {
    return db(this.tableName)
      .where("orderToken", orderToken)
      .select("*")
      .first();
  }

  findByUsername(username) {
    return db(this.tableName)
      .where("username", username)
      .select("*")
      .first();
  }

  findByStoreName(store_name) {
    return db(this.tableName)
      .where("store_name", store_name)
      .select("*")
      .first();
  }
  //for finding user associated with id passed
  findById(id) {
    return db("users")
      .where("id", id)
      .select("*")
      .first();
  }

  updateById(id, changes) {
    return db(this.tableName)
      .where("id", id)
      .update(changes)
      .then((changesMade) => {
        if (changesMade > 0) {
          return this.findBy(id);
        } else {
          return null;
        }
      });
  }

  updateByUsername(username, changes) {
    return db(this.tableName)
      .where("username", username)
      .update(changes)
      .then((changesMade) => {
        if (changesMade > 0) {
          return this.findByUsername(username);
        } else {
          return null;
        }
      });
  }

  updateByOrderToken(orderToken, changes) {
    return db(this.tableName)
      .where("orderToken", orderToken)
      .update(changes)
      .then((changesMade) => {
        if (changesMade > 0) {
          return this.findByOrderToken(orderToken);
        } else {
          return null;
        }
      });
  }

  updateBySpOrderID(spOrderID, changes) {
    return db(this.tableName)
      .where("spOrderID", spOrderID)
      .update(changes)
      .then((count) => {
        if (count > 0) {
          return this.findBySPId(spOrderID);
        } else {
          return null;
        }
      });
  }

  removeById(id) {
    return db(this.tableName)
      .where("id", id)
      .del();
  }

  removeByOrderToken(orderToken) {
    return db(this.tableName)
      .where("orderToken", orderToken)
      .del();
  }

  removeByUsername(username) {
    return db(this.tableName)
      .where("username", username)
      .del();
  }

  removeByStoreName(store_name) {
    return db(this.tableName)
      .where("store_name", store_name)
      .del();
  }

  removeBySpOrderID(spOrderID) {
    return db(this.tableName)
      .where("spOrderID", spOrderID)
      .del();
  }
}

const Users = new Model("users");
const Stores = new Model("stores");
const Designs = new Model("designs");
const Quotes = new Model("quotes");
const Orders = new Model("orders");
const Products = new Model("products");

module.exports = { Users, Stores, Designs, Quotes, Orders, Products };
