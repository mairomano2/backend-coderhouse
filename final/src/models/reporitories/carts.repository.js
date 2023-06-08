const CartsDAO = require("../dao/carts.mongo.dao");
const { SaveCartDTO } = require("../dto/carts.dto");

const cartsDAO = new CartsDAO();

class CartsRepository {
  async getAll() {
    const carts = await cartsDAO.getAll();
    return carts;
  }

  async getById(id) {
    const cart = await cartsDAO.getById(id);
    return cart;
  }

  async createCart(payload) {
    const cartPayload = new SaveCartDTO(payload);
    const cart = await cartsDAO.createCart(cartPayload);
    return cart;
  }
}

module.exports = CartsRepository;
