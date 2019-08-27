const { Client } = require('pg');

// Add code for local.

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = client;