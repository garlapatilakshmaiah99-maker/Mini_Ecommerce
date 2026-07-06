import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    productsInCart: 0,
    stockGreaterThanFive: 0,
    stockLessThanFive: 0,
    activeProducts: 0,
    activeCategories: 0,
  });

  async function fetchDashboardData() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/dashboard"
      );

      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  function handleLogout() {
  localStorage.removeItem("adminToken");
  navigate("/");
}

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="content">
       <div className="dashboard-header">
  <h1>OVER-VIEW 📍</h1>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Products</h3>
            <p>{dashboardData.totalProducts}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Categories</h3>
            <p>{dashboardData.totalCategories}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>{dashboardData.totalUsers}</p>
          </div>

          <div className="dashboard-card">
            <h3>Products In Cart</h3>
            <p>{dashboardData.productsInCart}</p>
          </div>

          <div className="dashboard-card">
            <h3>Stock More Than 5</h3>
            <p>{dashboardData.stockGreaterThanFive}</p>
          </div>

          <div className="dashboard-card">
            <h3>Stock Less Than 5</h3>
            <p>{dashboardData.stockLessThanFive}</p>
          </div>

          <div className="dashboard-card">
            <h3>Active Products</h3>
            <p>{dashboardData.activeProducts}</p>
          </div>

          <div className="dashboard-card">
            <h3>Active Categories</h3>
            <p>{dashboardData.activeCategories}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;