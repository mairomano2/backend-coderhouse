const { faker } = require("@faker-js/faker");

faker.locale = "es";
const products = [];

const generateProducts = () => {
  const num = 50;

  for (let i = 0; i < num; i++) {
    products.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      id: faker.database.mongodbObjectId(),
    });
  }

  return products;
};

const createProduct = (product) => {
  products.push(product)
  return product
};

module.exports = { generateProducts, createProduct };
