const knex = require("knex")({
  client: "mysql",
  connection: {
    host: '192.168.1.190',
    port: 3306,
    user: 'root',
    password: 'test',
    database: 'aps'
  }
});
module.exports = knex;
