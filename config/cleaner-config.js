module.exports = {
  mysql: {
    skipTables: ['schema_migrations']
  },

  postgresql: {
    strategy: truncation,
    skipTables: ['schema_migrations']
  },

  sqlite: {
    skipTables: ['schema_migrations']
  },

  mongodb: {
      skipCollections: ['schema_migrations']
  }
}
