const db = require("../../databaseOperations/db-config");

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  insert(newItem) {
    return db(this.tableName)
      .insert(newItem)
      .then(ids => {
        const [id] = ids;
        return this.findBy(id);
      });
  }

  find() {
    return db(this.tableName).select("*");
  }

  findBy(filter) {
    return db(this.tableName)
      .where("id", filter)
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
      .then(changesMade => {
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
      .then(changesMade => {
        if (changesMade > 0) {
          return this.findByUsername(username);
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
}

const Users = new Model("users");
const Stores = new Model("stores");
const Designs = new Model("designs");
// const ClassClients = new Model('class_clients');
module.exports = { Users, Stores, Designs };
