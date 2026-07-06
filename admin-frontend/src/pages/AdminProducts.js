import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";
import "./AdminProducts.css";
import AdminSidebar from "../components/AdminSidebar";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchProducts() {
    const response = await axios.get("http://localhost:9000/api/products/all");
    setProducts(response.data.products);
  }

  async function fetchCategories() {
    const response = await axios.get(
      "http://localhost:9000/api/categories/all",
    );

    setCategories(response.data.categories);
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function handleDeleteProduct(id) {
    const adminToken = localStorage.getItem("adminToken");

    await axios.delete(`http://localhost:9000/api/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`, // frontend sends the admin token
      },
    });

    // alert("Product Deleted Successfully");
    fetchProducts();
  }

  async function handleToggleProductStatus(product) {
    const adminToken = localStorage.getItem("adminToken");

    const newStatus = product.status === "active" ? "inactive" : "active";

    await axios.put(
      `http://localhost:9000/api/products/update/${product._id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`, // frontend sends the admin token
        },
      },
    );

    fetchProducts();
  }

  const filteredAdminProducts =
    filterCategory === ""
      ? products
      : products.filter((product) => product.categoryId?._id === filterCategory)

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="content">
        <div className="admin-products-page">
          <div className="admin-page-header">
            <h2>Products</h2>

            <button onClick={() => navigate("/add-product")}>
              Add Product
            </button>
          </div>

          <select
            className="admin-category-filter"
            value={filterCategory}
            onChange={(event) => setFilterCategory(event.target.value)}
          >
            <option value="">All Products</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="admin-products-grid">
            {filteredAdminProducts.map((product) => (
              <div className="admin-product-card" key={product._id}>
                <img src={product.image} alt={product.title} />

                <h3>{product.title}</h3>
                <p>₹{product.price}</p>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>

                <p>
                  Status:
                  {product.status === "active" ? " 🟢 Active" : " 🔴 Inactive"}
                </p>

                <div className="admin-product-actions">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={product.status === "active"}
                      onChange={() => handleToggleProductStatus(product)}
                    />
                    <span className="slider round"></span>
                  </label>

                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>

                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
