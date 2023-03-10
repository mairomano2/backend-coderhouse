const passport = require("passport");
const passportJwt = require("passport-jwt");
const secretKey = process.env.SECRET_KEY;
const cookieExtractor = require("../utils/sessions.utils");
const statusCodes = require("../constants/statusCodes");

// se pone que estrategia se va a usar
const JwtStrategy = passportJwt.Strategy;
// se le dice a passport donde se va a buscar el token
const ExtractJwt = passportJwt.ExtractJwt;

// se agrega la estrategia
// primer parametro obj de configuracion y el segundo un callback
passport.use(
  new JwtStrategy(
    {
      //require al menos 2 parametros: clave secreta y de donde se toma el token
      secretOrKey: secretKey,
      // ExtractJwt tiene multiples metodos para extraer cookies
      // a from Extractors se le pasa como param un array de los extractores
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    async (jwt_payload, done) => {
      try {
        console.log("try passport");
        done(null, jwt_payload);
      } catch (error) {
        console.log("catch passport");
        done(error);
      }
    }
  )
);

// middleware costumizado para autenticar una request
const passportCustom = (stragety, options = {}) => {
  return async (req, res, next) => {
    // authenticate recibe como parametro la estrategia, un obj de configuracion y un callback
    passport.authenticate(
      stragety,
      { session: false, ...options },
      (error, user, info) => {
        if (error) {
          return next(error);
        } else if (!user) {
          return res
            .status(statusCodes.unauthorized)
            .json({ error: info.messages ?? `${info}` });
        } else {
          req.user = user;
          next();
        }
      }
    )(req, res, next);
  };
};

// const passportCustom = (strategy, options = {}) => {
//   return async (req, res, next) => {
//     await passport.authenticate(
//       strategy,
//       { session: false, ...options },
//       (error, user, info) => {
//         if (error) {
//           return next(error);
//         }
//         if (!user) {
//           return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: info.messages ?? `${info}`})
//         }
//         req.user = user;
//         next();
//       }
//     )(req, res, next);
//   }
// };

module.exports = passportCustom;
