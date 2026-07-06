// Handles express setup
    
const express =require("express");    
const cors =require("cors"); 
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes =require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")
const cartRoutes = require("./routes/cartRoutes");

const app =express();


app.use(cors());                  
app.use(express.json());            // allow backend to read json data
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/cart",cartRoutes)




module.exports = app;