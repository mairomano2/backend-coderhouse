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

  // arreglar esta funcion para que mande los datos segun la logica
  async addToCart(cid, pid) {
    let carts = await cartsModel.find();

    //busca si existe algun obj dentro de cart con un order id === al cid
    const order = carts.find((o) => o._id == cid );

    //si existe empieza a buscar dentro de productos
    if (order) {
      const productExists = order.products.find((prod) => prod._id.toString() === pid);
      //si el producto existe le suma 1 en cantidad
      if (productExists) {
        const orderPosition = carts.findIndex((order) => order._id.toString() === cid);

        const productPosition = carts[orderPosition].products.findIndex(
          (prod) => prod._id.toString() === pid
        );
        console.log("productPositon", productPosition)
        carts[orderPosition].products[productPosition].quantity++
        await cartsModel.create(carts);
        return carts;

        //sino agrega un nuevo obj con el prod id y cantidad en 1
      } else {
        console.log("agregar prod y qnt")
        const newProduct = { quiantity: 3 };
        const orderPosition = carts.findIndex((order) => order._id.toString() === cid);
        const newCart = carts[orderPosition].products.push(newProduct)
        console.log(orderPosition)
        if (orderPosition >= 0) {
          cartsModel.create(newCart)
          return carts;
        }
      }

    // como no existe el id de la orden se agrega uno nuevo
    } else {
      const newOrder = {
        orderId: carts.length + 1,
        products: [{ quantity: 1 }],
      };
      await cartsModel.create(newOrder);
      return carts;
    }
  }
}

module.exports = CartsManager;
