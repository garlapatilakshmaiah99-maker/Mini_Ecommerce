import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchUserCart();
  }, []);

  async function fetchUserCart() {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      if (!loggedInUser) {
        setCartItems([]);
        return;
      }

      const response = await axios.get(
        "http://localhost:9000/api/cart"
      );

      const userCart = response.data.cartItems
        .filter((item) => {
          return item.userId._id === loggedInUser._id;
        })
        .map((item) => {
          return {
            ...item.productId,
            quantity: item.quantity,
          };
        });

      setCartItems(userCart);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(product) {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );
      const userToken = localStorage.getItem("userToken");

      if (!loggedInUser) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:9000/api/cart/add",
        {
          userId: loggedInUser._id,
          productId: product._id,
          quantity: 1,
        },{
          headers : {
            Authorization: `Bearer ${userToken}`,
          }
        }
      );

      fetchUserCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function increaseQuantity(productId) {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );
      const userToken = localStorage.getItem("userToken");

      if (!loggedInUser) {
        alert("Please login first");
        return;
      }

      await axios.put(
        "http://localhost:9000/api/cart/increase",
        {
          userId: loggedInUser._id,
          productId,
        },{
          headers:{
            Authorization:`Bearer ${userToken}`,
          },
        }
      );

      fetchUserCart();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Increase Quantity Failed"
      );
    }
  }

  async function decreaseQuantity(productId) {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );
      const userToken = localStorage.getItem("userToken");

      if (!loggedInUser) {
        alert("Please login first");
        return;
      }

      await axios.put(
        "http://localhost:9000/api/cart/decrease",
        {
          userId: loggedInUser._id,
          productId,
        },{
          headers:{
            Authorization:`Bearer ${userToken}`,
          },
        }
      );

      fetchUserCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeItem(productId) {
  try {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );
    const userToken = localStorage.getItem("userToken");

    await axios.post(
  "http://localhost:9000/api/cart/remove",
  {
    productId,
  },
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }
);

    fetchUserCart();
  } catch (error) {
    console.log(error);
  }
}

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        fetchUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;