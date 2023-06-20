const UserModel = require("../models/user.schema")

class UsersMongoDAO {
  // se le tiene que pasar el filter vacio para que en el find se pueda aplicar el segundo parametro
  async getAll(filter = {}){
    // el __v en false hace que no tengan versiones internas
    // lean hace que en vez de devolver un documento de mongoose se devuelva un obj js que es mas liviano
    const users = await UserModel.find(filter, { __v : false}).lean()
    return users
  }

  async getById(id){
    const user = await UserModel.findById(id)
    console.log(user)
    return user
  }

  async getByEmail(email){
    const user = await UserModel.findOne( email , {__v: false}).lean()
    return user
  }

  async createUser(payload){
    const newUser = await UserModel.create(payload)
    return newUser
  }

  async updateUser(id, payload) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {new : true})
    return updatedUser
  }

  async deleteUser(id){
    const user = await UserModel.findByIdAndDelete(id)
    return user
  }

  // // funcion para hacer populacion de los carritos de un usuario
  // async userSavedProducts(cartId, userId){
  //   const updateProducts = await UserModel.updateOne({ _id: userId })
  //   $push: { 
  //     carts: cartId
  //   }
  //   return updateProducts
  // }
}

module.exports = UsersMongoDAO