const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    // const { userId, productId, quantity } = req.body;
    const userId = req.user.id;
const { productId, quantity } = req.body;
    const addQuantity = quantity || 1;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < addQuantity) {
      return res.status(400).json({
        success: false,
        message: "Product stock not available",
      });
    }

    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      existingCartItem.quantity += addQuantity;
      await existingCartItem.save();
    } else {
      await Cart.create({
        userId,
        productId,
        quantity: addQuantity,
      });
    }

    product.stock -= addQuantity;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET CART ITEMS
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("userId", "name email")
     .populate({
  path: "productId",
  select: "title price image stock status categoryId",
  populate: {
    path: "categoryId",
    select: "name status",
  },
});

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// INCREASE CART QUANTITY
const increaseCartQuantity = async (req, res) => {
  try {
    // const { userId, productId } = req.body;
    const userId = req.user.id;
const { productId } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });
    const product = await Product.findById(productId);

    if (!cartItem || !product) {
      return res.status(404).json({
        success: false,
        message: "Cart item or product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product stock not available",
      });
    }

    cartItem.quantity += 1;
    product.stock -= 1;

    await cartItem.save();
    await product.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity increased",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// DECREASE CART QUANTITY
const decreaseCartQuantity = async (req, res) => {
  try {
    // const { userId, productId } = req.body;
    const userId = req.user.id;
const { productId } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });
    const product = await Product.findById(productId);

    if (!cartItem || !product) {
      return res.status(404).json({
        success: false,
        message: "Cart item or product not found",
      });
    }

    cartItem.quantity -= 1;
    product.stock += 1;

    await product.save();

    if (cartItem.quantity <= 0) {
      await Cart.findByIdAndDelete(cartItem._id);

      return res.status(200).json({
        success: true,
        message: "Cart item removed",
      });
    }

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity decreased",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// REMOVE FULL CART ITEM
const removeCartItem = async (req, res) => {
  try {
    // const { userId, productId } = req.body;
    const userId = req.user.id;
const { productId } = req.body;

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(productId);

    if (product) {
      product.stock += cartItem.quantity;
      await product.save();
    }

    await Cart.findByIdAndDelete(cartItem._id);

    res.status(200).json({
      success: true,
      message: "Cart item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartItem,
};