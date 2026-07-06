
const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/ProductController");

router.post("/add", adminAuth, addProduct);
router.get("/all", getProducts);
router.delete("/delete/:id", adminAuth, deleteProduct);
router.put("/update/:id", adminAuth, updateProduct);

module.exports = router;    