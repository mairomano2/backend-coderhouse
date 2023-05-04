const httpStatus = require("../constants/statusCodes");
const { apiSucessResponse } = require("../utils/apiResponses.utils")
const ProductsRepository = require("../models/reporitories/products.repository");

const productsRepository = new ProductsRepository();

class ProductsController {
  static async getAll(req, res, next) {
    try {
      const products = await productsRepository.getAll();
      const response = apiSucessResponse(products);
      res.status(httpStatus.ok).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsRepository.getById(id);
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

  static async createProduct(req, res, next) {
    const payload = req.body;
    try {
      const newProduct = await productsRepository.createProduct(payload);
      const response = apiSucessResponse(newProduct);
      res.status(httpStatus.created).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      const updateProduct = await productsRepository.updateProduct(id, payload);
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

  static async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const deleteProduct = await productsRepository.deleteProduct(id);
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
