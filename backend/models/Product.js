const mongoos = require("mongoose");

const productSchema = new mongoos.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
   category: {
    type: String,
    required: false,   // for old data we have kept for !error
  },
  categoryId: {
  type: mongoos.Schema.Types.ObjectId,
  ref: "Category",
  required: true,

},
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  status: {
  type: String,
  default: "active",
},

},{ timestamps: true });

const Product =mongoos.model("Product",productSchema);

module.exports = Product;

