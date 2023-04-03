const express = require("express");
const passport = require("passport");
const usersRouter = require("./router/user.routes")
require("dotenv").config();
const PORT = 8080;
const app = express();

// middlewares
app.unsubscribe(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// routes
app.use("/users", usersRouter)

// start server
app.listen(PORT, () => {
  console.log("server running on port 8080");
});
