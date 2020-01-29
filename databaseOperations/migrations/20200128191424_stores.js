exports.up = function(knex) {
    return knex.schema
        .createTable("stores", stores => {
        stores.increments('storeID').primary();
        stores.integer('productID').notNullable();
        stores.boolean('active').defaultTo(true);
        stores.string('store_name', 255).unique().notNullable();
        stores.string('hero_ImageURL', 255).defaultTo('https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png').notNullable();
        stores.string('logo_url', 255).defaultTo('https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png').notNullable();
        stores.date('date_created').defaultTo(knex.raw('now()')).notNullable();
        stores.date('date_updated').defaultTo(knex.raw('now()')).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("stores");
};