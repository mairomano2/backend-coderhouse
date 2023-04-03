const { Router } = require("express");
const router = Router();

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.send("ya esta registrado, no se puede volver a registrar");
  } else {
    res.render("register");
  }
});

router.post("/register", (req, res) => {
  if (req.session.user) {
    res.send("ya esta logeado, no es necesario que se registre");
  } else {
    if (req.body.email && req.body.firstName) {
      req.session.isAdmin =
      req.body.email.split("@")[1].includes("admin") ?? false;

      req.session.user = {
        email: req.body.email,
        firstName: req.body.firstName,
        isAdmin: req.session.isAdmin,
      };
      res.redirect("/profile");
    } else {
      res.render("register");
    }
  }
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send("ya esta loggeado, no se puede volver a logear");
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => {
  // ver si ya hay sesion creada
  console.log("session", req.session.user);

  // chequea que esten los dos requerimientos
  if (req.body.email && req.body.firstName) {
    const isAdmin = req.body.email.split("@")[1].includes("admin") ?? false;
    req.session.user = {
      email: req.body.email,
      firstName: req.body.firstName,
      isAdmin: isAdmin,
    };
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

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

module.exports = router;
