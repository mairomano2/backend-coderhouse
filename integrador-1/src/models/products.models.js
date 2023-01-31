const mongoose = require("mongoose");
const productsCollection = "productsCollection";

const productsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    required: true,
  },
});

const productsModel = mongoose.model(productsCollection, productsSchema);
module.exports = productsModel;
