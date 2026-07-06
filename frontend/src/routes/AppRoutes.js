import React from "react";
import Home from "../pages/Home";
import ProductsPage from "../pages/ProductsPage";
import { Routes, Route } from "react-router-dom";
import CartPage from "../pages/CartPage";
import Signup from "../pages/Signup";
import ProductDetailes from "../pages/ProductDetailes";
import Credentials from "../pages/Credentials";
import Login from "../pages/Login";
// import AdminDashboard from "../pages/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:categoryId" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:productId" element={<ProductDetailes/>}/>
      <Route path="/credentials" element={<Credentials />} />
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/Admin" element ={<AdminDashboard/>}/> */}
    </Routes>
  );
}

export default AppRoutes;
