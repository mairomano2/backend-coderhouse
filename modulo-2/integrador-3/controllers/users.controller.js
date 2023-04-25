const httpStatus = require("../constants/statusCodes");
const { apiSucessResponse } = require("../utils/apiResponses.utils");
const UsersRepositories = require("../models/reporitories/users.repository")
const hashPassword = require("../utils/hashPassword.utils")

const usersRepositories = new UsersRepositories();

class UsersController {
  static async getAll(req, res, next) {
    try {
      const users = await usersRepositories.getAll()
      const response = apiSucessResponse(users);
      res.status(httpStatus.ok).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id
    try {
      const user = await usersRepositories.getById(id)
      if (!user) {
        throw new Error({ status: 404, description: "user not found" });
      } else {
        const response = apiSucessResponse(user);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    try {
      if( !payload.firstName || !payload.email){
        throw new Error("missing fields")
      } else {
        const newUser = await usersRepositories.createUser(payload)
        const response = apiSucessResponse(newUser);
        res.status(httpStatus.created).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      const updatedUser = await usersRepositories.updateUser(id, payload)
      if (!updatedUser) {
        throw new Error("user not found");
      } else {
        const response = apiSucessResponse(updatedUser);
        res.status(httpStatus.created).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deletedUser = await usersRepositories.deleteUser(id)
      if (!deletedUser) {
        throw new Error("user not found");
      } else {
        const response = apiSucessResponse(deletedUser);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // static async userSavedProducts(req, res, next){
  //   const { cartId, userId } = req.body
  //   try {
  //     const updateUser = products
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

module.exports = UsersController;
