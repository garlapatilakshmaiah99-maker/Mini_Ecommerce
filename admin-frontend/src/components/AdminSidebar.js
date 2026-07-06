import React from "react";
import { useNavigate } from "react-router-dom";


function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/products")}>Products</button>
      <button onClick={() => navigate("/categories")}>Categories</button>
      <button onClick={() => navigate("/users")}>Users</button>
    </div>
  );
}

export default AdminSidebar;