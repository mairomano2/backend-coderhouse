const express = require("express");
const hanblebars = require("express-handlebars");
const MongoStore = require("connect-mongo")
const sessionRouter = require("./routers/sessionRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authMeddleware = require("./meddlewares/auth.meddleware");
const PORT = process.env.PORT || 8080;
const app = express();

// HANDLEBARS ENGINE
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));
app.use(cookieParser());
app.use(
  session({
    name: "session1",
    secret: "top-secret-51",
    resave: false,
    saveUninitialized: false,
    //conecta a la db con las configuraciones
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://juan:test1234@cluster0.curtjyb.mongodb.net/sessions?retryWrites=true&w=majority"
    })
  })
);

// ROUTERS
app.get("/", (req, res) => {
  7;
  console.log(req.session);
  res.render("home");
});

app.get("/login",  (req, res) => {
  // ver si ya hay sesion creada
  if (req.session.user) {
    res.send("ya esta loggeado, no se puede volver a logear");
  } else {
    // chequea que esten los dos requerimientos
    if (req.query.email && req.query.firstName) {
      const isAdmin = req.query.email.split("@")[1].includes("admin") ?? false;
      req.session.user = {
        email: req.query.email,
        firstName: req.query.firstName,
        isAdmin: isAdmin,
      };
      res.redirect("/profile");
    } else {
      res.render("login");
    }
  }
});

app.get("/register", (req, res) => {
  if (req.session.user) {
    res.send("ya esta logeado, no es necesario que se registre");
  } else {
    if (req.query.email && req.query.firstName) {
      // res.render("register")
      req.session.isAdmin =
        req.query.email.split("@")[1].includes("admin") ?? false;
      req.session.user = {
        email: req.query.email,
        firstName: req.query.firstName,
        isAdmin: req.session.isAdmin,
      };
      console.log(req.session.user);
      res.redirect("/profile");
    } else {
      res.render("register");
    }
  }
});

app.get("/profile", authMeddleware, (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    res.render("profile", { user });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
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

app.use("/api/session", sessionRouter);

// RUN SERVER
app.listen(PORT, () => {
  console.log("server running on port 8080");
});
