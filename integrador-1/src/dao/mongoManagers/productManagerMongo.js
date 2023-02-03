const productsModel = require("../../models/products.models");

class ProductManagerMongo {
  async getAll() {
    const products = await productsModel.find();
    return products;
  }

  async saveProduct(product) {
    const newProduct = await productsModel.create(product);
    return newProduct;
  }

  async getProductById(id) {
    console.log("products");
    const products = await productsModel.findById({ _id: id });
    return products;
  }

  async updateProduct(id, product) {
    let updatedProduct = await productsModel.findByIdAndUpdate(id, product);
    console.log(updatedProduct)
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(id)
    return deletedProduct;
  }
}

module.exports = ProductManagerMongo;
