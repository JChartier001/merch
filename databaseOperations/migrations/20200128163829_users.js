exports.up = function(knex) {
    return knex.schema
        .createTable("users", users => {
        users.increments('userID').primary();
        users.string('first_name', 255).notNullable();
        users.string('last_name', 255).notNullable();
        users.string('username', 255).notNullable().unique();
        users.string('password', 255).notNullable();
        users.boolean('seller').defaultTo(false).notNullable();
        users.string('address1', 255).notNullable();
        users.string('address2', 255).notNullable();
        users.string('city', 255).notNullable();
        users.string('state', 255).notNullable();
        users.integer('zip_code').notNullable();
        users.string('country', 255).notNullable();
        users.string('phone', 20);
        users.string('email', 255).notNullable();
        users.string('billing_address', 255).notNullable();
        users.string('billing_city', 255).notNullable();
        users.string('billing_zip_code', 255).notNullable();
        users.string('billing_country', 255).notNullable();
        users.string('shipping_address', 255).notNullable();
        users.string('shipping_city', 255).notNullable();
        users.string('shipping_zip_code', 255).notNullable();
        users.string('shipping_country', 255).notNullable();
        users.date('date_created', 255).defaultTo(knex.raw('now()')).notNullable();
        users.date('date_updated', 255).defaultTo(knex.raw('now()')).notNullable();
        users.string('support_pin', 10);
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users");
};