import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Productspage.css";
import axios from "axios";

function ProductsPage() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      if (products.length === 0) {
        setLoading(true);
      }

      const response = await axios.get(
        "http://localhost:9000/api/products/all"
      );

      const categoriesResponse = await axios.get(
        "http://localhost:9000/api/categories/all"
      );

      const selectedCategory =
        categoriesResponse.data.categories.find((category) => {
          return category._id === categoryId;
        }); 

      if (!selectedCategory || selectedCategory.status !== "active") {
        setProducts([]);
        setLoading(false);
        return;
      }

      const filteredProducts = response.data.products.filter((product) => {
        return (
          product.categoryId?._id === categoryId &&
          product.status === "active"
        );
      });

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="products-page">
      <h1>Products</h1>

      {products.length === 0 && <h2>No products found</h2>}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            fetchProducts={fetchProducts}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;