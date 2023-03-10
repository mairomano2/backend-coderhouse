const httpStatus = require("../constants/statusCodes");
const UsersMongoDAO = require("../models/dao/users.mongo.dao");
const {
  apiSucessResponse,
  apiErrorResponse,
} = require("../utils/apiResponses.utils");
const {generateToken} = require("../utils/sessions.utils");
const secretKey = process.env.SECRET_KEY;

const usersMongoDAO = new UsersMongoDAO();

class SessionController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await usersMongoDAO.getByEmail({email : email});
      if (!user || user.password !== password) {
        throw new Error({
          status: httpStatus.badRequest,
          description: "user not found",
        });
      } else {
        // se crea el token del usuario
        const accessToken = generateToken(user);
        // se setea la cookie con la secretkey, payload y obj de configuracion
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
    console.log("current session1 ")
    // si todo salio bien se debería ver el req.user que esta seteado cuando se hace el login
    const user = req.user;
    if (!user) {
      return apiErrorResponse("session not created");
    } else {
      // console.log("current session 2")
      const response = apiSucessResponse(req.user);
      return res.json(response);
    }
  }
}

module.exports = SessionController;
