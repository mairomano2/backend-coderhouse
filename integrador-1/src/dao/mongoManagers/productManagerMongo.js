const productsModel = require("../../models/products.models");

class ProductManagerMongo {
  async getAll(queries) {
    const filter = queries.queryParam ? queries.queryParam : {};
    const options = {
      sort: queries.sort ? { price: queries.sort } : {},
      limit: queries.limit || 10,
      page: queries.page || 1,
    };
    
    const data = await productsModel.paginate( filter, options);
    console.log("d ", data)
    
    console.log('ProductManager data ---')
    const products = {
      products: data.docs.map((p) => {
        return {
          title: p.title,
          description: p.description,
          code: p.code,
          price: p.price,
          status: p.status,
          stock: p.stock,
          category: p.category,
        };
      }),
    };
    return products;
  }

  async saveProduct(product) {
    console.log(product);
    const newProduct = await productsModel.create(product);
    return newProduct;
  }

  async getProductById(id) {
    const data = await productsModel.findById({ _id: id });
    return data;
  }

  async updateProduct(id, fieldsToUpdate) {
    let updatedProduct = await productsModel.findByIdAndUpdate(
      id,
      fieldsToUpdate
    );
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

module.exports = ProductManagerMongo;
