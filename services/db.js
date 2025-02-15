const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  console.info(config.db);
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
