const { Client } = require('pg');
const connectionString =  process.env.DATABASE_URL || "postgres://localhost:5432/graceshopper";
console.log(connectionString)
const client = new Client(connectionString);
module.exports = { client };