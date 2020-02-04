exports.up = function(knex) {
    return knex.schema
        .createTable("users", users => {
        users.increments('userID').primary();
        users.string('first_name', 255).notNullable();
        users.string('last_name', 255).notNullable();
        users.string('username', 255).notNullable().unique();
        users.string('password', 255).notNullable();
        users.boolean('seller').defaultTo(false).notNullable();
        users.string('stripe_account', 255).notNullable();
        users.string('address1', 255).notNullable();
        users.string('address2', 255);
        users.string('city', 255).notNullable();
        users.string('state', 255).notNullable();
        users.integer('zip_code').notNullable();
        users.string('country', 255).notNullable();
        users.integer('phone', 20);
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
        stores.string('logo_url', 255).defaultTo('https://uxmasters.org/images/ant_logo.svg').notNullable();
        stores.date('date_created').defaultTo(Date.now()).notNullable();
        stores.date('date_updated').defaultTo(Date.now()).notNullable();
    })
    
    .createTable("quotes", quotes => {
        quotes.increments('orderID').primary();
        quotes.decimal('total', null).notNullable();
        quotes.decimal('subtotal', null).notNullable();
        quotes.decimal('tax', null).notNullable();
        quotes.decimal('fees', null).notNullable();
        quotes.decimal('shipping', null).notNullable();
        quotes.string('orderToken', 255).unique().notNullable();
        quotes.string('warnings', 255).notNullable();
        quotes.string('mode', 255).notNullable();
        quotes.string('store_name', 255).notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        quotes.string('username', 255).notNullable().references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })

    
    .createTable("users_store", users_store => {
        users_store.increments('user_storeID').primary();
        users_store.boolean('admin').defaultTo(false);
        users_store.string('store_name', 255).notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        users_store.string('username', 255).notNullable().references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })
    
    .createTable("orders", orders => {
        orders.increments('orderID').primary();
        orders.string('status', 255).notNullable();
        orders.decimal('total', null).notNullable();
        orders.decimal('subtotal', null).notNullable();
        orders.decimal('tax', null).notNullable();
        orders.decimal('fees', null).notNullable();
        orders.decimal('shipping', null).notNullable();
        orders.string('orderToken', 255).unique().notNullable();
        orders.string('spOrderID', 255).unique().notNullable();       
        orders.string('mode', 255).notNullable();
        orders.string('createdAt', 255).notNullable();
        orders.string('store_name', 255).notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        orders.string('username', 255).notNullable().references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })

    .createTable("designs", design_urls => {
        design_urls.increments('designID').primary();
        design_urls.string('design_url', 255).notNullable();
        design_urls.string('store_name', 255).notNullable().references('store_name').inTable('stores').onUpdate('CASCADE').onDelete('CASCADE');
        design_urls.string('username', 255).notNullable().references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("design_urls")
    .dropTableIfExists("orders")
    .dropTableIfExists("users_store")
    .dropTableIfExists("quotes")
    .dropTableIfExists("stores")
    .dropTableIfExists("users");
};