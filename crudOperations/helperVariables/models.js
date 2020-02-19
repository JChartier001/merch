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
      .select("*");
  }

  findById(id) {
    return db("users")
      .where("userID", id)
      .select("*")
      .first();
  }

  update(id, item) {
    return db(this.tableName)
      .where({ id })
      .update(item)
      .returning("*");
  }

  remove(id) {
    return db(this.tableName)
      .where({ id })
      .del();
  }
}

const Users = new Model("users");
// const Classes = new Model('classes');
// const Categories = new Model('categories');
// const ClassClients = new Model('class_clients');
module.exports = { Users };
