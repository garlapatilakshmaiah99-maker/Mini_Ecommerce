import React from 'react';
import "./App.css";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import "./pages/AdminDashboard.css"
import "./pages/AdminProducts"
import AdminProducts from './pages/AdminProducts';
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminCategories from "./pages/AdminCategories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetails from "./pages/AdminUserDetails";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/> 
          <Route path='/dashboard' element={<AdminDashboard/>}/>
          <Route path='/products' element={<AdminProducts/>}/>
          <Route path="/add-product" element={<AddProduct />} />
         <Route path="/edit-product/:id" element={<EditProduct />} />
         <Route path="/categories" element={<AdminCategories />} />
         <Route path="/add-category" element={<AddCategory />} />
         <Route path="/edit-category/:id" element={<EditCategory />} />
         <Route path="/users" element={<AdminUsers />} />
         <Route path="/users/:id" element={<AdminUserDetails />} />
          
      </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App