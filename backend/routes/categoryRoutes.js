const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {addCategory, getCategories, deleteCategory, updateCategory} = require("../controllers/categoryController");

router.post("/add", adminAuth,addCategory)
router.get("/all",getCategories)
router.delete("/delete/:id",adminAuth,deleteCategory)
router.put("/update/:id",adminAuth,updateCategory)

module.exports = router;