const config = require("./config")
const options = {
  mongoDb: {
    url : `mongodb+srv://juan:${config.PASSWORD}@cluster0.curtjyb.mongodb.net/ecommerce?retryWrites=true&w=majority`
  }
};

module.exports = options