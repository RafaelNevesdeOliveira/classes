const { Pool } = require("pg")
// pool conecta uma vez ao banco sem precisar digitar login e senha, armazena o cache

module.exports = new Pool({
    user: 'postgres',
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: 'classes'
})