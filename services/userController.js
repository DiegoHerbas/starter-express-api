const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const suscripcionController = require("./suscriptionController");


const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

async function createUser(user) {
  var query = `INSERT INTO user 
  (name, user_name, phone, password , photo) 
  VALUES 
  ("${user.name}", "${user.user_name}", "${user.phone}", "${user.password}", 
  "${b64toBlob(user.photo, 'image/jpg')}")`;

  console.info(query);
  const result = await db.query(query);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }
  return { message };
}

async function add_suscription(body) {

  console.log('user_name :>> ', body.user_name);
  var susc = await suscripcionController.getSuscripcionByCode(body.suscription_code);
  console.info("====================================");
  console.info(susc);
  var query = `UPDATE user
    SET  suscription_type_id=${susc.data[0].suscription_type_id}
    WHERE user_name="${body.user_name}"`

  console.info(query);
  const result = await db.query(query);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

async function login(user) {

  var query = `SELECT * FROM user WHERE user_name="${user.user_name}" AND password="${user.password}"`;

  console.info(query);
  const result = await db.query(query);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }
  return { message };
}



module.exports = {
  // getUser,
  createUser,
  add_suscription

};
