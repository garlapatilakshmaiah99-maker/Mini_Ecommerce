import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const navigate = useNavigate();

  const cartProduct = cartItems.find((item) => {
    return item._id === props.product._id;
  });

  const quantity = cartProduct ? cartProduct.quantity : 0;

  function handleProductClick() {
    navigate(`/product/${props.product._id}`);
  }

  async function handleAddToCart(event) {
    event.stopPropagation();

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      alert("Please signup or login first");
      navigate("/signup");
      return;
    }

    await addToCart(props.product);

    if (props.fetchProducts) {
      props.fetchProducts();
    }
  }

  async function handleIncrease(event) {
    event.stopPropagation();

    await increaseQuantity(props.product._id);

    if (props.fetchProducts) {
      props.fetchProducts();
    }
  }

  async function handleDecrease(event) {
    event.stopPropagation();

    await decreaseQuantity(props.product._id);

    if (props.fetchProducts) {
      props.fetchProducts();
    }
  }

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img
        src={props.product.image}
        alt={props.product.title}
        className="product-image"
      />

      <h3>{props.product.title}</h3>

      <p>Price: ₹{props.product.price}</p>

      <p>Available Quantity: {props.product.stock}</p>

      {props.product.stock <= 0 && quantity === 0 ? (
        <button disabled className="out-stock-btn">
          Unavailable
        </button>
      ) : quantity > 0 ? (
        <>
  <div className="quantity-controls">
    <button
      className="qty-btn"
      onClick={handleDecrease}
    >
      -
    </button>

    <span className="qty-number">
      {quantity}
    </span>

    <button
      className="qty-btn"
      onClick={handleIncrease}
      disabled={props.product.stock <= 0}
    >
      +
    </button>
  </div>

  {props.product.stock <= 0 && (
    <p>No more stock available</p>
  )}
</>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
