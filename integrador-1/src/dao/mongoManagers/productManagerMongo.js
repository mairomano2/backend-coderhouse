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
    const product = await productsModel.findOne({ id });
    return product;
  }

  async updateProduct(product, id) {
    const updatedUser = await productsModel.findByIdAndUpdate({ id }, product, {
      new: true,
    });
    return updatedUser;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(
      { id },
      (err) => {
        if (err) {
          console.log("hubo un error: ", err);
        }
      }
    );
    return deletedProduct;
  }
}

module.exports = ProductManagerMongo;
