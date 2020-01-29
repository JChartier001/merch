exports.up = function(knex) {
    return knex.schema
        .createTable("products", products => {
        products.increments('productID').primary();
        products.integer('storeID').notNullable();
        products.integer('categoryID').notNullable();
        products.boolean('active').defaulTo(true);
        products.integer('SKU');
        products.string('product_name', 50).notNullable();
        products.string('product_description', 500).notNullable();
        products.integer('quantity_per_unit').defaulTo(1);
        products.integer('unit_price').notNullable();
        products.string('available_size', 20);
        products.string('size', 20);
        products.string('available_color', 20);
        products.string('color', 20);
        products.decimal('discount', null);
        products.boolean('product_available').defaulTo(true);
        products.boolean('discount_available').defaulTo(false);
        products.string('picture', 255).notNullable();
        products.string('note', 500);
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("products");
};