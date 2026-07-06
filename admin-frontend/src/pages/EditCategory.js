import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    image: "",
    status: "active",
  });

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/categories/all",
        );

        const selectedCategory = response.data.categories.find(
          (category) => category._id === id,
        );

        if (selectedCategory) {
          setFormData({
            name: selectedCategory.name,
            value: selectedCategory.value,
            image: selectedCategory.image,
            status: selectedCategory.status,
          });
        } else {
          alert("Category not found");
          navigate("/categories");
        }
      } catch (error) {
        alert("Failed to fetch category details");
      }
    }

    fetchCategory();
  }, [id, navigate]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUpdateCategory(event) {
    event.preventDefault();

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        alert("Please login as admin first");
        navigate("/");
        return;
      }

      const response = await axios.put(
        `http://localhost:9000/api/categories/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      alert(response.data.message || "Category Updated Successfully");
      navigate("/categories");
    } catch (error) {
      console.log(
        "Update Category Error:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Update Category Failed");
    }
  }

  return (
    <div className="admin-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>Edit Category</h2>

      <form className="admin-form" onSubmit={handleUpdateCategory}>
        <label>Category Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Category Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Category Value</label>
        <input
          type="text"
          name="value"
          placeholder="Enter Category Value"
          value={formData.value}
          onChange={handleChange}
        />

        <label>Category Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Enter Category Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">Update Category</button>
      </form>
    </div>
  );
}

export default EditCategory;
