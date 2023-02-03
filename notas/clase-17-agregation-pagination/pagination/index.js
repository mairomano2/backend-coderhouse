const mongoose = require("mongoose");
const { usersModel } = require("./models/users.model");
mongoose.set("strictQuery", false);
const connection = "pagination";

const connect = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${connection}`)
  const response = await usersModel.paginate( { grade: 6}, { limit: 2, page: 1})
  console.log(response)
}

connect()