const ProductManager = require("./manager/productsManager");

const manager = new ProductManager("./db/products.json");

const fileProcess = async () => {
  try {
    console.log("Primer pedido");
    const test1 = await manager.getProducts();
    console.log(test1);

    console.log('agregando de producto');
    const test2 = await manager.addProduct( {title: "producto prueba", description: "producto de prueba", price: 200, thumbnail: "Sin imagen", code: "123", stock: 20 });
    console.log(test2)

    console.log("traer un id especifico")
    const test3 = await manager.getProductById(1)
    console.log(test3)

    console.log("actualizar info de un producto")
    const test5 = await manager.updateProduct(1, {title: "titulo actualizado"})
    console.log(test5)
    
    console.log("borrar un producto")
    const test4 = await manager.deleteProduct(2)
    console.log(test4)

  } catch (err) {
    console.log(err);
  }
};

fileProcess();