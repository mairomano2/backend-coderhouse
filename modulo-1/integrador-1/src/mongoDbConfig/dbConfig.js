const mongoose = require("mongoose");
const options = require("./options");

mongoose.set("strictQuery", false);
mongoose.connect(options.mongoDb.url, (error) => {
  if (error) {
    return console.log(`db connection failed: ${error}`);
  }
  console.log("connected to db");
});
