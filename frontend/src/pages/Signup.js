import React, { useState } from "react";
import axios from "axios"
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  async function handleSignup(event) {
    event.preventDefault();

    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // const userExists = users.find((user) => {
    //   return user.email === formData.email;
    // });

    // if (userExists) {
    //   alert("User already exists");
    //   return;
    // }

    // users.push(formData);

    // localStorage.setItem("users", JSON.stringify(users));

    const response = await axios.post(
      "http://localhost:9000/api/auth/signup",
      formData
    );

    // console.log(response.data);
    localStorage.setItem("loggedInUser", JSON.stringify(formData));   // user signup  sucessfull show sucessfully signup 

    alert("Signup Successful");
    navigate("/")
    window.location.reload();

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setErrors({});
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

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

        <button type="submit">Signup</button>
        <p>
  Already have an account? <Link to="/login">Login</Link>
</p>
      </form>
    </div>
  );
}

export default Signup;
