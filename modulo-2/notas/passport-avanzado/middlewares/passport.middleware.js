const passport = require("passport");
const passportJwt = require("passport-jwt");
const { cookieExtractor } = require("../utils/utils");
const JwtStrategy = passportJwt.Strategy;
const SECRET_KEY = process.env.SECRET_KEY

// como jwt puede obtener la info desde cualquier parte del obj req, hay que especificarle de que parte va a salir (body, query, headers, etc)
const ExtractJwt = passportJwt.ExtractJwt;

// como passport no controla cookies se tiene que hacer una funcion personalizada
// para esto se utiliza cookie parser

// con esta funcion se declara la estrategia. recibe como primer param la estrategia, un obj de configuracion y callback
passport.use(
  new JwtStrategy(
  {
    // con esta propiedad se indica de donde se va a sacar la info, la clave secreta
    // (puede ser body, headers, cookies, etc. en este caso es un extractors personalizados declarados en utils)
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET_KEY,
  },
  async (jwtPayload, done) => {
    try {
      return done(null, jwtPayload)
    } catch (error) {
      return done(error)
    }
  }
  )
);

module.exports = passport