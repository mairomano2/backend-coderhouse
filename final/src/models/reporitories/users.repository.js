const UsersMongoDAO = require("../dao/users.mongo.dao")
const { SaveUserDTO, UpdateUserDTO } = require("../dto/users.dto")

const usersDAO = new UsersMongoDAO()

class UsersRepository{
  async getAll(){
    const users = await usersDAO.getAll()
    console.log()
    return users
  }

  async getById(id){
    const user = await usersDAO.getById(id)
    return user
  }

  async createUser(payload){
    const userPayload = new SaveUserDTO(payload)
    const user = await usersDAO.createUser(userPayload)
    return user
  }

  async updateUser(id, payload){
    const user = await usersDAO.updateUser(id, payload)
    return user
  }

  async deleteUser(id){
    const user = await usersDAO.deleteUser(id)
    return user
  }
}

module.exports = UsersRepository