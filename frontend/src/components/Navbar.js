import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import BackButton from "./BackButton";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  return (
    <nav className="navbar">
      {location.pathname !== "/" && <BackButton />}

      <Link to="/" className="logo">
        ShopEasy
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart ({cartItems.length})
        </Link>

        {loggedInUser ? (
          <div
            className="user-btn"
            onClick={() => navigate("/credentials")}
          >
            👤 {loggedInUser.name}
          </div>
        ) : (
          <Link to="/signup">Sign Up</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;