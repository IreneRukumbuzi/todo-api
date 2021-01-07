require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'Umutekano',
    database: 'todosdb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'poostgres',
    password: 'Umutekano',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'Umutekano',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
