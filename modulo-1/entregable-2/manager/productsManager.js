const fs = require("fs/promises");
const { existsSync } = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getData() {
    const data = await fs.readFile(this.path, "utf-8");
    const products = await JSON.parse(data);
    return products;
  }

  async writeFile(data) {
    const stringData = JSON.stringify(data, null, "\t");
    return await fs.writeFile(this.path, stringData , "utf-8");
  }

  async getProducts() {
    if (existsSync(this.path)) {
      return await this.getData();
    } else {
      return []
    }
  }

  async addProduct(product) {
    let products = await this.getData();
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    await this.writeFile(products);
    return products
  }

  async getProductById(id) {
    if (existsSync(this.path)) {
      const products = await this.getData();
      const productSelected = products.find( prod => prod.id===id );
      if(productSelected){
        return productSelected;
      } else{
        console.log("No se encontro el producto")
      }
    } else {
      console.error("No se encontró el archivo");
    }
  }

  async updateProduct(id, properties) {
    if (existsSync(this.path)) {
      const products = await this.getData()
      const foundProduct = await this.getProductById(id);
      const productUpdated = { ...foundProduct, ...properties };

      const updatedList = products.map( (obj) => {
        if (obj.id === productUpdated.id) {
          return productUpdated;
        } else {
          return obj;
        }
      });
      this.writeFile(updatedList);
      return updatedList;
    } else {
      console.log("No se encontro el archivo")
    }
  }

  async deleteProduct(id) {
    if (existsSync(this.path)) {
      const products = await this.getData();
      const filteredProducts = products.filter((product) => product.id !== id);
      await this.writeFile(filteredProducts);
      return filteredProducts
    } else {
      console.error("No se encontró el archivo");
    }
  }
}

module.exports = ProductManager;
