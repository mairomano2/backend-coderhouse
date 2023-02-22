const { Router } = require("express");
const authToken = require("../middlewares/authToken.middlewares");
const generateToken = require("../utils/utils");
const router = Router();
const users = [];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    res.status(400).send("no coincide usuario o contraseña");
  } else {
    const accesToken = generateToken(user);
    res.json({ accesToken });
  }
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    res.send("el usuario ya existe");
  } else {
    const newUser = { email: email, password:password };
    users.push(newUser);
    const accesToken = generateToken(newUser);
    // const accesToken = generateToken(newUser);
    res.json({ accesToken });
  }
});

// devuelve la info del usuario que tiene su sesion activa (deberia ser privado)
router.get("/current", authToken, (req, res) => {
  // no hay que verificar nada porque si llega hasta esta parte ya paso por el middleware
  res.json({ payload: req.user });
});

module.exports = router;
