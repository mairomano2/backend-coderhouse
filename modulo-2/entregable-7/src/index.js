const express = require("express");
const hanblebars = require("express-handlebars");
const MongoStore = require("connect-mongo")
const sessionRouter = require("./routers/sessionRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authMeddleware = require("./middlewares/auth.meddleware");
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
      mongoUrl: "mongodb+srv://juan:test1234@cluster0.curtjyb.mongodb.net/sessions?retryWrites=true&w=majority",
      ttl: 3600
  })
  })
);

// ROUTERS
app.get("/", (req, res) => {
  console.log(req.session);
  res.render("home");
});

app.get("/profile", authMeddleware, (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    res.render("profile", { user });
  } else {
    res.redirect("/api/session/login");
  }
});

app.use("/api/session", sessionRouter);

// RUN SERVER
app.listen(PORT, () => {
  console.log("server running on port 8080");
});
