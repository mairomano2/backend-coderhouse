const ProductsModel = require("../models/products.schema")

class ProductsMongoDAO {
  // se le tiene que pasar el filter vacio para que en el find se pueda aplicar el segundo parametro
  async getAll(filter = {}){
    // el __v en false hace que no tengan versiones internas
    // lean hace que en vez de devolver un documento de mongoose se devuelva un obj js que es mas liviano
    const products = await ProductsModel.find(filter, { __v : false}).lean()
    return products
  }

  async getById(id){
    const product = await ProductsModel.findById({_id : id }).lean()
    return product
  }

  async createProduct(payload){
    const newProduct = await ProductsModel.create(payload)
    return newProduct
  }

  async updateProduct(id, payload) {
    const updateProduct = ProductsModel.findByIdAndUpdate(id, payload, {new : true})
    return updateProduct
  }

  async deleteProduct(id){
    console.log("prodID", id)
    const product = await ProductsModel.findByIdAndDelete({_id: id})
    console.log("prod", product)
    return product
  }
}

module.exports = ProductsMongoDAO