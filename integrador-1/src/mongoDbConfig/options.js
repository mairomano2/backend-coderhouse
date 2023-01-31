const config = require("./config")
const options = {
  fileSystem: {
    products:"./dbFileSystem/products.json",
    carts: "./dbFileSystem/carts.json"
  },
  mongoDb: {
    url : `mongodb+srv://juan:${config.PASSWORD}@cluster0.curtjyb.mongodb.net/ecommerce?retryWrites=true&w=majority`
  }
};

module.exports = options