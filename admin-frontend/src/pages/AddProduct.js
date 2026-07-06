import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    categoryId: "",
    description: "",
    image: "",
    stock: "",
    status: "active",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Product Title is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.stock) newErrors.stock = "Stock is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("http://localhost:9000/api/categories/all");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleAddProduct(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const adminToken = localStorage.getItem("adminToken");

      await axios.post("http://localhost:9000/api/products/add", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      alert("Product Added Successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Add Product Failed");
    }
  }

  return (
    <div className="admin-form-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <h2>Add Product</h2>

      <form className="admin-form" onSubmit={handleAddProduct}>
        <label>Product Title</label>
        <input
          name="title"
          placeholder="Enter Product Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}

        <label>Price</label>
        <input
          name="price"
          type="number"
          placeholder="Enter Price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}

        <label>Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="error-text">{errors.categoryId}</p>}

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error-text">{errors.description}</p>}

        <label>Image URL</label>
        <input
          name="image"
          placeholder="Enter Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error-text">{errors.image}</p>}

        <label>Stock</label>
        <input
          name="stock"
          type="number"
          placeholder="Enter Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <p className="error-text">{errors.stock}</p>}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;