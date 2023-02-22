const { Router } = require("express");
const router = Router();
const userModel = require("../models/user.model");
const passportMiddlware = require("../middlewares/passport.middleware");
const { hashPassword, isValidPassword } = require("../utils/utils");
const passport = require("../middlewares/passport.middleware");

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.send("ya esta registrado, no se puede volver a registrar");
  } else {
    res.render("register");
  }
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send("ya esta loggeado, no se puede volver a logear");
  } else {
    res.render("login");
  }
});
// AUTENTICACION CON PASSPORT
router.post(
  "/register",
  // autenticate recibe el primer param obligatorio que es el metodo con el cual se va a autenticar, un segundo opcional y una funcion de controlador
  passportMiddlware.authenticate("register", {
    // tiene que ser igual al declarado en el middleware
    failureRedirect: "/register", // funciona como un redirect en caso de que algo salga mal
  }),
  // callback controlador
  (req, res) => {
    console.log("sessionR req", req.session.passport.user);
    const sessionUser = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.user = sessionUser;
    res.status(400).send("registrado con exito")
  }
);

router.post(
  "/login",
  // autenticate recibe el primer param obligatorio que es el metodo con el cual se va a autenticar, un segundo opcional y una funcion de controlador
  passportMiddlware.authenticate("login", {
    // tiene que ser igual al declarado en el middleware
    failureRedirect: "/login", // funciona como un redirect en caso de que algo salga mal
  }),
  // se guardan los datos de la sesion y se hace el redirect
  (req, res) => {
    if (!req.session.user) {
      return res
        .status(400)
        .json({ status: "error", error: "Wrtong user or password" });
    }
    // se guarda la sesion
    const sessionUser = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.user = sessionUser;
    res.status(400).send("logeado con exito");
  }
);

// AUTENTICACION CON GITHUB
// sea crea el middleware para la autenticacion
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate(
    "github",
    { failureRedirect: "api/session/login" },
    async (req, res) => {
      console.log(req.user)
      const sessionUser = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
      };
      req.session.user = sessionUser;
      res.redirect("/profile");
    }
  )
);

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("session1");
        res.redirect("/");
      }
    });
  } else {
    res.send("no se puede desloggear si no esta logeado");
  }
});

// AUTENTICACION SIN PASSPORT
// router.post("/register", async (req, res) => {
//   //ve si hay sesion
//   if (req.session.user) {
//     res.send("ya esta logeado, no es necesario que se registre");
//     //si no la hay se ve si en la db ya existe ese mail
//   } else {
//     const { firstName, lastName, age, email, password } = req.body;
//     const user = await userModel.findOne({ email: email });
//     if (!user) {
//       const newUser = {
//         firstName,
//         lastName,
//         age,
//         email,
//         password: hashPassword(password),
//       };
//       await userModel.create(newUser);
//       // si no existe se lo sube a la db y se crea la sesion
//       const isAdmin = email.split("@")[1].includes("admin") ?? false;
//       req.session.user = {
//         firstName: firstName,
//         lastName: lastName,
//         age: age,
//         email: email,
//         isAdmin: isAdmin,
//       };
//       res.redirect("/profile");
//       // si ya existe se devuelve un error
//     } else {
//       res.send("este usuario ya existe");
//     }
//   }
// });

// router.post("/login", async (req, res) => {
//   // chequea que esten los dos requerimientos
//   if (req.body.email && req.body.password) {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });

//     //si el usuario no exisrte devuelve error
//     if (!user) {
//       res.send("user not found");
//     } else {
//       // si lo hay se corrobora la contraseña
//       if (isValidPassword(user, password)) {
//         const isAdmin = req.body.email.split("@")[1].includes("admin") ?? false;
//         req.session.user = {
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           age: user.age,
//           isAdmin: isAdmin,
//         };
//         res.redirect("/profile");
//       }
//     }
//   } else {
//     res.render("/api/session/login");
//   }
// });

module.exports = router;
