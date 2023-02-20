const passport = require("passport");
const userModel = require("../models/user.model");
const { hashPassword, isValidPassword } = require("../utils/utils");
// para usar estrategia local (que no sea de google, fb, etc) se importa passport-local
const LocalStrategy = require('passport-local').Strategy;

// como passport es un middleware se usa .use
passport.use(
  "register", // se nombra el metodo de autenticacion
  new LocalStrategy(
    {
      // primer parametro se pasa un obj de configuracion y el segundo un callback
      // pasa el req.body al callback
      passReqToLocalCallback: true,
      // por defecto esta propedad busca una un "username". si no lo encuentra da error y hay que pasarle otro
      usernameField: "email",
    },
    async (username, password, done) => {
      console.log("req", req)
      const { firstName, lastName, age } = req.body;
      const user = await userModel.findOne({ email: username });
      //si hay un usuario se usa el done para cortar la ejecucion
      if (user) {
        done(null, false);
      } else {
        const newUser = {
          firstName,
          lastName,
          age,
          email: username,
          password: hashPassword(password)
        };
        const userDB = await UserModel.create(newUser);
        const sessionUser = {
          _id: userDB._id,
          firstName: userDB.firstName,
          lastName: userDB.lastName,
          age: userDB.age,
          email: userDB.email
        };
        done(null, sessionUser);
      }
    }
  )
);

passport.use("login", new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    const user = await UserModel.findOne({ email: username });
      if (!user) {
        done(null, false);
      } else {
        if (!isValidPassword(user, password)) {
          done(null, false);
        } else {
          const sessionUser = {
            _id: user._id,
            firstName: user.firstName,
            lastme: user.lastme,
            age: user.age,
            email: user.email
          };
          done(null, sessionUser);
        }
      }
  }
));

// serializeUser es para guardar solo el id del usuario en la sesion
passport.serializeUser((user, done) => {
  // user llega del done del middleware
  done(null, user._id);
});

// se usa para cuando se lo busca lo devuelve
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

module.exports = passport;
