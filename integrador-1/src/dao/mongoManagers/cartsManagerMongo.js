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

  async getCartById(cid) {
    console.log(cid)
    const cart = await cartsModel.findById({ _id: cid });
    return cart;
  }

  async addToCart(cid, pid) {
    let carts = await cartsModel.find();

    //busca si existe algun obj dentro de cart con un order id === al cid
    const order = carts.find((o) => o.orderId === cid);

    //si existe empieza a bscar dentro de productos
    if (order) {
      const productExists = order.products.find((prod) => prod.prodId === pid);

      //si el producto existe le suma 1 en cantidad
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

        //sino agrega un nuevo obj con el prod id y cantidad en 1
      } else {
        const newProduct = { prodId: pid, quiantity: 1 };
        const orderPosition = carts.findIndex((order) => order.orderId === cid);
        if (orderPosition <= 0) {
          carts[orderPosition].products.push(newProduct);
          await cartsModel.create(carts);
          return carts;
        }
      }

    // como no existe el id de la orden se agrega uno nuevo
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
