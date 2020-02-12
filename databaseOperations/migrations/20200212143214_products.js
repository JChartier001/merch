exports.up = function(knex) {
  return knex.schema.createTable("products", products => {
    products.increments("productID").primary();
    products.string("productName", 255).notNullable();
    products.string("fullSizeURL", 500).notNullable();
    products.string("thumbnailURL", 500).notNullable();
    products.string("description", 500).defaultTo("None");
    products.decimal("price").defaultTo("None");
    products
      .integer("storeID")
      .notNullable()
      .references("storeID")
      .inTable("stores")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    products.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("products");
};
