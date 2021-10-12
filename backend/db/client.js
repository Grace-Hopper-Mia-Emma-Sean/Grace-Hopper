const { Client } = require('pg') 
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/capstone'
const client = new Client(
    connectionString
);

module.exports = client

//TO DO: be sure to do PostgreSQL in terminal and create the database there first. Name database as "capstone" for the link in line 2.

