const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY

const generateToken = (user) => {
  // sign firma la info del header para verificar que es segura. no ecripta la data del header
  // recibe 3 parametros: data, secret key y obj de configuracion del token
  const token = jwt.sign(user, secretKey, { expiresIn: "24h"})
  return token
}

// se usa en passport para traer el token de la cookie. tiene acceso al req
const cookieExtractor = (req) => {
  let token = null
  // el token si req.cookies viene vacio queda en null y sino se le asigna el valor de la cookie
  if( req && req.cookies){
    let token = req.cookies[secretKey]
  }
  return token
}

module.exports = { generateToken, cookieExtractor }