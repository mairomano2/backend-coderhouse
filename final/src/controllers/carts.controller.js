const httpStatus = require("../constants/statusCodes");
const { apiSucessResponse } = require("../utils/apiResponses.utils");
const CartsRepository = require("../models/reporitories/carts.repository");

const cartsRepository = new CartsRepository();

class CartsController {
  static async getAll(req, res, next) {
    try {
      const carts = await cartsRepository.getAll();
      const response = apiSucessResponse(carts);
      const responsePayload = {
        products: response.payload.map( user => {
          return {
            title: user.title,
            description: user.description,
            code: user.code,
            price: user.price,
            status: user.status,
            stock: user.stock,
            category: user.category,
          }
        })
      }
      res.status(httpStatus.ok).render("carts", responsePayload)
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await cartsRepository.getById(id);
      if (!cart) {
        throw new Error({ status: 404, description: "cart not found" });
      } else {
        const response = apiSucessResponse(cart);
        const responsePayload = {
          products: response.payload.map( user => {
            return {
              title: user.title,
              description: user.description,
              code: user.code,
              price: user.price,
              status: user.status,
              stock: user.stock,
              category: user.category,
            }
          })
        }
        res.status(httpStatus.ok).render("carts", responsePayload);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    const payload = req.body;
    try {
      const newCart = await cartsRepository.createCart(payload);
      const response = apiSucessResponse(newCart);
      res.status(httpStatus.created).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async purchase(req, res, next) {
    try {
      return "purchase";
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartsController;
