import React from "react";
import "./Credentials.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Credentials() {
  const navigate = useNavigate();

 async function handleLogout() {
  try {
    await axios.post(
      "http://localhost:9000/api/auth/logout"
    );

    localStorage.removeItem("loggedInUser");

    navigate("/");

    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="credentials-container">
      <div className="sidebar">
        <h3>Settings</h3>

        <p>Profile</p>

        <p>Change Name</p>

        <p>Change Password</p>

        <p onClick={handleLogout}>Logout</p>
      </div>

      <div className="content">
        {/* <h2>Welcome</h2> */}
      </div>
    </div>
  );
}

export default Credentials;
