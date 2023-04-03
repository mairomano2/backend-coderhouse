const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

// los extractors en passport siempre reciben el obj de la peticion como parametro
// extrae el token de una cookie
const cookieExtractor = (req) => {
  let token = null
  // checkea si hay req.cookies o cookies firmadas
  if(req.cookies && req.signed.cookies){
    token = req.cookies["cookieName"]
  }
  return token
}

module.exports = cookieExtractor