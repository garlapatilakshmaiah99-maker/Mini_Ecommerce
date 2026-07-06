const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Cart =require("../models/Cart")


const getDashboardData =async (req,res)=>{
    try{
        const users =await User.find();
        const products =await Product.find();      // gets all users, products, and categories from MongoDB.
     const categories = await Category.find();
     const cartItems = await Cart.find();
     const productsInCart = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
     


    const activeProducts = products.filter(
  (product) => product.status === "active"
).length;
                                                // active products card
const activeCategories = categories.filter(
  (category) => category.status === "active"
).length;

       const stockGreaterThanFive = products.filter(
  (product) => product.stock > 5
).length;                                  //checks products whose stock is more than 5 and counts them. 

const stockLessThanFive = products.filter(
  (product) => product.stock <= 5
).length;

        res.status(200).json({
            success :true,
            
            totalUsers :users.length,
            totalProducts :products.length,
            totalCategories :categories.length,     //checks products whose stock is 5 or less and counts them.

        //    productsInCart: cartItems.length,      //initially(when in local staorage) 0 when updated DB that will show real count  
               productsInCart, 

            stockGreaterThanFive,  // after then show >5 and <= 5 
            stockLessThanFive,
            activeProducts,
           activeCategories,
        })
    }catch(error){
        res.status(500).json({
            success: false,
      message: "Server Error",
      error: error.message,
        })

    }

}
module.exports = {getDashboardData,};