import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AdminUserDetails.css"

function AdminUserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  async function fetchUserDetails() {
    const userResponse = await axios.get(`http://localhost:9000/api/users/${id}`);
    const cartResponse = await axios.get("http://localhost:9000/api/cart");

    setUser(userResponse.data.user);

    const userCart = cartResponse.data.cartItems.filter((item) => {
      return item.userId?._id === id;
    });

    setCartItems(userCart);
  }

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-users-page">
      <h2>User Details</h2>

      <div className="user-detail-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <h3>Cart Items</h3>

      {cartItems.length === 0 ? (
        <p>No cart items found</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.productId.title}</td>
                <td>₹{item.productId.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.productId.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Cart Total: ₹{cartTotal}</h3>
    </div>
  );
}

export default AdminUserDetails;