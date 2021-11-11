const knex = require("knex")({
  client: "mysql",
  connection: {
    host: 'remotemysql.com',
    user: 'lrXKmZQ8mG',
    password: 'DLtsUeePmE',
    database: 'lrXKmZQ8mG'
  }
});
module.exports = knex;


