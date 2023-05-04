const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Conected to Mongo DB successfully!");
  })
  .catch((error) => {
    console.error(error.message);
  })