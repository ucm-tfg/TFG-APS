const mysql = require('mysql');


const knex = require("knex")({
            client: "mysql",
            connection: "postgres://root:@localhost:3306/aps",
            pool : { min:0, max:10 }
});

module.exports= knex;