
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin(event, loginType) {
    event.preventDefault();

    //event = form submit event

    const newErrors = {};

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        //     1st parameter = Where to send  and 2nd parameter = What to send
      //Send request to Login API
        "http://localhost:9000/api/auth/user-login",
        { ...formData, loginType }
      );

      localStorage.setItem("userToken", response.data.userToken);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));

      alert(response.data.message);

      if (loginType === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login Page</h1>

        <form>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button onClick={(event) => handleLogin(event, "user")}>
            Login as User
          </button>

          {/* <button onClick={(event) => handleLogin(event, "admin")}>
            Login as Admin
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Login;