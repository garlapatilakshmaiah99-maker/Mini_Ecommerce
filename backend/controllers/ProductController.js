const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      categoryId,
      description,
      image,
      stock,
    } = req.body;

    if (!title || !price || !categoryId || !description || !image || !stock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      title,
      price,
      categoryId,
      description,
      image,
      stock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Add Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {                      //GET
 
  try {
    // const products = await Product.find();
      // const products = await Product.find().sort({ createdAt: -1 }); // show at top when new one added based on time stamp
    const products = await Product.find()
      .populate("categoryId")
      .sort({ createdAt: -1 });
      
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {    //delete
 
  try {
    const { id } = req.params;

    // await Product.findByIdAndDelete(id);
    await Cart.deleteMany({
  productId: id,
});

await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {                           
                                                                   // update
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body, //Find,update,Return updated product
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };
