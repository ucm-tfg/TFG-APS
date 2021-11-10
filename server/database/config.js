const knex = require("knex")({
  client: "mysql",
  connection: {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'aps'
  }
});
module.exports = knex;


