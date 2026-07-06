const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
    unique: true,
  },
   image: {
      type: String,
      required: true,
   },

  status: {
    type: String,
    default: "active",
  },
},{
    timestamps: true,
  });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;