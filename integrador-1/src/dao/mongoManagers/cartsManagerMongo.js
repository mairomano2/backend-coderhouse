const cartsModel = require("../../models/carts.models");

class CartsManager {
  async saveCarts(cart) {
    const carts = await cartsModel.create(cart);
    return carts;
  }

  async getAll(){
    const carts = await cartsModel.find()
    return carts
  }

  async getCartById(cid) {
    const cart = await cartsModel.findOne({ cid });
    return cart;
  }

  async addToCart(cid, pid) {
    let carts = await cartsModel.find();

    const order = carts.find((o) => o.orderId === cid);

    if (order) {
      const productExists = order.products.find((prod) => prod.prodId === pid);

      if (productExists) {
        const orderPosition = carts.findIndex((order) => order.orderId === cid);
        const updateProduct = carts[orderPosition].products.findIndex(
          (prod) => prod.prodId === pid
        );
        const productPosition = cart[orderPosition].products.findIndex(
          (prod) => prod.prodId === pid
        );
        carts[orderPosition].products[productPosition].quantity =
          updateProduct.quantity + 1;
        await cartsModel.create(carts);
        return carts;
      } else {
        const newProduct = { prodId: pid, quiantity: 1 };
        const orderPosition = carts.findIndex((order) => order.orderId === cid);
        if (orderPosition <= 0) {
          carts[orderPosition].products.push(newProduct);
          await cartsModel.create(carts);
          return carts;
        }
      }
    } else {
      const newOrder = {
        orderId: carts.length + 1,
        products: [{ prodId: pid, quantity: 1 }],
      };
      carts.push(newOrder);
      await cartsModel.create(carts);
      return carts;
    }
  }
}

module.exports = CartsManager;
