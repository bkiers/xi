const path = require('path');
const environment = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve('config', `${environment}.env`),
});

module.exports = {
  development: {
    dialect: process.env.XI_DB_DIALECT,
    storage: process.env.XI_DB_STORAGE,
    host: process.env.XI_DB_HOST,
    port: process.env.XI_DB_PORT,
    database: process.env.XI_DB_DB,
    username: process.env.XI_DB_USER,
    password: process.env.XI_DB_PASSWORD,
    logging: process.env.XI_DB_LOGGING,
  },
  production: {
    dialect: process.env.XI_DB_DIALECT,
    storage: process.env.XI_DB_STORAGE,
    host: process.env.XI_DB_HOST,
    port: process.env.XI_DB_PORT,
    database: process.env.XI_DB_DB,
    username: process.env.XI_DB_USER,
    password: process.env.XI_DB_PASSWORD,
    logging: process.env.XI_DB_LOGGING,
  },
};
