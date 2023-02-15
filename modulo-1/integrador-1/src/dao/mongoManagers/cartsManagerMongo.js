const cartsModel = require("../../models/carts.models");

class CartsManager {
  async saveCarts(cart) {
    const carts = await cartsModel.create(cart);
    return carts;
  }

  async getAll() {
    const carts = await cartsModel.find();
    return carts;
  }

  async getCartById(id) {
    const data = await cartsModel.findById({ _id: id });
    return data;
  }

  async addCart() {
    const cart = await cartsModel.create({ products: [] });
    return cart;
  }

  async addToCart(cid, pid, qnt) {
    const order = await cartsModel.findById(cid)
    order.products.push({ productId: pid, quantity: qnt });
    console.log(typeof(convertedPid))
    // await cartsModel.findByIdAndUpdate({ productId : "egr"}, order);
    return order;
  }

  async deleteCart(cid) {
    const cart = await cartsModel.deleteOne({ _id: cid });
    return cart;
  }

  async deleteProductFromCart(cid, pid) {
    await cartsModel.findByIdAndUpdate()
    // const order = await cartsModel.findById({ _id : cid})
    // order.products.
    // console.log(order)
    // return order
}

  async updateCart(cid, product) {
    const cart = await cartsModel.findByIdAndUpdate(cid, { products: product });
    return cart;
  }

  async UpdateProductFromCart(cid, pid, qnt){
    const order = await cartsModel.findById(cid)
    order.products.find( p => p.productId === pid)
    console.log(order)
  }
}

module.exports = CartsManager;
