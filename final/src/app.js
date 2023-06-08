const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
require("dotenv").config();
require("./config/config");
const apiRouter = require("./routers/apiRouter");
const mailRouter = require("./routers/mail/mail.router");
const twilioRouter = require("./routers/twilio/twilio.router");
const ChatManager = require("./models/dao/chat.mongo.dao")
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
app.use(express.static("../public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
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
const httpServer = app.listen(PORT, () => {
  console.log("server running in", PORT);
});

// SOCKETS
const io = new Server(httpServer);
const chatManager = new ChatManager();

io.on("connection", async (socket) => {
  console.log("New client connected");
  app.set("socket", socket);

  const data = await chatManager.getMessages();
  socket.emit("showMessages", data);

  socket.on("newMessage", async (msj) => {
    await chatManager.saveMessage(msj);
    const message = await chatManager.getMessages()
    socket.emit("showMessage", message);
  });
});