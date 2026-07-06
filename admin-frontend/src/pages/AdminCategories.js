import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminCategories.css";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "../components/AdminSidebar";

function AdminCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const response = await axios.get("http://localhost:9000/api/categories/all");
    setCategories(response.data.categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleDeleteCategory(id) {
    try {
      const adminToken = localStorage.getItem("adminToken");

      await axios.delete(`http://localhost:9000/api/categories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,   // send the token from frontend 
        },
      });

      alert("Category Deleted Successfully");
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Category Failed");
    }
  }

  async function handleToggleStatus(category) {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const newStatus =
        category.status === "active" ? "inactive" : "active";

      await axios.put(
        `http://localhost:9000/api/categories/update/${category._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Status Update Failed");
    }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="content">
    <div className="admin-categories-page">
      
      <div className="admin-page-header">
        <h2>Categories</h2>

        <button onClick={() => navigate("/add-category")}>
          Add Category
        </button>
      </div>

      <div className="admin-categories-grid">
        {categories.map((category) => (
          <div className="admin-category-card" key={category._id}>
            <img src={category.image} alt={category.name} />

            <h3>{category.name}</h3>
            <p>Value: {category.value}</p>

            <p>
              Status:
              {category.status === "active" ? " 🟢 Active" : " 🔴 Inactive"}
            </p>

            <div className="admin-category-actions">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={category.status === "active"}
                  onChange={() => handleToggleStatus(category)}
                />
                <span className="slider round"></span>
              </label>

              <button onClick={() => navigate(`/edit-category/${category._id}`)}>
                Edit
              </button>

              <button onClick={() => handleDeleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default AdminCategories;