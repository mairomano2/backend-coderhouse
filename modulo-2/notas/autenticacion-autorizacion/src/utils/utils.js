const bcrypt = require('bcrypt');

// hashSync se encarga deencriptar la contraseña. bycrypt.genSaltSync hace unprimer haseado que lluego
// se lo convierte en el hash real. el 10 es el numero de caracteres del primer haseado
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// compara si la constraseña hasheada en la db es igual a la contraseña que escribe el usuario
// antes de la compraracion la contraseña escrita se hashea
const isValidPassword = (userDB, password) => bcrypt.compareSync(password, userDB.password);

module.exports = {
  hashPassword,
  isValidPassword,
};