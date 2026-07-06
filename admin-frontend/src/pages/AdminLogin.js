import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleAdminLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/admin-login",
        formData
      );

      localStorage.setItem("adminToken", response.data.adminToken);
      localStorage.setItem(
        "loggedInAdmin",
        JSON.stringify(response.data.admin)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Admin Login Failed");
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleAdminLogin}>
        <h2>Admin Login</h2>

        {error && <p className="admin-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter admin email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter admin password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;