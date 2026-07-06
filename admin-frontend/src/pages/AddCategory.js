import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    image: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category Name is required";
    }

    if (!formData.value.trim()) {
      newErrors.value = "Category Value is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Category Image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleAddCategory(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        alert("Please login as admin first");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/api/categories/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      alert(response.data.message || "Category Added Successfully");
      navigate("/categories");
    } catch (error) {
      console.log("Add Category Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Add Category Failed");
    }
  }

  return (
    <div className="admin-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Add Category</h2>

      <form className="admin-form" onSubmit={handleAddCategory}>
        <label>Category Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Category Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label>Category Value</label>
        <input
          type="text"
          name="value"
          placeholder="Enter Category Value"
          value={formData.value}
          onChange={handleChange}
        />
        {errors.value && <p className="error-text">{errors.value}</p>}

        <label>Category Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Enter Category Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="error-text">{errors.image}</p>}

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;