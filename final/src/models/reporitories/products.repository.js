const ProductDAO = require("../dao/products.mongo.dao")
const { SaveProductDTO, UpdateProductDTO } = require("../dto/products.dto")

const productDAO = new ProductDAO()

class ProductsRepository{
  async getAll(){
    const products = await productDAO.getAll()
    return products
  }

  async getById(id){
    const product = await productDAO.getById(id)
    return product
  }

  async createProduct(payload){
    console.log("Product payload", payload)
    const productPayload = new SaveProductDTO(payload)
    const product = await productDAO.createProduct(productPayload)
    return product
  }

  async updateProduct(payload){
    const productPayload = new UpdateProductDTO(payload)
    const product = await productDAO.updateProduct(productPayload)
    return product
  }

  async deleteProduct(id){
    const product = await productDAO.deleteProduct(id)
    return product
  }
}

module.exports = ProductsRepository