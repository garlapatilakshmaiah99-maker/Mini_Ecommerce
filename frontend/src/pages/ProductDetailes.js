// show full product details from MongoDB products.

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams(); // Get product id from URL

  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // Store selected product

  const [relatedProducts, setRelatedProducts] = useState([]); // Store related products

  const { addToCart } = useContext(CartContext); // Get addToCart function

  async function fetchProductDetails() {
    try {
      // Get all products from backend

      const response = await axios.get("http://localhost:9000/api/products");

      const allProducts = response.data.products;

      // Find selected product using URL productId

      const selectedProduct = allProducts.find((item) => {
        return item._id === productId;
      });

      // Store selected product in state

      setProduct(selectedProduct);

      if (selectedProduct) {
        // Find products with same category

        const related = allProducts.filter((item) => {
          return (
            item.category === selectedProduct.category &&
            item._id !== selectedProduct._id
          );
        });

        // Store related products

        setRelatedProducts(related);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddToCart() {
    // Check user login

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      alert("Please signup or login first");

      navigate("/signup");

      return;
    }

    // Add product to cart

    addToCart(product);
  }

  useEffect(() => {
    // Run when page loads

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <h1>Loading Product...</h1>;
  }

  return (
    <div className="product-details-page">
      <h1>Product Details</h1>

      {/*
      Selected Product Section
      */}

      <div className="product-details-card">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.title}
            className="product-details-image"
          />
        </div>

        <div className="product-info-section">
          <h2>{product.title}</h2>

          <h3>₹ {product.price}</h3>

          <p>{product.description}</p>

          <p>Category : {product.category}</p>

          <p>Stock : {product.stock}</p>

          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>

      {/*
      Related Products Section
      */}

      <h2 className="related-title">Related Products</h2>

      <div className="related-products-grid">
        {relatedProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
