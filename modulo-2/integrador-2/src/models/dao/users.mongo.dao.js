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
    const users = await UserModel.findById(id, { __v: false}).lean()
    return users
  }

  async create(payload){
    const newUser = await UserModel.create(payload)
    return newUser
  }

  async updateById(id, payload) {
    const updatedUser = UserModel.findByIdAndUpdate(id, payload, {new : true})
    return updatedUser
  }

  async delete(id){
    const user = await UserModel.findByIdAndDelete(id)
    return user
  }
}

module.exports = UsersMongoDAO