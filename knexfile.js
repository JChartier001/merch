module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      filename: "./databaseOperations/database.db3"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./databaseOperations/migrations"
    },
    seeds: {
      directory: "./databaseOperations/seeds"
    }
  },
  ////////////////////////////////////////////////////////

  testing: {
    client: "pg",
    connection: {
      filename: "./databaseOperations/test.db3"
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./databaseOperations/migrations"
    },
    seeds: {
      directory: "./databaseOperations/seeds"
    }
  },
  ////////////////////////////////////////////////////////

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./databaseOperations/migrations"
    },
    seeds: {
      directory: "./databaseOperations/seeds"
    }
  }
};
