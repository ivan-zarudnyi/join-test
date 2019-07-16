module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './sqlite3.db'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './sqlite3-test.db'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  }


};
