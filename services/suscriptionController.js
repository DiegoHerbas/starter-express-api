const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getSuscripcion(page = 1) {

  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT suscription_type_id, name, code
    FROM suscription_type LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getSuscripcionByCode(code) {

  var myQuery = `SELECT suscription_type_id, name, code
FROM suscription_type where code = "${code}"`;
  console.info(myQuery);
  const rows = await db.query(
    myQuery
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  getSuscripcion,
  getSuscripcionByCode
};
