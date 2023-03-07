const httpStatus = require("../constants/statusCodes");
const ProductsMongoDAO = require("../models/dao/products.mongo.dao");
const { apiSucessResponse } = require("../utils/apiResponses.utils");

const productsMongoDAO = new ProductsMongoDAO();

class ProductsController {
  static async getAll(req, res, next) {
    try {
      const products = await productsMongoDAO.getAll();
      const response = apiSucessResponse(products);
      res.status(httpStatus.ok).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsMongoDAO.getById(id);
      if (!product) {
        throw new Error({ status: 404, description: "product not found" });
      } else {
        const response = apiSucessResponse(product);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const payload = req.body;
    try {
      const newProduct = await productsMongoDAO.create(payload);
      const response = apiSucessResponse(newProduct);
      res.status(httpStatus.created).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      const updateProduct = await productsMongoDAO.updateById(id, payload);
      if (!updateProduct) {
        throw new Error("product not found");
      } else {
        const response = apiSucessResponse(updateProduct);
        res.status(httpStatus.created).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deleteProduct = await productsMongoDAO.delete(id);
      if (!deleteProduct) {
        throw new Error("product not found");
      } else {
        const response = apiSucessResponse(deleteProduct);
        res.status(httpStatus.ok).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
