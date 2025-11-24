const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Asd@123",
  host: "localhost",
  port: "5432",
  database: "snap_trade",
});

module.exports = pool;
