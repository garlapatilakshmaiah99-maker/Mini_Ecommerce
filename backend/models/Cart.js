const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(                      
  {                                                 
    userId: {
      type: mongoose.Schema.Types.ObjectId,          // Which user added?
      ref: "user",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,                                  // Which product added?
    },

    quantity: {
      type: Number,                                  // how many quantity
      default: 1,                                         
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;