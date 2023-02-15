const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // GENERALES
  async getItems() {
    const data = await fs.readFile(this.path, "utf-8");
    const items = await JSON.parse(data); // hay que pasear la data para que llegue como obj
    return items;
  }

  async writeFile(data) {
    const stringData = JSON.stringify(data, null, "\t");
    return await fs.writeFile(this.path, stringData, "utf-8");
  }

  async getItemById(id) {
    const items = await this.getItems();
    const itemSelected = items.find((item) => item.id === id);
    if (itemSelected) {
      return itemSelected;
    } else {
      console.log("Product not found");
    }
  }

  // PRODUCTS
  async addProduct(product) {
    let products = await this.getItems();
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    await this.writeFile(products);
    return products;
  }

  async updateProduct(pid, properties) {
    const products = await this.getItems();
    const foundProduct = await this.getItemById(pid);
    const productUpdated = { ...foundProduct, ...properties };

    if (foundProduct) {
      const updatedList = products.map((obj) => {
        if (obj.id === productUpdated.id) {
          return productUpdated;
        } else {
          return obj;
        }
      });
      this.writeFile(updatedList);
      return updatedList;
    } else {
      console.log("no se encontro el producto");
    }
  }

  async deleteProduct(pid) {
    // validacion de que si no existe el prod con ese id devuelva error
    const products = await this.getItems();
    const filteredProducts = products.filter((product) => product.id !== pid);
    await this.writeFile(filteredProducts);
    return filteredProducts;
  }

  // CART
  async createCart() {
    // POST: crea un cart nuevo con un id y un array de productos
    let cart = await this.getItems();
    const newCart = { id: cart.length + 1, products: [] };
    cart.push(newCart);
    await this.writeFile(cart);
    return cart;
  }

  async addToCart(cid, pid) {
    let cart = await this.getItems();

    //busca si existe algun obj dentro de cart con un order id === al cid
    const order = cart.find((o) => o.orderId === cid);

    //si existe empieza a bscar dentro de productos
    if (order) {
      const productExist = order.products.find((prod) => prod.prodId === pid);

      //si el producto existe le suma 1 en cantidad
      if (productExist) {
        const orderPosition = cart.findIndex((order) => order.orderId === cid);
        const updateProduct = cart[orderPosition].products.find(
          (prod) => prod.prodId === pid
        );
        const productPosition = cart[orderPosition].products.findIndex(
          (prod) => prod.prodId === pid
        );

        cart[orderPosition].products[productPosition].quantity =
          updateProduct.quantity + 1;
        await this.writeFile(cart);
        return cart;

        //sino agrega un nuevo obj con el prod id y cantidad en 1
      } else {
        const newProduct = { prodId: pid, quantity: 1 };
        const orderPosition = cart.findIndex((order) => order.orderId === cid);
        if (orderPosition <= 0) {
          cart[orderPosition].products.push(newProduct);
          await this.writeFile(cart);
          return cart;
        }
      }
    } else {
      // como no existe el id de la orden se agrega uno nuevo
      const newOrder = {
        orderId: cart.length + 1,
        products: [{ prodId: pid, quantity: 1 }],
      };
      cart.push(newOrder);
      await this.writeFile(cart);
      return cart;
    }
  }
}

module.exports = ProductManager;
