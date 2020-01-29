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
        users.date('date_created', 255).defaultTo(Date.now()).notNullable();
        users.date('date_updated', 255).defaultTo(Date.now()).notNullable();
        users.string('support_pin', 10);
    })

    .createTable("stores", stores => {
        stores.increments('storeID').primary();
        stores.boolean('active').defaultTo(true);
        stores.string('store_name', 255).unique().notNullable();
        stores.string('hero_ImageURL', 255).defaultTo('https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png').notNullable();
        stores.string('logo_url', 255).defaultTo('https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png').notNullable();
        stores.date('date_created').defaultTo(Date.now()).notNullable();
        stores.date('date_updated').defaultTo(Date.now()).notNullable();
    })

    .createTable("category", category => {
        category.increments('categoryID').primary();
        category.string('category_name', 255).unique().notNullable();
        category.string('decription', 255).notNullable();
        category.string('picture', 255);
        category.boolean('active').defaultTo(false);
    })

    .createTable("products", products => {
        products.increments('productID').primary();        
        products.boolean('active').defaultTo(true);
        products.integer('SKU');
        products.string('product_name', 50).notNullable();
        products.string('product_description', 500).notNullable();
        products.integer('quantity_per_unit').defaultTo(1);
        products.integer('unit_price').notNullable();
        products.string('available_size', 20);
        products.string('size', 20);
        products.string('available_color', 20);
        products.string('color', 20);
        products.decimal('discount', null);
        products.boolean('product_available').defaultTo(true);
        products.boolean('discount_available').defaultTo(false);
        products.string('picture', 255).notNullable();
        products.string('note', 500);
        products.integer('store_name').unsigned().notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        products.integer('categoryID').unsigned().notNullable().references('categoryID').inTable('category').onUpdate('CASCADE').onDelete('CASCADE');
    })

    .createTable("orders", orders => {
        orders.increments('orderID').primary();
        orders.string('shipper', 255).notNullable();
        orders.integer('order_number').notNullable().unique();
        orders.integer('payment_number').notNullable();
        orders.date('order_date').notNullable();
        orders.date('payment_date').notNullable();
        orders.date('ship_date').notNullable();
        orders.timestamp('time_stamp').defaultTo(knex.fn.now());
        orders.string('err_message', 255);
        orders.boolean('paid').defaultTo(false);
        orders.integer('userID').unsigned().notNullable().references('userID').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })

    .createTable("users_store", users_store => {
        users_store.increments('users_storeID').primary();
        users_store.boolean('admin').defaultTo(false);
        users_store.integer('store_name').unsigned().notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        users_store.integer('username').unsigned().notNullable().references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })

    .createTable("order_details", order_details => {
        order_details.increments('order_detailID').primary();
        order_details.integer('price').notNullable();
        order_details.integer('quantity').notNullable();
        order_details.decimal('discount', null);
        order_details.integer('total').notNullable();
        order_details.string('size', 50).notNullable();
        order_details.string('color', 50).notNullable();
        order_details.string('ship_date', 50).notNullable();
        order_details.integer('storeID').unsigned().notNullable().references('storeID').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        order_details.integer('productID').unsigned().notNullable().references('productID').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
        order_details.integer('orderID').unsigned().notNullable().references('orderID').inTable('orders').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("order_details")
    .dropTableIfExists("users_store")
    .dropTableIfExists("orders")
    .dropTableIfExists("products")
    .dropTableIfExists("category")
    .dropTableIfExists("stores")
    .dropTableIfExists("users");
};