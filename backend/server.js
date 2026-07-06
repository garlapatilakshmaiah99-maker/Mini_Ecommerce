// Routes             //App.js(index.js)    // starting point

require("dotenv").config()
const connectDB = require("./config/db")    
const app = require("./app")


 connectDB() 



const PORT =process.env.PORT || 9000;

          
app.listen(PORT,()=>{
    console.log(`server running on port${PORT}`);
})

