const CartsModel = require("../models/carts.schema")

class CartsMongoDAO{
  async getAll(filter = {}){
    const carts = await CartsModel.find(filter, { __v: false}).lean()
    return carts
  }

  async getById(id){
    const carts = await CartsModel.findById({_id:id}).lean()
    return carts
  }

  async createCart(payload){
    const newCart = await CartsModel.create(payload)
    return newCart
  }
}

module.exports = CartsMongoDAO