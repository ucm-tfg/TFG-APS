const mysql = require ('mysql');
const knex = require("knex")({
    client: "mysql",
    connection: "postgres://root:@localhost:3306/aps",
    pool : { min:0, max:50 }
    });
    knex.select().table('usuario').then((rows) => {
    for (row of rows) {
        console.log(row['correo']);
    }
});

module.exports = {knex};