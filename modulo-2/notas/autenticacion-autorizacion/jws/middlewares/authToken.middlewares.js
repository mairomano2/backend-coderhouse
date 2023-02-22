const jwt = require("jsonwebtoken")
const SECTRET_KEY = process.env.SECTRET_KEY

const authToken = (req, res, next) => {
  // el token en general viene por los headers del req
  const authHeader = req.headers.authorization
  console.log("auth header", req.headers)
  if(!authHeader){
    res.status(401).json({error : "not authenticated"})
  } else {
    // se hace un split porque en general viene como Bearer [token]. asi se accede solo string de token
    const token = authHeader.split(" "[1])
    // para verificarlo se usa el metodo verify
    // el primer parametro es el token a verify, el segundo la clave secreta y el tercero un callback
    jwt.verify(token, SECTRET_KEY, (error, credentials) => {
      if(error){
        return res.status(403).json({ error : "not authorized"})
      } else {
        // se deja pasar la peticion y se guarda el el req la info del user
        req.user = credentials.user
        next()
      }
    })
  }
}

module.exports = authToken