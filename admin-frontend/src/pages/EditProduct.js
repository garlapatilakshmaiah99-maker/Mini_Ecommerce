import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: "",
    stock: "",
    status: "active",
  });

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/categories/all"
      );

      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProduct() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/products/all"
      );

      const selectedProduct = response.data.products.find(
        (product) => product._id === id
      );

      if (selectedProduct) {
        setFormData({
          title: selectedProduct.title,
          price: selectedProduct.price,
          categoryId: selectedProduct.categoryId?._id || "",
          description: selectedProduct.description,
          image: selectedProduct.image,
          stock: selectedProduct.stock,
          status: selectedProduct.status,
        });
      } else {
        alert("Product not found");
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch product details");
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUpdateProduct(event) {
    event.preventDefault();

    try {
      const adminToken = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:9000/api/products/update/${id}`,
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert("Product Updated Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Update Product Failed"
      );
    }
  }

  return (
    <div className="admin-form-page">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>Edit Product</h2>

      <form className="admin-form" onSubmit={handleUpdateProduct}>
  <label>Product Title</label>
  <input type="text" name="title" placeholder="Enter Product Title" value={formData.title} onChange={handleChange} />

  <label>Price</label>
  <input type="number" name="price" placeholder="Enter Price" value={formData.price} onChange={handleChange} />

  <label>Category</label>
  <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
    <option value="">Select Category</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>{category.name}</option>
    ))}
  </select>

  <label>Description</label>
  <textarea name="description" placeholder="Enter Description" value={formData.description} onChange={handleChange} />

  <label>Image URL</label>
  <input type="text" name="image" placeholder="Enter Image URL" value={formData.image} onChange={handleChange} />

  <label>Stock</label>
  <input type="number" name="stock" placeholder="Enter Stock Quantity" value={formData.stock} onChange={handleChange} />

  <button type="submit">Update Product</button>
</form>
    
    </div>
  );
}

export default EditProduct;