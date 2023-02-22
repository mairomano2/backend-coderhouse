const express = require("express");
const usersRoutes = require("./routers/users.router");
const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", usersRoutes);

// Listen
app.listen(PORT, () => {
  console.log("Ready on port ", PORT);
});
