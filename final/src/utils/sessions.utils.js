const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const UserDAO = require("../models/dao/users.mongo.dao")
const userDAO = new UserDAO

const generateToken = (user) => {
  // sign firma la info del header para verificar que es segura. no ecripta la data del header
  // recibe 3 parametros: data, secret key y obj de configuracion del token
  const token = jwt.sign(user, secretKey, { expiresIn: "24h" });
  return token;
};

const changeLastConnection = async (sessionUser) => {
  try {
    const id = sessionUser.id
    const payload = { lastConnection: new Date().toString() };
    sessionUser.lastConnection = payload
    const lastSession = await userDAO.updateUser(id, payload)
    return lastSession
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { generateToken, changeLastConnection };
