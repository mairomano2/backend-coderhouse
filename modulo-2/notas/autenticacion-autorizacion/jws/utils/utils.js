const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECTRET_KEY;
const secretKey = "top-secret-51"

const generateToken = (user) => {
  // el metodo sing crea un token
  // parametros obligatorios: data con la que se va a crear el token y llave secreta
  const token = jwt.sign({ user }, secretKey, 
    // parametro opcional: obj d configuracion
    {
      // cuando expira
      expiresIn: "24h"
    }
  );
  return token
};
module.exports = generateToken

