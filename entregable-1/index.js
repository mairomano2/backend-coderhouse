class ProductManager {
  static idCounter = 0;

  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, thumnail, code, stock) => {
    ProductManager.idCounter++;

    const productCode = this.products.find((c) => c.code === code);

    const newProduct = {
      title,
      description,
      price,
      thumnail,
      code,
      stock,
      id: ProductManager.idCounter
    };

    if (productCode) {
      console.error("Este producto ya existe");
    } else {
      this.products.push(newProduct);
      return this.products;
    }
  };

  getProducts = () => this.products;

  getProductById(id) {
    const productSelected = this.products.filter(
      (product) => product.id == id
    );
    return productSelected;
  }
}

const productManager = new ProductManager();

//agrega un producto
console.log(
  productManager.addProduct(
    "test",
    "test description",
    200,
    "img",
    "asd123",
    20
  )
);

//repite el codigo del producto
console.log(
  productManager.addProduct(
    "test",
    "test description",
    200,
    "img",
    "asd123",
    20
  )
);

//trae el product ocon id 1
console.log(productManager.getProductById(1));

//trae todos los productos
console.log(ProductManager.getProducts)
