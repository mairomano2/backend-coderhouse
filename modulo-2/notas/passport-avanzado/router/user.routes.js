const { Router } = require("express")
//no se trae passport de la libreria, sino que del middleware
const passport = require("../middlewares/passport.middleware")
const router = Router()

router.post("/login", (req, res) => {});

// el middleware deja pasar o no al callback segun como se autentique
app.get(
  "/current",
  // passport.authenticate es el middleware qe deja o no pasar la request
  passport.authenticate("jwt", // estrategia
  { session: false }), // obj de config. se pone en false la session porque 
  (req, res) => {
    res.json({payload: req.user})
  }
);

module.exports = router
