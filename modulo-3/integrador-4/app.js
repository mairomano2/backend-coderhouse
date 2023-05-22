const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();
require("./config/config");
const apiRouter = require("./routers/apiRouter");
const mailRouter = require("./routers/mail/mail.router");
const twilioRouter = require("./routers/twilio/twilio.router");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express"); // se usa serve y setup
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

// Instanciamos servidor express
const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      description: "Ecommerce API",
      version: "1.0.0",
      contact: {
        name: "Mailo Romano",
        email: "mairomano2@gmail.com",
      },
    },
  },
  apis: [`${process.cwd()}/docs/**/*.yaml`],
};

const spec = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get("/", (req, res) => {
  res.send("hola");
});
app.use("/api/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
app.use("/api", apiRouter);
app.use("/mail", mailRouter);
app.use("/sms", twilioRouter);

// Listen
const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is up and running on ${PORT}`)
});

// Server error
server.on("error", (error) => {
  console.error(error);
});
