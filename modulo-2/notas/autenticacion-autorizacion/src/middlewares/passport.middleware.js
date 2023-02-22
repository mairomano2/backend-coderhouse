const passport = require("passport");
const userModel = require("../models/user.model");
const { hashPassword, isValidPassword } = require("../utils/utils");
// para usar estrategia local (que no sea de google, fb, etc) se importa passport-local
const LocalStrategy = require("passport-local").Strategy;
const GithubStragety = require("passport-github2").Strategy;
const CLIENT_ID = process.env.CLIENT_ID || null
const CLIENT_SECRET = process.env.CLIENT_SECRET || null

// como passport es un middleware se usa .use
passport.use(
  "register", // se nombra el metodo de autenticacion
  new LocalStrategy(
    // { passReqToCallback: true, usernameField: 'email' },
    {
      // primer parametro se pasa un obj de configuracion y el segundo un callback
      // pasa el req.body al callback
      passReqToCallback: true,
      // por defecto esta propedad busca una un "username". si no lo encuentra da error y hay que pasarle otro
      usernameField: "email",
    },
    async (req, username, password, done) => {
      const { firstName, lastName, age } = req.body;
      const user = await userModel.findOne({ email: username });
      //si hay un usuario se usa el done para cortar la ejecucion
      if (user) {
        console.log("entro false");
        done(null, false);
      } else {
        console.log("entro");
        const newUser = {
          firstName,
          lastName,
          age,
          email: username,
          password: hashPassword(password),
        };
        //se guarda el usario en la db
        const userDB = await userModel.create(newUser);
        const sessionUser = {
          _id: userDB._id,
          firstName: userDB.firstName,
          lastName: userDB.lastName,
          age: userDB.age,
          email: userDB.email,
        };
        done(null, sessionUser);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      const user = await userModel.findOne({ email: username });
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
            email: user.email,
          };
          done(null, sessionUser);
        }
      }
    }
  )
);

passport.use(
  new GithubStragety(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/session/github/callback",
    },
    // ahora la funcion recibe 4 parametros. por ahora solo se usan los ultimos dos
    async (accessToken, refreshToken, profile, done) => {
      //profile tiene una propiedad _json con toda la info del usuario
      const userData = profile._json
      const user = await userModel.findOne({ email : userData.email})
      // busca que el email del user no exista
      if(!user){
        const newUser = {
          // el split es para separar nombre y apellido porque github lo devuelve junto
          firstName: userData.name.split(" ")[0],
          lastName: userData.name.split(" ")[1],
          age: userData.age || null,
          email: userData.email || null,
          password: null,
          githubLogin: userData.login
        }
        // se guarda el usuario
        const saveUser = await userModel.create(newUser)
        done(null, saveUser._doc)
      } else {
        // va al done cuando se logea manualmente
        done(null, user)
      }
    }
  )
);

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
