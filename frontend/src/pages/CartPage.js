import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cartItems.length === 0 && <h2>Your cart is empty</h2>}

      <div className="cart-grid">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

            <p>Price : ₹{item.price}</p>

           <div className="cart-quantity">
  <button onClick={() => decreaseQuantity(item._id)}>
    -
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() => increaseQuantity(item._id)}
    disabled={
  item.status === "inactive" ||
  item.categoryId?.status === "inactive" ||
  item.stock <= 0
}
  >
    +
  </button>
</div>
             {item.status === "inactive" && (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    Unavailable
  </p>
)}

{(item.status === "inactive" ||
  item.categoryId?.status === "inactive") && (
  <p className="unavailable-text">Unavailable</p>
)}

            <p>Total : ₹{item.price * item.quantity}</p>

            <button className="remove-btn" onClick={() => removeItem(item._id)}>
              Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
