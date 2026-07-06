const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");

const {
  addToCart,
  getCartItems,
  removeCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
} = require("../controllers/CartController");

router.post("/add", userAuth, addToCart);
router.get("/", getCartItems);
router.put("/increase", userAuth, increaseCartQuantity);
router.put("/decrease", userAuth, decreaseCartQuantity);
router.post("/remove", userAuth, removeCartItem);

module.exports = router;