exports.up = function(knex) {
    return knex.schema
        .createTable("orders", orders => {
        orders.increments('orderID').primary();
        orders.integer('userID').notNullable();
        orders.string('shipper', 255).notNullable();
        orders.increments('order_number').notNullable().unique();
        orders.integer('payment_number').notNullable();
        orders.date('order_date').notNullable();
        orders.date('payment_date').notNullable();
        orders.date('ship_date').notNullable();
        orders.timestamp('time_stamp').defaultTo(knex.fn.now());
        orders.string('err_message', 255);
        orders.boolean('paid').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("orders");
};