const httpStatus = require("../constants/statusCodes");
const UsersMongoDAO = require("../models/dao/users.mongo.dao");
const UserModel = require("../models/models/user.schema");
const {
  apiSucessResponse,
  apiErrorResponse,
} = require("../utils/apiResponses.utils");
const { isValidPassword } = require("../utils/hashPassword.utils")
const { generateToken } = require("../utils/sessions.utils");
const secretKey = process.env.SECRET_KEY;


class SessionController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email})
    try {
      if(!user || !email || !password){
        res.status(400).json({
          success: false,
          description: "missing fields"
        }) 
      } else if(!isValidPassword){
        res.status(400).json({
          success: false,
          description: "incorrect password"
        })
      } else {
        const sessionUser = {
          email: user.email,
          name: user.firstName,
          id: user._id
        }
        const accessToken = generateToken(sessionUser);
        res.cookie(secretKey, accessToken, {
          maxAge: 60 * 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        req.session.sessionUser = sessionUser
        const response = apiSucessResponse(user);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // validador de si salio bien la creacion de la cookie
  static async currentSession(req, res, next) {
    console.log("current session1 ");
    // si todo salio bien se debería ver el req.user que esta seteado cuando se hace el login
    const user = req.user;
    next();
    if (!user) {
      return apiErrorResponse("session not created");
    } else {
      // console.log("current session 2")
      const response = apiSucessResponse(user);
      return res.json(response);
    }
  }
}

module.exports = SessionController;
