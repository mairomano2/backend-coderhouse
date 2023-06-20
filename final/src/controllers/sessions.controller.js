const httpStatus = require("../constants/statusCodes");
const UserModel = require("../models/models/user.schema");
const { apiSucessResponse } = require("../utils/apiResponses.utils");
const { isValidPassword } = require("../utils/hashPassword.utils");
const { generateToken, changeLastConnection } = require("../utils/sessions.utils");
const secretKey = process.env.SECRET_KEY;


class SessionController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user || !email || !password) {
        res.status(400).json({
          success: false,
          description: "missing fields",
        });
      } else if (!isValidPassword) {
        res.status(401).json({
          success: false,
          description: "incorrect password",
        });
      } else {
        const sessionUser = {
          email: user.email,
          name: user.firstName,
          id: user._id,
          role: user.role,
          lastConnection: user.lastConnection
        };

        req.session.sessionUser = sessionUser;

        const result = await changeLastConnection(sessionUser)
        console.log(result)

        const accessToken = generateToken(sessionUser);
        res.cookie(secretKey, accessToken, {
          maxAge: 60 * 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        const response = apiSucessResponse(user);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // validador de si salio bien la creacion de la cookie
  static async currentSession(req, res, next) {
    // si todo salio bien se debería ver el req.user que esta seteado cuando se hace el login
    const user = req.session.sessionUser;
    try {
      if (!user) {
        res.send("sesion no iniciada");
      } else {
        const response = apiSucessResponse(user);
        return res.json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    if (!req.session.sessionUser) {
      res.send("No hay una sesion iniciada");
    } else {
      await changeLastConnection(req.session.sessionUser)
      req.session.destroy(async (err) => {
        res.send("se borro la sesion");
      });
    }
  }
}

module.exports = SessionController;
