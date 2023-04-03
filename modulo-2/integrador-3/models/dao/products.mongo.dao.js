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
    const products = await ProductsModel.findById({_id : id }).lean()
    return products
  }

  async create(payload){
    const newProduct = await ProductsModel.create(payload)
    return newProduct
  }

  async updateById(id, payload) {
    const updateProduct = ProductsModel.findByIdAndUpdate(id, payload, {new : true})
    return updateProduct
  }

  async delete(id){
    const product = await ProductsModel.findByIdAndDelete(id)
    return product
  }
}

module.exports = ProductsMongoDAO